import { signupSchema, loginSchema } from "../models/authSchema.js";

import { generateTokens, verifyRefreshToken } from "../utils/tokenUtils.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
    
    const parsed = signupSchema.safeParse(req.body)

    if (!parsed.success) {
        const errors = parsed.error.errors.map(err => err.message)
        return res.status(400).json({message: errors.join(",")})
    }

    const {name, userName, email, password} = parsed.data;

    const userExits = await User.findOne({
        $or: [{ userName }, { email }]
    })

    if(userExits) {
        return res.status(400).json({message: "user already exists"});
    }

    const user = await User.create({name, userName, email, password});

    const {accessToken, refreshToken} = generateTokens({id: user._id})

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false, // set true in production with
        sameSite: "lax",
        maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.status(200).json({
        message: `User ${userName} register successfully!`,
        tokens: {accessToken, refreshToken},
        user: {
            id: user._id,
            userName: user.userName,
            email: user.email,
        }
    })
})

export const loginUser = asyncHandler(async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);

    if (!parsed.success) {
        return res.status(400).json({
            error: parsed.error.errors[0].message
        })
    }

    const {email, password} = parsed.data;

    const user = await User.findOne({email})

    if (!user) {
        return res.status(404).json({error: "User not found"})
    }

    const isMatch = await user.isPasswordCorrect(password);

    if (!isMatch) {
        return res.status(401).json({message: "Invalid Password"})
    }

    const {accessToken, refreshToken} = generateTokens({id: user._id});

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: false, // set true in production with
        sameSite: "lax",
        maxAge: 60 * 60 * 1000, // 1 hour
    })
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false, // set true in production with
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 30 // 30 days
    });

    res.status(200).json({
        message: "login sucessful!",
        tokens: {accessToken, refreshToken},
        user: {
            id: user._id,
            userName: user.userName,
            email: user.email,
        }
    })
})

export const logoutUser = asyncHandler(async(req, res) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false, // set to true in production
        sameSite: "lax",
    });

    res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
    });


    res.status(200).json({
        message: "Logged out successfully"
    });
})

export const refreshTokenController = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        return res.status(400).json({ error: "No refresh token provided" });
    }

    try {
        // Assuming verifyRefreshToken is synchronous; remove await if not needed
        const decoded = verifyRefreshToken(refreshToken);
        
        if (!decoded.id) {
            return res.status(403).json({ error: "Invalid token payload" });
        }

        const { accessToken, refreshToken: newRefreshToken } = generateTokens({ id: decoded.id });

        const isSecure = process.env.NODE_ENV === "production";
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: isSecure,
            sameSite: "lax",
            maxAge: 60 * 60 * 1000,
        });
        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            secure: isSecure,
            sameSite: "lax",
            maxAge: 1000 * 60 * 60 * 24 * 30,
        });

        return res.status(200).json({ message: "New access token generated" });
    } catch (error) {
        console.error("Refresh token error:", error.message);
        return res.status(403).json({ error: "Invalid or expired refresh token" });
    }
};