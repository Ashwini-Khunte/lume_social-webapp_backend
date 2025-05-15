import express from 'express';
import cors from "cors"

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}))

app.use(cookieParser())

app.use(express.json()); // <-- This is required to parse JSON request bodies

//route import
import userRouter from "./routes/user.route.js"
import cookieParser from 'cookie-parser';

//route declaration
app.use("/api/v1/users", userRouter)

export {app};