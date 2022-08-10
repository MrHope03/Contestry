/*
	Individual Contest page
*/

import connectMongo from "../../../db/connectMongo";
import Post from "../../../db/models/contest"

connectMongo();

export default async function  (req, res) {
	const {method} = req;
	const {id} = req.query;
	switch (method){
		case 'GET':
			try {
				const posts = await Post.find({});
				res.status(200).json({success: true, data: posts})
			}catch (err){
				res.status(400).json({success: false});
			}
			break;		
		case 'POST':
			try {
				const post = await Post.create(req.body);
				res.status(201).json({success: true, data: post});
			}
			catch (err){
				res.status(400).json({success: false});
			}
			break;
		default:
			res.status(400).json({success: false});
	}
}
