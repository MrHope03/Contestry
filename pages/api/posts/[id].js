/*
	Individual Post page
*/

import nextConnect from "next-connect";
import connectMongo from "../../../db/connectMongo";
import Post from "../../../db/models/posts";

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
        const { id } = req.query;
        const posts = await Post.find({ username: id });
        res.status(200).json({ success: true, data: posts });
    } catch (err) {
        res.status(400).json({ success: false });
    }
});

apiRoute.post(async (req, res) => {
    try {
        const { id } = req.query;
        const post = await Post.create(req.body);
        res.status(201).json({ success: true, data: post });
    } catch (err) {
        res.status(400).json({ success: false });
    }
});

export default apiRoute;

// export default async function IndividualPostPageServer  (req, res) {
// 	const {method} = req;
// 	const {id} = req.query;
// 	switch (method){
// 		case 'GET':
// 			try {
// 				const posts = await Post.find({username: id});
// 				res.status(200).json({success: true, data: posts})
// 			}catch (err){
// 				res.status(400).json({success: false});
// 			}
// 			break;
// 		case 'POST':
// 			try {
// 				const post = await Post.create(req.body);
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
