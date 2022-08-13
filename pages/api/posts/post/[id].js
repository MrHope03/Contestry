/*
	Individual Post page
*/

import connectMongo from "../../../../db/connectMongo";
import Post from "../../../../db/models/posts";
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
		const { id } = req.query;
        const posts = await Post.findOne({ _id: Object(id) });
        res.status(200).json({ success: true, data: posts });
    } catch (err) {
        res.status(400).json({ success: false });
    }
});

apiRoute.post(async (req, res) => {
    try {
		const { id } = req.query;
        const post = await Post.findOneAndUpdate(
            { _id: Object(id) },
            { $set: req.body }
        );
        res.status(201).json({ success: true, data: post });
    } catch (err) {
        res.status(400).json({ success: false, data: id });
    }
});

apiRoute.delete(async (req,res) => {
    try {
        const {id} = req.query;
        const post = await Post.deleteOne({ _id: Object(id) });
        res.status(200).json({ success: true, data: post });
    } catch (err) {
        res.status(400).json({ success: false, data: id });
    }
})

export default apiRoute;


// export default async function IndividualPostServer (req, res) {
//     const { method } = req;
//     const { id } = req.query;
//     switch (method) {
//         case "GET":
//             try {
//                 const posts = await Post.findOne({ _id: Object(id) });
//                 res.status(200).json({ success: true, data: posts });
//             } catch (err) {
//                 res.status(400).json({ success: false });
//             }
//             break;
//         case "POST":
//             try {
//                 const post = await Post.findOneAndUpdate(
//                     { _id: Object(id) },
//                     { $set: req.body }
//                 );
//                 res.status(201).json({ success: true, data: post });
//             } catch (err) {
//                 res.status(400).json({ success: false, data: id });
//             }
//             break;
//         case "DELETE":
//             try {
//                 const post = await Post.deleteOne({ _id: Object(id) });
//                 res.status(200).json({ success: true, data: post });
//             } catch (err) {
//                 res.status(400).json({ success: false, data: id });
//             }
//             break;
//         default:
//             res.status(400).json({ success: false });
//     }
// }
