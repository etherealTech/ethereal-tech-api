import { Connection } from 'typeorm';
import { Configs } from './configs.entity';
import { CreateConfigDto } from './dto/CreateConfig.dto';
import { CryptService } from 'src/services/crypt.service';
import { AuthService } from 'src/services/auth.service';
export declare class ConfigsController {
    private readonly connection;
    private readonly crypt;
    private readonly auth;
    constructor(connection: Connection, crypt: CryptService, auth: AuthService);
    findAll(limit?: number, page?: number): Promise<Array<Configs & {
        value: string;
    }>>;
    create(token: any, createConfigDto: CreateConfigDto): Promise<{
        id: string;
    }>;
    update(id: string, updateConfigDto: Partial<CreateConfigDto>): Promise<void>;
    remove(id: string): Promise<void>;
}
