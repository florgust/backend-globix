"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const LocalizacaoController_1 = require("@controllers/LocalizacaoController");
const router = express_1.default.Router();
// Rotas para Localizações
router.get('/localizacoes', LocalizacaoController_1.getLocalizacoes); // Buscar todas as localizações
router.get('/localizacao/:id', LocalizacaoController_1.getLocalizacaoById); // Buscar localização por ID
router.post('/localizacao', LocalizacaoController_1.createLocalizacao); // Criar uma nova localização
router.put('/localizacao/:id', LocalizacaoController_1.updateLocalizacao); // Atualizar uma localização existente
router.delete('/localizacao/:id', LocalizacaoController_1.deleteLocalizacao); // Deletar uma localização
exports.default = router;
//# sourceMappingURL=LocalizacaoRouter.js.map