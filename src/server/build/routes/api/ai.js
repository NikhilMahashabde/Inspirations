"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var AIController_1 = require("../../controllers/AIController");
var router = express_1.default.Router();
router.route("/:id").post(AIController_1.handleAddTripNodeAI);
exports.default = router;
