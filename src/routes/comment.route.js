import { Router } from "express";
import { createComment, deleteComment, updateComment } from "../controllers/comment.controller.js";
import { verifyToken } from "../middlewares/auth.midleware.js";

const commentRouter = Router();

commentRouter.post("/", verifyToken, createComment)

commentRouter.put("/:id", verifyToken, updateComment)

commentRouter.delete("/:id", verifyToken, deleteComment)

export default commentRouter;