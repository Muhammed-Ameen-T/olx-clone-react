"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyOTP = exports.requestOTP = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_js_1 = __importDefault(require("../models/User.js")); // Import the model
// In-memory OTP storage (for demo purposes; use a real cache or SMS service in production)
const otpStore = {};
// Simulated OTP generation
const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};
const generateToken = (id) => {
    const secret = process.env.JWT_SECRET;
    if (!secret)
        throw new Error("JWT_SECRET is not defined");
    return jsonwebtoken_1.default.sign({ id }, secret, { expiresIn: "30d" });
};
const requestOTP = async (req, res) => {
    const { name, phone } = req.body;
    if (!name || !phone) {
        return res.status(400).json({ message: "Name and phone are required" });
    }
    try {
        let user = await User_js_1.default.findOne({ phone });
        const otp = generateOTP();
        const expires = Date.now() + 20 * 60 * 1000; // OTP expires in 20 minutes
        if (!user) {
            // Create new user if not found
            user = await User_js_1.default.create({ name, phone });
        }
        // Store OTP in memory (replace with SMS service in production)
        otpStore[phone] = { otp, expires };
        console.log(`OTP for ${phone}: ${otp}`); // Log OTP for testing
        res.status(200).json({ message: "OTP sent successfully", phone });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.requestOTP = requestOTP;
const verifyOTP = async (req, res) => {
    const { phone, otp } = req.body;
    if (!phone || !otp) {
        return res.status(400).json({ message: "Phone and OTP are required" });
    }
    try {
        // Use type assertion to ensure TypeScript knows user adheres to IUser
        const user = (await User_js_1.default.findOne({ phone }));
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const storedOTP = otpStore[phone];
        if (!storedOTP || storedOTP.otp !== otp || storedOTP.expires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        // Clear OTP from memory after verification
        delete otpStore[phone];
        // Since we asserted user has _id as string, this should work
        const token = generateToken(user._id);
        res.json({
            _id: user._id,
            name: user.name,
            phone: user.phone,
            token,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};
exports.verifyOTP = verifyOTP;
