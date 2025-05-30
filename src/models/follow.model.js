import { Schema, model } from "mongoose";

const followSchema = new Schema({
    follower: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    following: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    
}, {timestamps: true})

export const Follow = model("Follow", followSchema)