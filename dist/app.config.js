"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DATABASE_URL = exports.PG_DATABASE = exports.PG_PASSWORD = exports.PG_USERNAME = exports.PG_PORT = exports.PG_HOST = exports.FIREBASE_CONFIG = exports.FIREBASE_CREDENTIAL = exports.APP_SECRET = exports.PORT = void 0;
const path_1 = require("path");
const process_1 = require("process");
exports.PORT = process_1.env.PORT || 3000;
exports.APP_SECRET = process_1.env.APP_SECRET || 'secret';
exports.FIREBASE_CREDENTIAL = (0, path_1.resolve)((0, process_1.cwd)(), 'service-account.json');
exports.FIREBASE_CONFIG = {
    databaseURL: process_1.env.FIREBASE_DATABASE_URL,
    storageBucket: process_1.env.FIREBASE_STORAGE_BUCKET,
};
exports.PG_HOST = process_1.env.PG_HOST || 'localhost';
exports.PG_PORT = parseInt(process_1.env.PG_PORT || '5432');
exports.PG_USERNAME = process_1.env.PG_USERNAME || 'postgres';
exports.PG_PASSWORD = process_1.env.PG_PASSWORD || 'postgres';
exports.PG_DATABASE = process_1.env.PG_DATABASE || 'postgres';
exports.DATABASE_URL = process_1.env.DATABASE_URL;
//# sourceMappingURL=app.config.js.map