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
exports.handleAddTripNodeAI = void 0;
var trips_1 = __importDefault(require("../model/trips"));
var completions_1 = require("completions");
// @ts-nocheck
// const configuration = new Configuration({
//   apiKey: process.env.OPENAI_API_KEY,
// });
// const openai = new OpenAIApi(configuration);
// interface ErrorResponse {
//   error: {
//     message: string;
//   };
// }
var handleAddTripNodeAI = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var chat, id, foundTrip, userPrompt, resp, aiData, newNode, error_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!process.env.OPENAI_API_KEY) {
                    return [2 /*return*/, res.status(500).json({
                            error: {
                                message: "OpenAI API key not configured",
                            },
                        })];
                }
                chat = (0, completions_1.createChat)({
                    apiKey: process.env.OPENAI_API_KEY,
                    model: "gpt-3.5-turbo",
                });
                id = req.params.id;
                if (!req.body.newNodeAIPromptData.nodeType)
                    return [2 /*return*/, res.status(400).json({ error: " missing or incorrect nodetype " })];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                return [4 /*yield*/, trips_1.default.findById(id)];
            case 2:
                foundTrip = _a.sent();
                if (!foundTrip) {
                    return [2 /*return*/, res.status(404).json({ error: "Trip not found" })];
                }
                userPrompt = req.body.newNodeAIPromptData;
                console.log(generatePrompt(userPrompt, foundTrip));
                _a.label = 3;
            case 3:
                _a.trys.push([3, 6, , 7]);
                return [4 /*yield*/, chat.sendMessage(generatePrompt(userPrompt, foundTrip))];
            case 4:
                resp = _a.sent();
                aiData = JSON.parse(resp.content);
                newNode = {};
                switch (req.body.newNodeAIPromptData.nodeType.toLowerCase()) {
                    case "accommodation":
                        newNode = {
                            nodeType: "".concat(req.body.newNodeAIPromptData.nodeType),
                            duration: 0,
                            origin: "".concat(req.body.newNodeAIPromptData.origin) || "",
                            destination: "Accommodation at ".concat(req.body.newNodeAIPromptData.destination, ": ").concat(aiData.accommodation),
                            activities: "".concat(req.body.newNodeAIPromptData.activities) || "",
                            description: "".concat(aiData.description) || "",
                            startTime: new Date(aiData.startTime) || new Date(),
                            endTime: new Date(aiData.endTime) || new Date(),
                            notes: "Other options: ".concat(aiData.notes) || "",
                            budget: aiData.budget,
                            _id: req.body.newNodeAIPromptData._id,
                        };
                        break;
                    case "travel":
                        newNode = {
                            nodeType: "".concat(req.body.newNodeAIPromptData.nodeType),
                            duration: 0,
                            origin: "".concat(req.body.newNodeAIPromptData.origin) || "",
                            destination: "Travel to ".concat(req.body.newNodeAIPromptData.destination, ": ").concat(aiData.mode),
                            activities: "".concat(req.body.newNodeAIPromptData.activities) || "",
                            description: "".concat(aiData.description) || "",
                            startTime: new Date(aiData.startTime) || new Date(),
                            endTime: new Date(aiData.endTime) || new Date(),
                            notes: "Other options: ".concat(aiData.notes) || "",
                            budget: aiData.budget,
                            _id: req.body.newNodeAIPromptData._id,
                        };
                        break;
                    case "activity":
                        newNode = {
                            nodeType: "".concat(req.body.newNodeAIPromptData.nodeType),
                            duration: 0,
                            origin: "".concat(req.body.newNodeAIPromptData.origin) || "",
                            destination: " Activity at ".concat(req.body.newNodeAIPromptData.destination, ": ").concat(aiData.activity),
                            activities: "".concat(aiData.activity) || "",
                            description: "".concat(aiData.description) || "",
                            startTime: new Date(aiData.startTime) || new Date(),
                            endTime: new Date(aiData.endTime) || new Date(),
                            notes: "Other options: ".concat(aiData.notes) || "",
                            budget: aiData.budget,
                            _id: req.body.newNodeAIPromptData._id,
                        };
                        break;
                    case "sightseeing":
                        newNode = {
                            nodeType: "".concat(req.body.newNodeAIPromptData.nodeType),
                            duration: 0,
                            origin: "".concat(req.body.newNodeAIPromptData.origin) || "",
                            destination: "Sightseeing at ".concat(req.body.newNodeAIPromptData.destination, ": ").concat(aiData.sightseeing),
                            activities: "".concat(aiData.sightseeing) || "",
                            description: "".concat(aiData.description) || "",
                            startTime: new Date(aiData.startTime) || new Date(),
                            endTime: new Date(aiData.endTime) || new Date(),
                            notes: "Other options: ".concat(aiData.notes) || "",
                            budget: aiData.budget,
                            _id: req.body.newNodeAIPromptData._id,
                        };
                        break;
                    case "meal":
                        newNode = {
                            nodeType: "".concat(req.body.newNodeAIPromptData.nodeType),
                            duration: 0,
                            origin: "".concat(req.body.newNodeAIPromptData.origin) || "",
                            destination: "Meal at ".concat(req.body.newNodeAIPromptData.destination, ": ").concat(aiData.meal),
                            activities: "".concat(aiData.meal) || "",
                            description: "".concat(aiData.description) || "",
                            startTime: new Date(aiData.startTime) || new Date(),
                            endTime: new Date(aiData.endTime) || new Date(),
                            notes: "Other options: ".concat(aiData.notes) || "",
                            budget: aiData.budget,
                            _id: req.body.newNodeAIPromptData._id,
                        };
                        break;
                    default:
                        return [2 /*return*/, res.json({ updatedTrip: foundTrip })];
                }
                console.log(newNode);
                foundTrip.nodes.splice(userPrompt.nodeTo, 0, newNode);
                return [4 /*yield*/, foundTrip.save()];
            case 5:
                _a.sent();
                return [2 /*return*/, res.json({ updatedTrip: foundTrip })];
            case 6:
                error_1 = _a.sent();
                console.log(error_1);
                res.status(500).json(error_1);
                return [3 /*break*/, 7];
            case 7: return [3 /*break*/, 9];
            case 8:
                error_2 = _a.sent();
                return [2 /*return*/, res.status(401).json({ error: error_2 })];
            case 9: return [2 /*return*/];
        }
    });
}); };
exports.handleAddTripNodeAI = handleAddTripNodeAI;
function generatePrompt(userPrompt, foundTrip) {
    var AIPrompt = "";
    var nodeType = userPrompt.nodeType.toLowerCase();
    switch (nodeType) {
        case "accommodation":
            AIPrompt = "Visiting ".concat(userPrompt.destination, ". Provide suggestion for each key value below, return response in json string format\n      {\n        accommodation: name of accomodation,\n        description: short description of accomodation and address,\n        budget: estimated cost to stay 1, only digits,\n        startTime: estimtated check in time ISO string,, \n        endTime: estimated check out time in ISO string,\n        notes: provide two more options for accommodation names nearby as a string\n      }");
            break;
        case "travel":
            // eslint-disable-next-line no-case-declarations
            var origin = void 0, destination = "";
            if (Number(userPrompt.nodeFrom) == -1) {
                origin = foundTrip.startLocation;
            }
            else {
                if (userPrompt.nodeFrom !== null) {
                    origin = foundTrip.nodes[userPrompt.nodeFrom].destination;
                }
            }
            if (userPrompt.nodeTo === foundTrip.nodes.length) {
                destination = foundTrip.endLocation;
            }
            else {
                if (userPrompt.nodeTo !== null) {
                    destination = foundTrip.nodes[userPrompt.nodeTo].destination;
                }
            }
            AIPrompt =
                AIPrompt = "Travelling from ".concat(origin, " to ").concat(destination, " . Provide suggestion for each key value below, return response in json string format\n      {\n        mode: method of travel e.g. drive, public transport etc.,\n        description: short description of journey,\n        budget: estimated cost as a number without $ in string format,\n        startTime: estimtated start time ISO string,\n        endTime: estimated arrival time in ISO string,\n        notes: provide two more alternative modes of travel for this journey\n      }");
            break;
        case "activity":
            AIPrompt = "Visiting ".concat(userPrompt.destination, ". Provide suggestion for each key value below, return response in json string format\n      {\n        activity: name of activity,\n        description: short description of activity and address,\n        budget: estimated cost per person as a number without $ in string format,\n        startTime: estimtated start time of activity time ISO string,, \n        endTime: estimtated end time of activity in ISO string,\n        notes: provide two more options for activities in the area nearby as a string\n      }");
            break;
        case "sightseeing":
            AIPrompt = "Visiting ".concat(userPrompt.destination, ". Provide suggestion for each key value below, return response in json string format\n      {\n        sightseeing: name of sightseeing activity,\n        description: short description of activity and address,\n        budget: estimated cost per person as a number without $ in string format,\n        startTime: estimtated start time of activity time ISO string,, \n        endTime: estimtated end time of activity in ISO string,\n        notes: provide two more options for sightseeing in the area nearby as a string\n      }");
            break;
        case "meal":
            AIPrompt = "Visiting ".concat(userPrompt.destination, ". Provide suggestion for each key value below, return response in json string format\n      {\n        meal: name of a place to eat a meal,\n        description: short description of meal establishment and address,\n        budget: estimated cost per person as a number without $ in string format,\n        startTime: estimtated start time of activity time ISO string,, \n        endTime: estimtated end time of activity in ISO string,\n        notes: provide two more options for eating meals in the area nearby as a string\n      }");
            break;
        default:
            AIPrompt = "Unknown nodeType: ".concat(nodeType);
            break;
    }
    return AIPrompt;
}
