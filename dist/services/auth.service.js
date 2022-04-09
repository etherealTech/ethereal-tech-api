"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const firebase_admin_1 = require("firebase-admin");
let AuthService = class AuthService {
    constructor() {
        this._auth = (0, firebase_admin_1.auth)();
    }
    async verifyIdToken(req) {
        let token = req.headers['authorization'];
        if (!token) {
            throw new Error('Missing authroizaiton token in header field');
        }
        req.query.token = token.slice(7);
        await this._auth.verifyIdToken(req.query.token);
        return true;
    }
    getDecodeToken(token) {
        return this._auth.verifyIdToken(token);
    }
};
AuthService = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Injectable)()
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map