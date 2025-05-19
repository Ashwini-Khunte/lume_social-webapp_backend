import { Schema, model } from "mongoose";

const postSchema = new Schema({
    title: {
        type: String,
        required: [true, "title is required"],
    },
    description: {
        type: String,
    },
    tags: {
        type: String,
    },
    views: {
        type: Number,
        default: 0,
    },
    image: {
        type: String,
        required: [true, "image is required"],
    },
    isPublished: {
        type: Boolean,
        default: false,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    moons: [
        {
            type: Schema.Types.ObjectId,
            ref: "User",
        }
    ]
    
}, {timestamps: true})

export const Post = model("Post", postSchema)