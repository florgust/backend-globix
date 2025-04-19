"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
require('module-alias/register');
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const LocalizacaoRouter_1 = __importDefault(require("@routes/LocalizacaoRouter"));
const ViagemRouter_1 = __importDefault(require("@routes/ViagemRouter"));
const UsuarioRouter_1 = __importDefault(require("@routes/UsuarioRouter"));
const SolicitacaoRouter_1 = __importDefault(require("@routes/SolicitacaoRouter"));
const LoginRouter_1 = __importDefault(require("@routes/LoginRouter"));
const ErrorHandler_1 = require("@middlewares/ErrorHandler");
const cors = require('cors');
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(cors());
app.use('/', ViagemRouter_1.default);
app.use('/', LocalizacaoRouter_1.default);
app.use('/', UsuarioRouter_1.default);
app.use('/', SolicitacaoRouter_1.default);
app.use('/', LoginRouter_1.default);
app.use((0, ErrorHandler_1.errorDefaultHandler)());
app.get('/', (req, res) => {
    res.send('API está rodando!');
});
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000; //Porta padrão 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
exports.default = app;
