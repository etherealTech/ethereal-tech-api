"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigsController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const configs_entity_1 = require("./configs.entity");
const CreateConfig_dto_1 = require("./dto/CreateConfig.dto");
const crypt_service_1 = require("../services/crypt.service");
const auth_guard_1 = require("../auth.guard");
const auth_service_1 = require("../services/auth.service");
let ConfigsController = class ConfigsController {
    constructor(connection, crypt, auth) {
        this.connection = connection;
        this.crypt = crypt;
        this.auth = auth;
    }
    async findAll(limit = 10, page = 1) {
        return this.connection
            .getRepository(configs_entity_1.Configs)
            .createQueryBuilder()
            .addOrderBy('id', 'DESC')
            .limit(limit)
            .offset(page - 1)
            .getMany()
            .then((configs) => configs.map((config) => {
            config.value = this.crypt.decrypt(config.encrypted_value);
            delete config.encrypted_value;
            return config;
        }));
    }
    async create(token, createConfigDto) {
        const auth = await this.auth.getDecodeToken(token);
        const configs = new configs_entity_1.Configs();
        configs.key_name = createConfigDto.key_name;
        configs.provider_name = createConfigDto.provider_name;
        configs.encrypted_value = this.crypt.encrypt(createConfigDto.value);
        configs.account_name = createConfigDto.account_name;
        configs.created_uid = auth.uid;
        configs.created_at = new Date();
        return this.connection
            .getRepository(configs_entity_1.Configs)
            .save(configs)
            .then(({ id }) => ({ id }));
    }
    update(id, updateConfigDto) {
        const configs = new configs_entity_1.Configs();
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
            .getRepository(configs_entity_1.Configs)
            .save(configs)
            .then(() => undefined);
    }
    remove(id) {
        return this.connection
            .getRepository(configs_entity_1.Configs)
            .remove(Object.assign(new configs_entity_1.Configs(), { id }))
            .then(() => undefined);
    }
};
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Optional)()),
    __param(0, (0, common_1.Query)('limit')),
    __param(1, (0, common_1.Optional)()),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ConfigsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Query)('token')),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateConfig_dto_1.CreateConfigDto]),
    __metadata("design:returntype", Promise)
], ConfigsController.prototype, "create", null);
__decorate([
    (0, common_1.Put)('/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Body)(common_1.ValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ConfigsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)('/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    __param(0, (0, common_1.Param)('id', common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ConfigsController.prototype, "remove", null);
ConfigsController = __decorate([
    (0, common_1.Controller)('/configs'),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    __metadata("design:paramtypes", [typeorm_1.Connection,
        crypt_service_1.CryptService,
        auth_service_1.AuthService])
], ConfigsController);
exports.ConfigsController = ConfigsController;
//# sourceMappingURL=configs.controller.js.map