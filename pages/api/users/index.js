import connectMongo from "../../../db/connectMongo"
import User from "../../../db/models/user"

connectMongo();

export default async function (req, res) {
    // res.status(200).json({ name: "John Doe" });
	const {method} = req;
	switch (method){
		case 'GET':
			try {
				const users = await User.find({});
				res.status(200).json({success: true, data: users})
			}
			catch {
				res.status(400).json({success: false});
			}
			break;
		case 'POST':
			try {
				const user = await User.create(req.body);
				res.status(200).json({success: true, data: user});
			}
			catch {
				res.status(400).json({success: false});
			}
			break;
		default:
			res.status(400).json({success: false});
	}
}
