"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var tripsController_1 = require("../../controllers/tripsController");
var router = express_1.default.Router();
router.route("/").post(tripsController_1.createNewTrip).get(tripsController_1.getTripsByUserEmail);
router.route("/:id").get(tripsController_1.getTripById).delete(tripsController_1.handleDeleteTrip);
exports.default = router;
