import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        trim: true,
    },
    userName: {
        type: String,
        required: [true, "username is required"],
        trim: true,
        unique: true,
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
        trim: true,
    },
    avatar: {
        type: String,
    },
    coverImage: {
        type: String,
    },
    bio: {
        type: String,
    },
    refreshToken: {
        type: String,
    },

}, {timestamps: true});

const User = model("User", userSchema);