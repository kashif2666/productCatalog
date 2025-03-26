"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectRoute = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const protectRoute = (req, res, next) => {
    var _a;
    const token = (_a = req.cookies) === null || _a === void 0 ? void 0 : _a.token;
    if (!token) {
        res.status(401).json({
            status: 401,
            success: false,
            message: "Not Authorized, No token !",
        });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        if (decoded.password) {
            delete decoded.password;
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({
            status: 401,
            success: false,
            message: "Not Authorized, invalid token",
        });
    }
};
exports.protectRoute = protectRoute;
