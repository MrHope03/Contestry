import connectMongo from "../../../db/connectMongo";
import Post from "../../../db/models/posts";
import mongoose from "mongoose";
import nextConnect from "next-connect";
connectMongo();

const apiRoute = nextConnect({
    onNoMatch(req, res) {
        res.status(405).json({
            success: false,
            error: `Method ${req.method} not allowed`,
        });
    },
});

apiRoute.get(async (req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts });
    } catch (err) {
        res.status(400).json({ success: false });
    }
});

apiRoute.post(async (req, res) => {
    try {
        const post = await Post.findOneAndUpdate(
            { _id: req.body._id },
            { $set: req.body }
        );
        res.status(201).json({ success: true, data: post });
    } catch (err) {
        res.status(400).json({ success: false });
    }
});

export default apiRoute;

// export default async function PostsServer (req, res) {
// 	const {method} = req;
// 	switch (method){
// 		case 'GET':
// 			try {
// 				const posts = await Post.find({});
// 				res.status(200).json({success: true, data: posts})
// 			}catch (err){
// 				res.status(400).json({success: false});
// 			}
// 			break;
// 		case 'POST':
// 			try {
// 				const post = await Post.findOneAndUpdate({ _id: req.body._id },
//                     { $set: req.body });
// 				res.status(201).json({success: true, data: post});
// 			}
// 			catch (err){
// 				res.status(400).json({success: false});
// 			}
// 			break;
// 		default:
// 			res.status(400).json({success: false});
// 	}
// }
