import { signupSchema } from "../models/signupSchema.js";
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

    res.status(200).json({
        message: `User ${userName} register successfully!`,
        user: {
            id: user._id,
            userName: user.userName,
            email: user.email,
        }
    })
})