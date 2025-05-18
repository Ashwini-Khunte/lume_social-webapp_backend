import { Schema, model } from "mongoose";
import bcrypt from "bcrypt"

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
        default: "https://i.pinimg.com/736x/e9/03/a5/e903a53aa59ebfaec7f7daf4b37b8ffb.jpg"
    },
    coverImage: {
        type: String,
    },
    bio: {
        type: String,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    refreshToken: {
        type: String,
    },

}, {timestamps: true});

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

export const User = model("User", userSchema);