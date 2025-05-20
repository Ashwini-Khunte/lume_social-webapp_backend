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

export const updateComment = asyncHandler(async (req, res) => {
    const {title} = req.body;
    const user = req.user.id;
    const commentId = req.params.id;

    const comment = await Comment.findById(commentId)

    if (!comment) {
        return res.status(404).json({
            message: "Comment not Found"
        })
    }

    if (comment.userId.toString() !== user) {
        return res.status(403).json({
            message: "You are not allowed to edit this comment"
        })
    }

    comment.title = title || comment.title

    const updatedComment = await comment.save();

    res.status(200).json({
        message: "Post updated successfully",
        comment: updatedComment,
    })
})

export const deleteComment = asyncHandler(async (req, res) => {
    const commentId = req.params.id;
    const userId = req.user.id;

    const comment = await Comment.findById(commentId)

    if (!comment) {
        return res.status(404).json({
            message: "Comment not found"
        })
    }

    if (comment.userId.toString() !== userId) {
        return res.status(402).json({
            message: "You are not allowed to delete this comment"
        })
    }

    await Comment.findOneAndDelete(commentId);

    res.status(200).json({
        message: "Comment deleted successfully"
    })
})