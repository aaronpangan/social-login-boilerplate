"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const fs_1 = __importDefault(require("fs"));
const https_1 = __importDefault(require("https"));
const app_1 = __importDefault(require("./app"));
dotenv_1.default.config();
const SSL = {
    key: fs_1.default.readFileSync('cert/key.pem'),
    cert: fs_1.default.readFileSync('cert/cert.pem'),
};
const server = https_1.default.createServer(SSL, app_1.default);
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const port = process.env.port || 5000;
        server.listen(port, () => {
            console.log(`Server started at ${port}`);
        });
    });
}
startServer();
