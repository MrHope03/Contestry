import mongoose from "mongoose";
import { Schema } from "mongoose";

const postSchema = new Schema({
    username: String,
    caption: {
        type: String,
        maxLength: [50, "Character Limit Exceeded"],
    },
    image: {
        type: String,
        default: "/media/Deer.jpg",
    },
    likes: Number,
    comments: {
        type: [String],
        maxLength: [20, "Character Limit Exceeded"],
    },
    uploadDate: {
        type: Date,
        default: Date.now,
        immutable: true,
    },
});

module.exports = mongoose.models.Post || mongoose.model("Post", postSchema);
