/*
	Individual Contest page
*/

import nextConnect from "next-connect";
import connectMongo from "../../../db/connectMongo";
import Contest from "../../../db/models/contest"

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
		const contests = await Contest.find({});
		res.status(200).json({success: true, data: contests})
	}catch (err){
		res.status(400).json({success: false});
	}
});

apiRoute.post(async (req, res) => {
    try {
		const contest = await Contest.create(req.body);
		res.status(201).json({success: true, data: contest});
	}
	catch (err){
		res.status(400).json({success: false});
	}
});

export default apiRoute;

// export default async function ContestServer (req, res) {
// 	const {method} = req;
// 	const {id} = req.query;
// 	switch (method){
// 		case 'GET':
// 			try {
// 				const contests = await Contest.find({});
// 				res.status(200).json({success: true, data: contests})
// 			}catch (err){
// 				res.status(400).json({success: false});
// 			}
// 			break;		
// 		case 'POST':
// 			try {
// 				const contest = await Contest.create(req.body);
// 				res.status(201).json({success: true, data: contest});
// 			}
// 			catch (err){
// 				res.status(400).json({success: false});
// 			}
// 			break;
// 		default:
// 			res.status(400).json({success: false});
// 	}
// }
