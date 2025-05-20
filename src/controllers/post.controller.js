import { Comment } from "../models/comments.model.js";
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

    const userId = req.user?.id;
    const post = await Post.findById(req.params.id).populate("moons", "name avatar")

    if(!post) {
        return res.status(404).json({
            message: "Post not found"
        })
    }


    const comments = await Comment.find({
        postId: post._id
    })
    .sort({createdAt: -1})
    .populate("userId", "name avatars")

    const commentsCount = await Comment.countDocuments({
        postId: post._id
    })

    const moonedByMe = userId ? post.moons.some((id) => id._id.toString() === userId) : false

    res.status(200).json({
        post,
        moonedByMe,
        moonsCount: post.moons.length,
        comments,
        commentsCount,
    })
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
        message: "Post updated successfully",
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

export const getAllPosts = asyncHandler(async (req, res) => {
    const userId = req.user?.id;

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page -1 ) * limit;

    //Fetch total count for frontend pegination
    const total = await Post.countDocuments();

    //fetch posts, srted by latest first, skip + limit for pagination
    const posts = await Post.find({})
        .sort({createdAt: -1})
        .skip(skip)
        .limit(limit)
        .populate("createdBy", "name avatar")
        .populate("moons", "_id");

        const postWithCounts = await Promise.all(
            posts.map(async (post) => {
                const commentsCount = await Comment.countDocuments({postId: post._id})

                const moonedByMe = userId
                    ? post.moons.some((id) => id._id.toString() === userId)
                    : false

                    return {
                        ...post.toObject(),
                        moonsCount: post.moons.length,
                        moonedByMe,
                        commentsCount,
                    };
            })
        )

        // const formattedPosts = posts.map((post) => {
        //     const moonedByMe = userId
        //         ? post.moons.some((id) => id._id.toString() === userId)
        //         : false;

        res.status(200).json({
            total,
            page,
            limit,
            posts: postWithCounts,
        })

})

export const toggleMoonPost = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const postId = req.params.id;

    const post = await Post.findById(postId)

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const alreadyMooned = post.moons.some((id) => id.toString() === userId);

    if (alreadyMooned) {
        //unlike
        post.moons = post.moons.filter((id) => id.toString() !== userId)
    } else {
        //like
        post.moons.push(userId)
    }

    await post.save();

    const updatedPost = await Post.findById(postId).populate("moons", "name avatar")

    res.status(200).json({
        message: alreadyMooned ? "Post unMoon" : "post mooned",
        moonsCount: updatedPost.moons.length,
        moons: updatedPost.moons,
        moonedByMe: !alreadyMooned,
    });
})