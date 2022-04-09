import {
  Controller,
  Get,
  Optional,
  ValidationPipe,
  Post,
  Query,
  Body,
  Put,
  Param,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { Connection } from 'typeorm';
import { Configs } from './configs.entity';
import { CreateConfigDto } from './dto/CreateConfig.dto';
import { CryptService } from 'src/services/crypt.service';
import { AuthGuard } from 'src/auth.guard';
import { AuthService } from 'src/services/auth.service';
import { request } from 'http';

@Controller('/configs')
@UseGuards(AuthGuard)
export class ConfigsController {
  constructor(
    private readonly connection: Connection,
    private readonly crypt: CryptService,
    private readonly auth: AuthService,
  ) {}

  @Get()
  async findAll(
    @Optional() @Query('limit') limit = 10,
    @Optional() @Query('page') page = 1,
  ): Promise<Array<Configs & { value: string }>> {
    return this.connection
      .getRepository(Configs)
      .createQueryBuilder()
      .addOrderBy('id', 'DESC')
      .limit(limit)
      .offset(page - 1)
      .getMany()
      .then((configs) =>
        configs.map((config: any) => {
          config.value = this.crypt.decrypt(config.encrypted_value);
          delete config.encrypted_value;
          return config;
        }),
      );
  }

  @Post()
  async create(
    @Query('token') token,
    @Body(ValidationPipe) createConfigDto: CreateConfigDto,
  ): Promise<{ id: string }> {
    const auth = await this.auth.getDecodeToken(token);
    const configs = new Configs();
    configs.key_name = createConfigDto.key_name;
    configs.provider_name = createConfigDto.provider_name;
    configs.encrypted_value = this.crypt.encrypt(createConfigDto.value);
    configs.account_name = createConfigDto.account_name;
    configs.created_uid = auth.uid;
    configs.created_at = new Date();
    return this.connection
      .getRepository(Configs)
      .save(configs)
      .then(({ id }) => ({ id }));
  }

  @Put('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(ValidationPipe) updateConfigDto: Partial<CreateConfigDto>,
  ): Promise<void> {
    const configs = new Configs();
    configs.id = id;
    if (updateConfigDto.value) {
      configs.encrypted_value = this.crypt.encrypt(updateConfigDto.value);
    }
    if (updateConfigDto.account_name) {
      configs.account_name = updateConfigDto.account_name;
    }
    if (updateConfigDto.provider_name) {
      configs.provider_name = updateConfigDto.provider_name;
    }
    return this.connection
      .getRepository(Configs)
      .save(configs)
      .then(() => undefined);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.connection
      .getRepository(Configs)
      .remove(Object.assign(new Configs(), { id }))
      .then(() => undefined);
  }
}
