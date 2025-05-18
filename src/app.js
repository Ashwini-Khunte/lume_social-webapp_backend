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


//route declaration
app.use("/api/v1/auth", authRouter)
app.use("/api/v1/users", userRouter)

export {app};