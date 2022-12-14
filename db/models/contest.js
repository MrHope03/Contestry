import mongoose from "mongoose";
import { Schema } from "mongoose";

const contestSchema = new Schema({
    contestName: String,
    category: String,
    creator: String,
    about: String,
    price: String,
    judges: {
        type: [Schema.Types.ObjectId],
        ref: "User",
    },
    image: {
        type: String,
        default: "/media/Contest.jpg",
    },
    startDate: {
        type: Date,
        default: Date.now,
    },
    endDate: Date,
    maxEntry: Number,
    posts: {
        type: [Schema.Types.ObjectId],
        ref: "Post",
    },
    usersSubmitted: {
        type: [Schema.Types.ObjectId],
        ref: "User",
    },
});

module.exports =
    mongoose.models.Contest || mongoose.model("Contest", contestSchema);
