import { Follow } from "../models/follow.model.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
            if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const posts = await Post.find({createdBy: user}).sort({createdAt: -1});

        const userId = req.params.id || req.user.id

        if(!userId) {
            return res.status(400).json({
                message: "User ID is required"
            })
        }

        const followers = await Follow.find({following: userId}).populate("follower", "userName avatar");

        const following = await Follow.find({follower: userId}).populate("following", "userName avatar")

        res.status(200).json({
            message: "Profile fetched successfully",
            user,
            posts,
            totalPosts: posts.length,
            followers: followers.map(f => f.follower) ,
            following: following.map(f => f.following) ,
        });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
};

export const editProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id

    const {name, userName, email, password, avatar, }  = req.body

    const user = await User.findById(userId)
    if(!user) {
        return res.status(404).json({
            message: "User not Found"
        })
    }

    //Update fields if present
    if(name) user.name = name;
    if(userName) user.name = userName;
    if(email) user.name = email;
    if(avatar) user.name = avatar;
    if(password) user.name = password;

    await user.save();

    res.status(200).json({
        message: "Profile updated successfully"
    })

})

export const deleteProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const user = await User.findByIdAndDelete(userId);

    if(!user) {
        return res.status(404).json({message: "user not found"})
    }

    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });

    res.status(200).json({
        message: "Account deleted successfully"
    })
})