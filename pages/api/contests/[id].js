/*
	Individual Contest page
*/

import nextConnect from "next-connect";
import connectMongo from "../../../db/connectMongo";
import Contest from "../../../db/models/contest";

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
        const contest = await Contest.where("_id")
            .equals(Object(id))
            .populate("posts");
        res.status(200).json({ success: true, data: contest[0] });
    } catch (err) {
        res.status(400).json({ success: false });
    }
});

apiRoute.post(async (req, res) => {
    try {
        const { id } = req.query;
        const contest = await Contest.findOneAndUpdate(
            { _id: Object(id) },
            req.body
        );
        res.status(201).json({ success: true, data: contest });
    } catch (err) {
        res.status(400).json({ success: false });
    }
});

export default apiRoute;

// export default async function IndividualContestServer(req, res) {
//     const { method } = req;
//     const { id } = req.query;
//     switch (method) {
//         case "GET":
//             try {
//                 const contest = await Contest.where("_id")
//                     .equals(Object(id))
//                     .populate("posts");
//                 res.status(200).json({ success: true, data: contest[0] });
//             } catch (err) {
//                 res.status(400).json({ success: false });
//             }
//             break;
//         case "POST":
//             try {
//                 const contest = await Contest.findOneAndUpdate(
//                     { _id: Object(id) },
//                     req.body
//                 );
//                 res.status(201).json({ success: true, data: contest });
//             } catch (err) {
//                 res.status(400).json({ success: false });
//             }
//             break;
//         default:
//             res.status(400).json({ success: false });
//     }
// }
