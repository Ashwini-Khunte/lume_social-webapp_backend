import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
            if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Profile fetched successfully",
            user,
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