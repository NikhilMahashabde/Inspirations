"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleUpdateTripNode = exports.handleDeleteTripNode = exports.handleAddTripNode = void 0;
var trips_1 = __importDefault(require("../model/trips"));
var handleAddTripNode = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, foundTrip, newNode, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!req.body.newTripData.nodeType)
                    return [2 /*return*/, res.status(400).json({ error: " missing or incorrect nodetype " })];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, trips_1.default.findById(id)];
            case 2:
                foundTrip = _a.sent();
                if (!foundTrip) {
                    return [2 /*return*/, res.status(404).json({ error: "Trip not found" })];
                }
                newNode = {
                    nodeType: "".concat(req.body.newTripData.nodeType),
                    duration: req.body.newTripData.duration,
                    origin: "".concat(req.body.newTripData.origin),
                    destination: "".concat(req.body.newTripData.destination),
                    activities: "".concat(req.body.newTripData.activities),
                    description: "".concat(req.body.newTripData.description),
                    startTime: new Date(req.body.newTripData.startTime),
                    endTime: new Date(req.body.newTripData.endTime),
                    notes: req.body.newTripData.notes,
                    budget: req.body.newTripData.budget,
                    _id: req.body.newTripData._id,
                };
                foundTrip.nodes.push(newNode);
                return [4 /*yield*/, foundTrip.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.json({ updatedTrip: foundTrip })];
            case 4:
                error_1 = _a.sent();
                return [2 /*return*/, res.status(401).json({ error: error_1 })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.handleAddTripNode = handleAddTripNode;
var handleDeleteTripNode = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, nodeIndex, Trip, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                nodeIndex = req.body.index;
                if (!(id && String(nodeIndex))) {
                    return [2 /*return*/, res.status(400).json({
                            message: "did not submit ID or correct node index, node not deleted",
                        })];
                }
                _a.label = 1;
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, trips_1.default.findOne({ _id: id })];
            case 2:
                Trip = _a.sent();
                if (!Trip)
                    return [2 /*return*/, res
                            .status(500)
                            .json({ message: "Cannot find trip, did not delete", trip: Trip })];
                if (nodeIndex < 0 || nodeIndex >= Trip.nodes.length)
                    return [2 /*return*/, res
                            .status(400)
                            .json({ message: "Invalid node index. Node not deleted." })];
                Trip.nodes.splice(nodeIndex, 1);
                return [4 /*yield*/, Trip.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, res
                        .status(200)
                        .json({ message: "Node deleted successfully.", updatedTrip: Trip })];
            case 4:
                error_2 = _a.sent();
                console.error(error_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.handleDeleteTripNode = handleDeleteTripNode;
var handleUpdateTripNode = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var tripData, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                tripData = req.body.data;
                if (!req.body.data)
                    return [2 /*return*/, res.status(400).json({
                            message: "did not submit Trip ",
                        })];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, trips_1.default.findByIdAndUpdate(tripData._id, tripData)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json({ updatedTrip: tripData })];
            case 3:
                error_3 = _a.sent();
                return [2 /*return*/, console.log(error_3)];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.handleUpdateTripNode = handleUpdateTripNode;
