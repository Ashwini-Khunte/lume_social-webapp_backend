import { Router } from "express";
import { createComment } from "../controllers/comment.controller.js";
import { verifyToken } from "../middlewares/auth.midleware.js";

const commentRouter = Router();

commentRouter.post("/", verifyToken, createComment)

export default commentRouter;