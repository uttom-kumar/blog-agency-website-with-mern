import mongoose from "mongoose";

const DataSchema = mongoose.Schema({
    userID : {type: mongoose.Schema.Types.ObjectId, required: true},
    image : {type: String, required: true},
    heading: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
},{timestamps: true, versionKey: false});

export const SliderModel = mongoose.model('blogsliders', DataSchema)