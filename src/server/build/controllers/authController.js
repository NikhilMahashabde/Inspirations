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
exports.handleLogin = exports.handleJWT = void 0;
var axios_1 = __importDefault(require("axios"));
var users_1 = __importDefault(require("../model/users"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// interface loginRequest extends Request {
//   body: {
//     email: string;
//     password: string;
//   };
//   session: Session & {
//     email: string;
//     name: string;
//   };
// }
// interface LoginResponse extends Response {
//   message: string;
//   name: string;
//   // json: (data: {
//   //   message: string;
//   //   data?: string;
//   //   name?: string;
//   // }) => LoginResponse;
// }
var handleJWT = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var authorizationHeader, accessToken, decodedToken, userInfoEndpoint, userResponse, email, foundUser, newUser, error_1, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                authorizationHeader = req.headers.authorization;
                if (!(authorizationHeader && authorizationHeader.startsWith("Bearer "))) return [3 /*break*/, 10];
                accessToken = authorizationHeader.split(" ")[1];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                decodedToken = jsonwebtoken_1.default.decode(accessToken);
                userInfoEndpoint = "https://dev-8v4vi8wg2ppia707.us.auth0.com/userinfo";
                return [4 /*yield*/, axios_1.default.get(userInfoEndpoint, {
                        headers: {
                            Authorization: "Bearer ".concat(accessToken),
                        },
                    })];
            case 2:
                userResponse = _a.sent();
                email = userResponse.data.email;
                return [4 /*yield*/, users_1.default.findOne({ email: email })];
            case 3:
                foundUser = _a.sent();
                if (foundUser && foundUser.passwordHash !== "OAUTH")
                    return [2 /*return*/, res.status(400).json({
                            error: "Email is already regstered as a standard non-auth0 client",
                        })];
                if (!!foundUser) return [3 /*break*/, 7];
                _a.label = 4;
            case 4:
                _a.trys.push([4, 6, , 7]);
                newUser = {
                    name: userResponse.data.name,
                    email: userResponse.data.email,
                    passwordHash: "OAUTH",
                };
                return [4 /*yield*/, users_1.default.create(newUser)];
            case 5:
                _a.sent();
                req.session.email = newUser.email;
                req.session.name = newUser.name;
                return [2 /*return*/, res.json({
                        message: "Success",
                        name: newUser.name,
                        isAuthenticated: true,
                    })];
            case 6:
                error_1 = _a.sent();
                return [2 /*return*/, res
                        .status(400)
                        .json({ message: "Error creating user ".concat(error_1) })];
            case 7:
                req.session.email = foundUser.email;
                req.session.name = foundUser.name;
                return [2 /*return*/, res.json({
                        message: "Success",
                        name: foundUser.name,
                        isAuthenticated: true,
                    })];
            case 8:
                error_2 = _a.sent();
                return [3 /*break*/, 9];
            case 9: return [2 /*return*/, res.json({ message: "came here" })];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.handleJWT = handleJWT;
var handleLogin = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var foundUser, isValidPassword;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // Object.entries(req.body).forEach(([key, value]) => {
                //   console.log(key, ":", value);
                // });
                if (!(req.body.email && req.body.password))
                    return [2 /*return*/, res.status(400).json({ message: "invalid email or password input" })];
                return [4 /*yield*/, users_1.default.findOne({ email: req.body.email })];
            case 1:
                foundUser = _a.sent();
                if (!foundUser)
                    return [2 /*return*/, res.status(401).json({ message: "Email does not exist" })];
                isValidPassword = bcrypt_1.default.compareSync(req.body.password, foundUser.passwordHash);
                if (!isValidPassword)
                    return [2 /*return*/, res.status(401).json({ message: "Incorrect password" })];
                req.session.email = foundUser.email;
                req.session.name = foundUser.name;
                res.json({ message: "logged in successfully", name: foundUser.name });
                return [2 /*return*/];
        }
    });
}); };
exports.handleLogin = handleLogin;
