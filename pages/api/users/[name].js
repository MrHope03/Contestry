/*
    Single User 
    => Find One User wrt username
    => Edit One User detail
*/

import connectMongo from "../../../db/connectMongo";
import User from "../../../db/models/user";
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
        const { name } = req.query;
        const user = await User.where("username")
            .equals(name)
            .populate("followers")
            .populate("following");
        res.status(200).json({ success: true, data: user[0] });
    } catch (err) {
        res.status(400).json({ success: false });
    }
});

apiRoute.put(async (req, res) => {
    try {
        const { name } = req.query;
        let user = await User.findOneAndUpdate(
            { username: name },
            { $set: req.body }
        );
        res.status(200).json({ success: true, data: user });
    } catch (err) {
        console.log(err);
        res.status(400).json({ success: false });
    }
});

export default apiRoute;

// export default async function IndividualUserServer (req, res) {
//     const { method } = req;
//     const { name } = req.query;
//     console.log(name);
//     switch (method) {
//         case "GET":
//             try {
//                 const user = await User.where("username")
//                     .equals(name)
//                     .populate("followers")
//                     .populate("following");
//                 res.status(200).json({ success: true, data: user[0] });
//             } catch (err) {
//                 res.status(400).json({ success: false });
//             }
//             break;
//         case "PUT":
//             try {
//                 let user = await User.findOneAndUpdate(
//                     { username: name },
//                     { $set: req.body }
//                 );
//                 res.status(200).json({ success: true, data: user });
//             } catch (err) {
//                 console.log(err);
//                 res.status(400).json({ success: false });
//             }
//         default:
//             res.status(400).json({ success: false });
//     }
// }
