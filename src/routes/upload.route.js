import express from "express"
import multer from "multer"
import { uploadImage } from "../controllers/upload.controller.js"

const uploadRouter = express.Router();
const upload = multer ({dest: 'uploads/'}); // temporary storage

uploadRouter.post("/upload", upload.single("image"), uploadImage)

export default uploadRouter
