"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const app_config_1 = require("./app.config");
const firebase_init_1 = require("./firebase.init");
const helmet_1 = __importDefault(require("helmet"));
async function bootstrap() {
    await (0, firebase_init_1.initilaizeFirebase)();
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.getHttpAdapter().set('trust proxy', 1);
    app.use((0, helmet_1.default)());
    app.enableCors();
    app.setGlobalPrefix('/admin');
    await app.listen(app_config_1.PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map