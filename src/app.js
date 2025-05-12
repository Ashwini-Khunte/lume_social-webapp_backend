import express from 'express';
import cors from "cors"

const app = express();

app.use(cors({
    origin: "*",
    credentials: true,
}))

app.use(express.json()); // <-- This is required to parse JSON request bodies

//route import
import userRouter from "./routes/user.route.js"

//route declaration
app.use("/api/v1/users", userRouter)

export {app};