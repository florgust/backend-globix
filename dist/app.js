"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const UsuarioRouter_1 = __importDefault(require("./routes/UsuarioRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/', UsuarioRouter_1.default);
app.get('/', (req, res) => {
    res.send('API está rodando!');
});
const PORT = process.env.PORT || 3000; // Usar uma variável de ambiente ou o valor 3000 por padrão
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
exports.default = app;
