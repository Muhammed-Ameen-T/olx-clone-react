import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// In-memory OTP storage (for demo; use Redis or SMS service in production)
const otpStore: { [key: string]: { otp: string; expires: number } } = {};

const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

const generateToken = (id: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("JWT_SECRET is not defined");
  return jwt.sign({ id }, secret, { expiresIn: "30d" });
};

export const requestOTP = async (req: Request, res: Response): Promise<void> => {
  const { name, phone } = req.body;

  if (!name || !phone) {
    res.status(400).json({ message: "Name and phone are required" });
    return;
  }

  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phone)) {
    res.status(400).json({ message: "Phone must be a 10-digit number" });
    return;
  }

  try {
    let user = await User.findOne({ phone });
    const otp = generateOTP();
    const expires = Date.now() + 20 * 60 * 1000; // 20 minutes

    if (!user) {
      user = await User.create({ name, phone });
    }

    otpStore[phone] = { otp, expires };
    console.log(`OTP for ${phone}: ${otp}`);

    res.status(200).json({ message: "OTP sent successfully", phone });
  } catch (error: unknown) {
    console.error("Error in requestOTP:", error);
    // Assert error as Error or provide fallback
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    res.status(400).json({ message: "Phone and OTP are required" });
    return;
  }

  if (!/^\d{6}$/.test(otp)) {
    res.status(400).json({ message: "OTP must be a 6-digit number" });
    return;
  }

  try {
    const user = (await User.findOne({ phone })) as { _id: string; name: string; phone: string } | null;
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const storedOTP = otpStore[phone];
    if (!storedOTP || storedOTP.otp !== otp || storedOTP.expires < Date.now()) {
      res.status(400).json({ message: "Invalid or expired OTP" });
      return;
    }

    delete otpStore[phone];

    const token = generateToken(user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      phone: user.phone,
      token,
    });
  } catch (error: unknown) {
    console.error("Error in verifyOTP:", error);
    // Assert error as Error or provide fallback
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};

export const googleLogin = async (req: Request, res: Response): Promise<void> => {
  const { name, googleId } = req.body;

  if (!name || !googleId) {
    res.status(400).json({ message: "Name and Google ID are required" });
    return;
  }

  try {
    let user = await User.findOne({ googleId });
    if (!user) {
      user = await User.create({
        name,
        googleId,
        phone: `${googleId}@google.com`, // Dummy phone to satisfy schema
      });
    } else {
      if (user.name !== name) {
        user.name = name;
        await user.save();
      }
    }

    const token = generateToken(user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      googleId: user.googleId,
      token,
    });
  } catch (error: unknown) {
    console.error("Error in googleLogin:", error);
    // Assert error as Error or provide fallback
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};


