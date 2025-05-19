import {Comment} from "../models/comments.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const createComment = asyncHandler(async (req, res) => {
    const {title, postId} = req.body;

    const user = req.user?.id

    if(!user) {
        return res.status(401).json({
            error: "User not authenticated"
        })
    }

    if (!title || !postId) {
        return res.status(400).json({
            error: "All fields are required"
        })
    }

    const newComment = await Comment.create({
        title,
        postId,
        userId: user,
    })

    res.status(201).json({
        message: `Comment is created successFully`,
        comment: newComment,
    })

})