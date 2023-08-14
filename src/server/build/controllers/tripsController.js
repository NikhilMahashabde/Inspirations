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
exports.handleDeleteTrip = exports.getTripsByUserEmail = exports.getTripById = exports.createNewTrip = void 0;
var trips_1 = __importDefault(require("../model/trips"));
var axios_1 = __importDefault(require("axios"));
var createNewTrip = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var searchQuery, unsplashImageUrl, tripImage, response, err_1, newTrip, savedTrip, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                searchQuery = "";
                if (req.body.destinations.length == 0) {
                    searchQuery = "travel";
                }
                else {
                    searchQuery = req.body.destinations.join(",");
                }
                unsplashImageUrl = "https://api.unsplash.com/photos/random?query=".concat(searchQuery, "&client_id=Iy-9nBKpFYGdxpRDphCLXT_rdtdPdF1eGkPeTj7UEQA&orientation=landscape&count=1");
                tripImage = [];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, axios_1.default.get(unsplashImageUrl)];
            case 2:
                response = _b.sent();
                tripImage.push(response.data[0].urls.regular);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _b.sent();
                console.log(err_1);
                return [3 /*break*/, 4];
            case 4:
                newTrip = new trips_1.default({
                    name: req.body.name,
                    images: tripImage,
                    description: req.body.description,
                    purpose: req.body.purpose,
                    budget: req.body.budget,
                    startDate: req.body.startDate,
                    endDate: req.body.endDate,
                    participants: req.body.participants,
                    authorisation: [(_a = req.session) === null || _a === void 0 ? void 0 : _a.email],
                    endLocation: req.body.endLocation,
                    startLocation: req.body.startLocation,
                    destinations: req.body.destinations,
                });
                _b.label = 5;
            case 5:
                _b.trys.push([5, 7, , 8]);
                return [4 /*yield*/, newTrip.save()];
            case 6:
                savedTrip = _b.sent();
                res.json({ message: "success", _id: savedTrip._id });
                return [3 /*break*/, 8];
            case 7:
                error_1 = _b.sent();
                res.status(500).json({ message: "Error creating trip ".concat(error_1) });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.createNewTrip = createNewTrip;
var getTripById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, retrievedTrip, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, trips_1.default.findById(id)];
            case 2:
                retrievedTrip = _a.sent();
                res.json({ message: "success", trip: retrievedTrip });
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                res.status(500).json({ message: "Error retrieving trip ".concat(error_2) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getTripById = getTripById;
var getTripsByUserEmail = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userEmail, retrievedTrips, error_3;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                userEmail = (_a = req.session) === null || _a === void 0 ? void 0 : _a.email;
                if (!userEmail)
                    return [2 /*return*/, res.status(400).json({ message: "Unauthorised" })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, trips_1.default.find({
                        authorisation: { $in: [userEmail] },
                    })];
            case 2:
                retrievedTrips = _b.sent();
                res.json({ message: "success", tripList: retrievedTrips });
                return [3 /*break*/, 4];
            case 3:
                error_3 = _b.sent();
                res.status(500).json({ message: "Error retrieving trip ".concat(error_3) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.getTripsByUserEmail = getTripsByUserEmail;
var handleDeleteTrip = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, userEmail, error_4;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = req.params.id;
                userEmail = (_a = req.session) === null || _a === void 0 ? void 0 : _a.email;
                if (!userEmail)
                    return [2 /*return*/, res.status(400).json({ message: "Unathorised" })];
                _b.label = 1;
            case 1:
                _b.trys.push([1, 3, , 4]);
                return [4 /*yield*/, trips_1.default.findByIdAndDelete(id)];
            case 2:
                _b.sent();
                res.json({ message: "deleted trip success", deletedTrip: id });
                return [3 /*break*/, 4];
            case 3:
                error_4 = _b.sent();
                res.status(500).json({ message: "Error Deleeting trip ".concat(id, " - ").concat(error_4) });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.handleDeleteTrip = handleDeleteTrip;
