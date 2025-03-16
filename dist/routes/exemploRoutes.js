"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const exemploController_1 = require("../controllers/exemploController");
const router = express_1.default.Router();
router.get('/exemplo', exemploController_1.exemploController);
exports.default = router;
