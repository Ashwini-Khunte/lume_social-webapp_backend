import {Post} from "../models/post.model.js"
import { asyncHandler } from "../utils/asyncHandler.js"

export const createPost = asyncHandler(async(req, res) => {
    const { title, image, description } = req.body;

    const user = req.user?.id

    if (!user) {
        return res.status(401).json({
            error: "User not authenticated",
        });
    }

    if (!title || !image || !description) {
        return res.status(400).json({
            error: "All fields are required"
        })
    }

    const newPost = await Post.create({
        title, 
        image,  // Cloudinary URL इथे save होईल
        description,
        createdBy: user,
    });

    const populatedPost = await Post.findById(newPost._id).populate("createdBy")

    res.status(201).json({
        message: `Post ${title} created successfully!`,
        post: populatedPost,
    })
})

export const getPost = asyncHandler(async (req, res) => {

    const post = await Post.findById(req.params.id);

    if(!post) {
        return res.status(404).json({
            message: "Post not found"
        })
    }

    res.json(post);
})

export const updatePost = asyncHandler(async (req, res) => {
    const { title, image, description } = req.body;
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId)

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    if (post.createdBy.toString() !== userId) {
        return res.status(403).json({ message: "You are not allowed to edit this post" });
    }

    //Update fields

    post.title =  title || post.title,
    post.image =  image || post.image,
    post.description =  description || post.description;

    const updatedPost = await post.save();

    res.status(200).json({
        message: "Post updated successfull",
        post: updatedPost,
    })

})

export const deletePost = asyncHandler(async (req, res) => {
    const postId = req.params.id;
    const userId = req.user.id;

    const post = await Post.findById(postId)

    if (!post) {
        return res.status(404).json({ message: "Post not found" });
    }

    if(post.createdBy.toString() !== userId) {
        return res.status(403).json({ message: "You are not allowed to delete this post" });
    }

    await Post.findByIdAndDelete(postId);

    res.status(200).json({ message: "Post deleted successfully" });
})