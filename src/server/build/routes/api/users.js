"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var usersController_1 = require("../../controllers/usersController");
var router = express_1.default.Router();
router.route("/").post(usersController_1.createNewUser);
exports.default = router;
