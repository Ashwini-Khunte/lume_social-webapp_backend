import express from 'express';
import cors from "cors"
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: true,
    credentials: true,
}))

app.use(cookieParser())

app.use(express.json()); // <-- This is required to parse JSON request bodies

//route import
import authRouter from './routes/auth.route.js';
import userRouter from "./routes/user.route.js"
import uploadRouter from './routes/upload.route.js';
import postRouter from './routes/post.route.js';
import commentRouter from './routes/comment.route.js';


//route declaration
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1", uploadRouter)
app.use("/api/v1/posts", postRouter)
app.use("/api/v1/comments", commentRouter)

export {app};