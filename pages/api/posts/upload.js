import nextConnect from "next-connect";
import multer from "multer";
import mongoose from "mongoose";
import Post from "../../../db/models/posts"

const upload = multer({
    storage: multer.diskStorage({
        destination: "./public/media/uploads",
        filename: (req, file, cb) => cb(null, file.originalname),
    }),
});

const apiRoute = nextConnect({
    onNoMatch(req, res) {
        res.status(405).json({
            success: false,
            error: `Method ${req.method} not allowed`,
        });
    },
});

const uploadMiddleware = upload.array("imageFile");

apiRoute.use(uploadMiddleware);

apiRoute.post((req, res) => {
    try {
        const data = req.body;
        // delete data.imageFile;
        const post = Post.create(data);
        res.status(201).json({success: true, data: data});
    }
    catch (err){
        res.status(400).json({success: false});
    }
});

export default apiRoute;

export const config = {
    api: {
        bodyParser: false,
    },
};
