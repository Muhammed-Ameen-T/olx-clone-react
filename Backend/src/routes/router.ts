import express, { RequestHandler } from "express";
import { requestOTP, verifyOTP, googleLogin } from "../controllers/authController.js"; // Adjust path
import { createAdvertisement } from "../controllers/postController.js"; // Adjust path
import { authenticate } from "../middleware/authenticate.js"; // Adjust path

const router = express.Router();

// Authentication Routes
router.post("/otp-login", requestOTP as RequestHandler);
router.post("/verify-otp", verifyOTP as RequestHandler);
router.post("/google-login", googleLogin as RequestHandler);

// Advertisement Route
router.post("/advertisements", authenticate, createAdvertisement as RequestHandler);

export default router;