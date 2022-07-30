import connectMongo from "../../../db/connectMongo";
import User from "../../../db/models/user"

connectMongo();

export default function handler(req, res) {
    // res.status(200).json({ name: "John Doe" });
	const {method} = req;
	switch (method){
		case 'GET':
			try {
				const user = await User.findOne();
				res.status(200).json({success: true, data: users})
			}
	}
}
