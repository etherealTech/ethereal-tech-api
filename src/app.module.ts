import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import {
  PG_DATABASE,
  PG_HOST,
  PG_USERNAME,
  PG_PASSWORD,
  PG_PORT,
  DATABASE_URL,
} from './app.config';
import { Configs } from './configs/configs.entity';
import { ConfigsController } from './configs/configs.controller';
import { CryptService } from './services/crypt.service';
import { AuthService } from './services/auth.service';
import { APP_GUARD } from '@nestjs/core';

const dbConfigs = DATABASE_URL
  ? { url: DATABASE_URL }
  : {
      host: PG_HOST,
      port: PG_PORT,
      username: PG_USERNAME,
      password: PG_PASSWORD,
      database: PG_DATABASE,
      url: DATABASE_URL,
    };

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      ...dbConfigs,
      synchronize: true,
      entities: [Configs],
    }),
    ThrottlerModule.forRoot({
      // a hundred requests per minute
      ttl: 60,
      limit: 100,
    }),
  ],
  controllers: [ConfigsController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AuthService,
    CryptService,
  ],
})
export class AppModule {}
