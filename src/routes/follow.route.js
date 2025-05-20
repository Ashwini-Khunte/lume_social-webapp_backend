import { Router } from "express";
import { follow } from "../controllers/follow.controller.js";
import { verifyToken } from "../middlewares/auth.midleware.js";

const followRouter = Router();

followRouter.get("/:id",  verifyToken, follow)

export default followRouter