import { Router } from "express";
import { registerUser,loginUser, refreshTokenController } from "../controllers/auth.controller.js";
import {getProfile} from "../controllers/user.controller.js"
import { verifyToken } from "../middlewares/auth.midleware.js";

const router = Router()

router.route("/signup").post(registerUser)

router.route("/login").post(loginUser)

router.route("/refresh-token").post(refreshTokenController)

router.route("/me").get(verifyToken, getProfile);

export default router;