/*
	Individual Contest page
*/

import connectMongo from "../../../db/connectMongo";
import Contest from "../../../db/models/contest"

connectMongo();

export default async function  (req, res) {
	const {method} = req;
	const {id} = req.query;
	switch (method){
		case 'GET':
			try {
				const contests = await Contest.find({});
				res.status(200).json({success: true, data: contests})
			}catch (err){
				res.status(400).json({success: false});
			}
			break;		
		case 'POST':
			try {
				const contest = await Contest.create(req.body);
				res.status(201).json({success: true, data: contest});
			}
			catch (err){
				res.status(400).json({success: false});
			}
			break;
		default:
			res.status(400).json({success: false});
	}
}
