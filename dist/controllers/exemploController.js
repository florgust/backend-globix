"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exemploController = void 0;
const exemploService_1 = require("../services/exemploService");
const exemploController = (req, res) => {
    const data = (0, exemploService_1.exemploService)();
    res.json({ message: data });
};
exports.exemploController = exemploController;
