"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importStar(require("mongoose"));
var nodeSchema = new mongoose_1.Schema({
    nodeType: { type: String },
    duration: { type: Number },
    origin: { type: String },
    destination: { type: String },
    description: { type: String },
    activities: { type: String },
    startTime: { type: Date },
    endTime: { type: Date },
    notes: { type: String },
    budget: { type: Number },
});
var tripSchema = new mongoose_1.Schema({
    name: { type: String },
    authorisation: { type: [String] },
    purpose: { type: String },
    budget: { type: Number },
    startDate: { type: Date },
    endDate: { type: Date },
    nodes: { type: [nodeSchema] },
    startLocation: { type: String },
    endLocation: { type: String },
    images: { type: [String] },
    destinations: { type: [String] },
});
var TripModel = mongoose_1.default.model("Trips", tripSchema);
exports.default = TripModel;
