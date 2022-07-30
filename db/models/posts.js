import mongoose from "mongoose";
import { Schema } from "mongoose";

const postSchema = new Schema({
    username: String,
    caption: {
        type: String,
        maxLength: [150, "Character Limit Exceeded"],
    },
    image: {
        type: String,
        default: "/Deer.jpg",
    },
    likes: Number,
    comments: {
        type: String,
        maxLength: [50, "Character Limit Exceeded"],
    },
});

module.exports =  mongoose.models.Post ||  mongoose.model("Post", postSchema);
