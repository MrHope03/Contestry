/*
    Single User 
    => Find One User wrt username
    => Edit One User detail
*/

import connectMongo from "../../../db/connectMongo";
import User from "../../../db/models/user";

connectMongo();

export default async function (req, res) {
    const { method } = req;
    const { name } = req.query;
    console.log(name);
    switch (method) {
        case "GET":
            try {
                const user = await User.where("username")
                    .equals(name)
                    .populate("followers")
                    .populate("following");
                res.status(200).json({ success: true, data: user[0] });
            } catch (err) {
                res.status(400).json({ success: false });
            }
            break;
        case "PUT":
            try {
                let user = await User.findOneAndUpdate(
                    { username: name },
                    { $set: req.body }
                );
                res.status(200).json({ success: true, data: user });
            } catch (err) {
                console.log(err);
                res.status(400).json({ success: false });
            }
        default:
            res.status(400).json({ success: false });
    }
}
