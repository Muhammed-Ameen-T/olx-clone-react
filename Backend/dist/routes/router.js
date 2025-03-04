"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_js_1 = require("../controllers/authController.js");
// Explicitly type the controller functions as RequestHandler
const router = express_1.default.Router();
router.post("/otp-login", authController_js_1.requestOTP); // Step 1: Request OTP
router.post("/verify-otp", authController_js_1.verifyOTP); // Step 2: Verify OTP and login/signup
exports.default = router;
