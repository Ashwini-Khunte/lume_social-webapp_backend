import cloudinary from "../utils/cloudinary.js";
import fs from "fs"

export const uploadImage = async(req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: 'lume-posts'
        });

        fs.unlinkSync(req.file.path) // remove the temp file

        res.status(200).json({
            url: result.secure_url
        })

    } catch (error) {
        res.status(500).json({
            error: "Image upload failed"
        })
    }
}