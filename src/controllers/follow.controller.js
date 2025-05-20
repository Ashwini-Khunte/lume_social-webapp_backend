import { Follow } from "../models/follow.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const follow = asyncHandler(async (req, res) => {

    const followerId = req.user.id;
    const followingId = req.params.id;

    if (!followerId || !followingId) {
        return res.status(400).json({
            message: "Missing follower or following ID"
        })
    }

    if (followerId === followingId) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    const existingFollow = await Follow.findOne({
        follower: followerId,
        following: followingId,
    });

    if (existingFollow) {
        await Follow.deleteOne({
            _id: existingFollow._id,
        });

        return res.status(200).json({
            message: "Unfollowed successfully"
        })
    }else {
        const newFollow = new Follow({
            follower: followerId,
            following: followingId,
        });

        await newFollow.save();

        return res.status(201).json({
            message: "Followes successfully"
        })
    }

})