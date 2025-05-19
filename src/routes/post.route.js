import { Router } from "express";
import { createPost, deletePost, getAllPosts, getPost, toggleMoonPost, updatePost } from "../controllers/post.controller.js";
import { verifyToken } from "../middlewares/auth.midleware.js";

const postRouter = Router()

postRouter.post("/", verifyToken, createPost)

postRouter.get("/:id", getPost)

postRouter.put("/:id", verifyToken, updatePost)

postRouter.delete("/:id", verifyToken, deletePost)

postRouter.get("/", getAllPosts)

postRouter.post("/:id/moon", verifyToken, toggleMoonPost)

export default postRouter;