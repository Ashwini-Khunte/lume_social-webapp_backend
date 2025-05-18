import { Router } from "express";
import { createPost, deletePost, getPost, updatePost } from "../controllers/post.controller.js";
import { verifyToken } from "../middlewares/auth.midleware.js";

const postRouter = Router()

postRouter.post("/", verifyToken, createPost)

postRouter.get("/:id", getPost)

postRouter.put("/:id", verifyToken, updatePost)

postRouter.delete("/:id", verifyToken, deletePost)

export default postRouter;