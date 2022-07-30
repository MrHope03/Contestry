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
	}
})

module.exports = mongoose.models.User || mongoose.model("User",userSchema);
