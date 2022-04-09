"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const throttler_1 = require("@nestjs/throttler");
const app_config_1 = require("./app.config");
const configs_entity_1 = require("./configs/configs.entity");
const configs_controller_1 = require("./configs/configs.controller");
const crypt_service_1 = require("./services/crypt.service");
const auth_service_1 = require("./services/auth.service");
const core_1 = require("@nestjs/core");
const dbConfigs = app_config_1.DATABASE_URL
    ? { url: app_config_1.DATABASE_URL }
    : {
        host: app_config_1.PG_HOST,
        port: app_config_1.PG_PORT,
        username: app_config_1.PG_USERNAME,
        password: app_config_1.PG_PASSWORD,
        database: app_config_1.PG_DATABASE,
        url: app_config_1.DATABASE_URL,
    };
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot(Object.assign(Object.assign({ type: 'postgres' }, dbConfigs), { extra: {
                    ssl: false,
                }, synchronize: true, entities: [configs_entity_1.Configs] })),
            throttler_1.ThrottlerModule.forRoot({
                ttl: 60,
                limit: 100,
            }),
        ],
        controllers: [configs_controller_1.ConfigsController],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: throttler_1.ThrottlerGuard,
            },
            auth_service_1.AuthService,
            crypt_service_1.CryptService,
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map