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
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.authCheck = exports.logout = exports.login = exports.signup = void 0;
const authService = __importStar(require("../services/authService"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res
            .status(400)
            .json({ success: false, message: "All fields are required" });
        return;
    }
    try {
        const result = yield authService.signup(username, email, password);
        console.log(result);
        if (!result) {
            res.status(401).json({ success: false, message: "Signup failed" });
            return;
        }
        // Set cookie
        res.cookie("token", result === null || result === void 0 ? void 0 : result.token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 3600000, // 1 hour
        });
        res.status(201).json({ success: true, user: result === null || result === void 0 ? void 0 : result.user });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error" });
        return;
    }
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            status: 400,
            success: false,
            message: "All fields are required !",
        });
        return;
    }
    try {
        const result = yield authService.login(email, password);
        console.log(result);
        if (!result) {
            res
                .status(401)
                .json({ status: 401, success: false, message: "Invalid Credentials" });
            return;
        }
        res.cookie("token", result === null || result === void 0 ? void 0 : result.token, {
            httpOnly: true,
            maxAge: 3600000,
            sameSite: "lax",
            secure: false,
        });
        res.status(200).json({ status: 200, success: true, user: result === null || result === void 0 ? void 0 : result.user });
    }
    catch (error) {
        res
            .status(500)
            .json({ status: 500, success: true, message: "Internal Server Error" });
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.clearCookie("token");
    res
        .status(200)
        .json({ status: 200, success: true, message: "Logout successfully !" });
});
exports.logout = logout;
const authCheck = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json({ status: 200, success: true, user: req.user });
    }
    catch (error) {
        res
            .status(500)
            .json({ status: 500, success: false, message: "Internal Server Error" });
    }
});
exports.authCheck = authCheck;
