"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var session_1 = __importDefault(require("./middleware/session"));
var dBConn_1 = __importDefault(require("./config/dBConn"));
var mongoose_1 = __importDefault(require("mongoose"));
var login_1 = __importDefault(require("./routes/api/login"));
var logout_1 = __importDefault(require("./routes/logout"));
var users_1 = __importDefault(require("./routes/api/users"));
var sessions_1 = __importDefault(require("./routes/api/sessions"));
var trips_1 = __importDefault(require("./routes/api/trips"));
var auth_1 = __importDefault(require("./routes/auth"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var trip_1 = __importDefault(require("./routes/api/trip"));
var ai_1 = __importDefault(require("./routes/api/ai"));
var PORT = 10100;
exports.app = (0, express_1.default)();
//config
//middlwares
exports.app.use(express_1.default.urlencoded({ extended: false })); // built in middle ware. encoded data e.g. form data.
exports.app.use(express_1.default.json()); // json parser
(0, dBConn_1.default)();
exports.app.use(session_1.default);
exports.app.use((0, cookie_parser_1.default)());
//routes public
exports.app.use("/auth", auth_1.default);
exports.app.use("/api/login", login_1.default);
exports.app.use("/api/logout", logout_1.default);
exports.app.use("/api/users", users_1.default);
exports.app.use("/api/sessions", sessions_1.default);
// app.use("/logout", require("./routes/logout"));
exports.app.get("/api/test", function (_, res) { return res.json({ test: "test" }); });
//middle ware for redirect if unathorised)
//routes private
exports.app.use("/api/trips", trips_1.default);
exports.app.use("/api/trip", trip_1.default);
exports.app.use("/api/ai", ai_1.default);
exports.app.use(express_1.default.static(path_1.default.join(__dirname, "/public")));
exports.app.use(function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "/public/index.html"));
});
//connect app
mongoose_1.default.connection.once("open", function () {
    console.log("Connected to MongoDB");
    exports.app.listen(PORT, function () { return console.log("server running on port ".concat(PORT)); });
});
