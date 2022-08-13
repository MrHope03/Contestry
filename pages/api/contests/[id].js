/*
	Individual Contest page
*/

import connectMongo from "../../../db/connectMongo";
import Contest from "../../../db/models/contest";

connectMongo();

export default async function (req, res) {
    const { method } = req;
    const { id } = req.query;
    switch (method) {
        case "GET":
            try {
                const contest = await Contest.where("_id")
                    .equals(Object(id))
                    .populate("posts");
                res.status(200).json({ success: true, data: contest[0] });
            } catch (err) {
                res.status(400).json({ success: false });
            }
            break;
        case "POST":
            try {
                const contest = await Contest.findOneAndUpdate(
                    { _id: Object(id) },
                    req.body
                );
                res.status(201).json({ success: true, data: contest });
            } catch (err) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
    }
}
