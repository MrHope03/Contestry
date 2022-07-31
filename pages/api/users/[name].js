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
                const user = await User.findOne({ username: name });
                res.status(200).json({ success: true, data: user });
            } catch (err) {
                res.status(400).json({ success: false });
            }
            break;
        default:
            res.status(400).json({ success: false });
    }
}
