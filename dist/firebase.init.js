"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initilaizeFirebase = void 0;
const fs_extra_1 = require("fs-extra");
const app_config_1 = require("./app.config");
const admin = __importStar(require("firebase-admin"));
async function initilaizeFirebase() {
    console.log('[INFO] Initializing Firebase Admin...');
    const firebaseConfig = app_config_1.FIREBASE_CONFIG;
    const serviceAccount = await (0, fs_extra_1.readJSON)(app_config_1.FIREBASE_CREDENTIAL);
    firebaseConfig.credential = admin.credential.cert(serviceAccount);
    return admin.initializeApp(firebaseConfig);
}
exports.initilaizeFirebase = initilaizeFirebase;
//# sourceMappingURL=firebase.init.js.map