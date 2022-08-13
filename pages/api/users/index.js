/* 
    All Post Section 
    => Find a single Users
    => Insert User in the User collection
*/

import nextConnect from "next-connect";
import connectMongo from "../../../db/connectMongo";
import User from "../../../db/models/user";

connectMongo();

const apiRoute = nextConnect({
    onNoMatch(req, res) {
        res.status(405).json({
            success: false,
            error: `Method ${req.method} not allowed`,
        });
    },
});

apiRoute.post(async (req, res) => {
    try {
        console.log(req.body);
        const user = await User.create(req.body);
        res.status(200).json({ success: true, data: user });
    } catch {
        res.status(400).json({ success: false });
        console.log("Error");
    }
});

apiRoute.get(async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json({ success: true, data: users });
    } catch {
        res.status(400).json({ success: false });
    }
});

export default apiRoute;

// Mongoose File
// export default async function UsersServer (req, res) {
//     const { method } = req;
//     switch (method) {
//         case "GET":
//             try {
//                 const users = await User.find({});
//                 res.status(200).json({ success: true, data: users });
//             } catch {
//                 res.status(400).json({ success: false });
//             }
//             break;
//         case "POST":
//             try {
//                 console.log(req.body);
//                 const user = await User.create(req.body);
//                 res.status(200).json({ success: true, data: user });
//             } catch {
//                 res.status(400).json({ success: false });
//                 console.log("Error");
//             }
//             break;
//         default:
//             res.status(400).json({ success: false });
//     }
// }
