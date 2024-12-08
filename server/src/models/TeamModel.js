import mongoose from "mongoose";

const DataSchema = mongoose.Schema({
    userID : {type: mongoose.Schema.Types.ObjectId, required: true},
    image : {type: String, required: true},
    name: {type: String, required: true},
    position: {type: String, required: true},
    bio: {type: String, required: true},
    description: {type: String, required: true},
},{timestamps: true, versionKey: false});

export const TeamModel = mongoose.model('teams', DataSchema)