"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CryptService = void 0;
const common_1 = require("@nestjs/common");
const app_config_1 = require("../app.config");
const cryptr_1 = __importDefault(require("cryptr"));
let CryptService = class CryptService {
    constructor() {
        this._crypt = new cryptr_1.default(app_config_1.APP_SECRET);
    }
    encrypt(text) {
        return this._crypt.encrypt(text);
    }
    decrypt(encrypted) {
        return this._crypt.decrypt(encrypted);
    }
};
CryptService = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Injectable)()
], CryptService);
exports.CryptService = CryptService;
//# sourceMappingURL=crypt.service.js.map