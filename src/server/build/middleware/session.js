"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_session_1 = __importDefault(require("express-session"));
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var databaseURI = process.env.MONGO_URI;
var SESSION_KEY = process.env.SESSION_KEY;
if (!SESSION_KEY)
    throw new Error("SESSION_KEY not found in environment variables.");
var store = new connect_mongo_1.default({
    mongoUrl: databaseURI,
    collectionName: "sessions",
});
var enableSession = (0, express_session_1.default)({
    store: store,
    secret: SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        path: "/",
        secure: false,
        httpOnly: false,
        maxAge: 86400000, // Cookie expiration time in milliseconds (e.g., 1 day)
    },
});
exports.default = enableSession;
