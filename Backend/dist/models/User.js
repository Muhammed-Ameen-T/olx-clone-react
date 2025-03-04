"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the schema with IUser
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
}, { timestamps: true });
// Explicitly type the model and export it
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
