import mongoose, { Document, Schema } from 'mongoose';

// Interface for Advertisement document
export interface IAdvertisement extends Document {
  category: string;
  subCategory: string;
  title: string;
  description: string;
  price: number;
  location: string;
  phone: string;
  images: string[];
  user: string;
  createdAt: Date;
  updatedAt: Date;
}

// Create the Advertisement schema
const AdvertisementSchema: Schema = new Schema(
  {
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    subCategory: {
      type: String,
      required: [true, 'Subcategory is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters'],
      maxlength: [70, 'Title must be less than 70 characters'],
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
      minlength: [10, 'Description must be at least 10 characters'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be a positive number'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
      match: [/^\d{10}$/, 'Please enter a valid 10-digit phone number'],
    },
    images: {
      type: [String],
      required: [true, 'At least one image is required'],
      validate: {
        validator: function(v: string[]) {
          return v && v.length > 0;
        },
        message: 'At least one image is required',
      },
    },
    user: {
      type: String,
      required: [true, 'Name is required'],
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

// Create and export the model
export default mongoose.model<IAdvertisement>('Advertisement', AdvertisementSchema);