"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var tripController_1 = require("../../controllers/tripController");
var router = express_1.default.Router();
router
    .route("/:id")
    .post(tripController_1.handleAddTripNode)
    .delete(tripController_1.handleDeleteTripNode)
    .put(tripController_1.handleUpdateTripNode);
// router.route("/:id/:index")
exports.default = router;
