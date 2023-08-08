"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sessionsController_1 = __importDefault(require("../../controllers/sessionsController"));
var router = express_1.default.Router();
router.route("/").get(sessionsController_1.default);
exports.default = router;
