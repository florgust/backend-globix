"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ViagemController_1 = require("@controllers/ViagemController");
const router = express_1.default.Router();
router.get('/viagens', ViagemController_1.getViagens);
router.get('/viagem/:id', ViagemController_1.getViagemById);
router.post('/viagem', ViagemController_1.createViagem);
router.put('/viagem/:id', ViagemController_1.updateViagem);
router.delete('/viagem/:id', ViagemController_1.deleteViagem);
exports.default = router;
//# sourceMappingURL=ViagemRouter.js.map