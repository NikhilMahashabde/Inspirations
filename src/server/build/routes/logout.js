"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var logoutController_1 = __importDefault(require("../controllers/logoutController"));
var router = express_1.default.Router();
router.route("/").post(logoutController_1.default);
exports.default = router;
