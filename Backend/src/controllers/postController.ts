import { Request, Response } from "express";
import Advertisement, { IAdvertisement } from "../models/Ad.js"; // Adjust path
import User from "../models/User.js"; // Adjust path
import mongoose from "mongoose";

export const createAdvertisement = async (req: Request, res: Response): Promise<void> => {
  try {
    // Check for authenticated user
    if (!req.userId) {
      res.status(401).json({ message: "Authentication required" });
      return;
    }

    const user = await User.findById(req.userId);
    if (!user) {
      res.status(400).json({ message: "Invalid user ID" });
      return;
    }

    // Validate required fields
    const { category, subCategory, title, description, price, location, phone, images } = req.body;
    if (!category || !subCategory || !title || !description || !price || !location || !phone || !images) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // Prepare advertisement data
    const advertisementData: Partial<IAdvertisement> = {
      category,
      subCategory,
      title,
      description,
      price: Number(price),
      location,
      phone,
      images,
      user: req.userId,
    };

    // Create and save the advertisement
    const advertisement = await Advertisement.create(advertisementData);

    res.status(201).json({
      message: "Advertisement created successfully",
      advertisement: {
        _id: advertisement._id,
        category: advertisement.category,
        subCategory: advertisement.subCategory,
        title: advertisement.title,
        description: advertisement.description,
        price: advertisement.price,
        location: advertisement.location,
        phone: advertisement.phone,
        images: advertisement.images,
        user: advertisement.user,
        createdAt: advertisement.createdAt,
        updatedAt: advertisement.updatedAt,
      },
    });
  } catch (error: unknown) {
    console.error("Error in createAdvertisement:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    if (error instanceof mongoose.Error.ValidationError) {
      res.status(400).json({ message: "Validation error", error: errorMessage });
      return;
    }
    res.status(500).json({ message: "Server error", error: errorMessage });
  }
};