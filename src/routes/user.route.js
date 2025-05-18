import { Router } from "express";
import {deleteProfile, editProfile, getProfile} from "../controllers/user.controller.js"
import { verifyToken } from "../middlewares/auth.midleware.js";

const UserRouter = Router()

UserRouter.get("/me", verifyToken, getProfile);

UserRouter.put("/me", verifyToken, editProfile);

UserRouter.delete("/me", verifyToken, deleteProfile)

export default UserRouter;