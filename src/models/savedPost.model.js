import { Schema, model } from "mongoose";

const savedPostSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
    
}, {timestamps: true})

export const SavedPost = model("SavedPost", savedPostSchema)