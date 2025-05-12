import { Schema, model } from "mongoose";

const commentSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: "Post",
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    title: {
        type: String,
        required: true,
    },
    
}, {timestamps: true})

export const Comment = model("Comment", commentSchema)