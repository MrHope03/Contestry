import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        default: "Photographer#" + Math.random() * 100,
        unique: true,
        trime: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: String,
	contact: {
		type: String,
		maxLength: 10,
	},
	bio: {
		type: String,
		maxLength: 50,
	},
	followers: {
		type: [Schema.Types.ObjectId],
		ref: "User",
	},
	following: {
		type: [Schema.Types.ObjectId],
		ref: "User",
	},
	verified: Boolean,
});

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
