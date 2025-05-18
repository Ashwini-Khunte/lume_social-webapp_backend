import { Router } from "express";
import { registerUser,loginUser, refreshTokenController, logoutUser } from "../controllers/auth.controller.js";

const authRouter = Router()

authRouter.post("/signup", registerUser)

authRouter.post("/login", loginUser)

authRouter.post('/logout', logoutUser);

authRouter.post("/refresh-token", refreshTokenController)

export default authRouter;