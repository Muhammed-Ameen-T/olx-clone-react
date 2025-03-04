"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_js_1 = __importDefault(require("../models/User.js"));
const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const secret = process.env.JWT_SECRET;
            if (!secret)
                throw new Error("JWT_SECRET is not defined");
            const decoded = jsonwebtoken_1.default.verify(token, secret);
            const user = await User_js_1.default.findById(decoded.id);
            if (!user) {
                return res.status(401).json({ message: "Not authorized, user not found" });
            }
            req.user = user;
            next();
        }
        catch (error) {
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    }
    else {
        return res.status(401).json({ message: "Not authorized, no token" });
    }
};
exports.protect = protect;
