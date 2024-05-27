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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const AuthService_1 = require("../services/AuthService");
const UserService_1 = require("../services/UserService");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthController {
    static register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const token = yield AuthService_1.AuthService.registerUser(name, email, password);
                res.status(201).json({ token });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(400).json({ error: error.message });
                }
                else {
                    res.status(400).json({ error: "An unknown error occurred" });
                }
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const token = yield AuthService_1.AuthService.loginUser(email, password);
                res.status(200).json({ token });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(401).json({ error: error.message });
                }
                else {
                    res.status(401).json({ error: "An unknown error occurred" });
                }
            }
        });
    }
    static verify(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = req.body.token;
                if (!token) {
                    res.status(400).json({ error: "token was not provided" });
                    return;
                }
                const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY);
                const userId = payload.userId;
                if (!userId) {
                    res.status(400).json({ error: "invalid token" });
                }
                yield UserService_1.UserService.getUserById(userId);
                res.sendStatus(200);
            }
            catch (error) {
                res.status(400).json({ error: "invalid token" });
            }
        });
    }
}
exports.AuthController = AuthController;
