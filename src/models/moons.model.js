import { Schema, model } from "mongoose";

const moonsSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        requuired: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        requuired: true,
    },
}, {timestamps: true})

export const Moon = model("Moon", moonsSchema)