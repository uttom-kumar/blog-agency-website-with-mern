import mongoose from "mongoose";

const DataSchema = mongoose.Schema({
    userID : {type: mongoose.Schema.Types.ObjectId, required: true},
    image : {type: String, required: true},
    title: {type: String, required: true},
    des: {type: String, required: true},
},{timestamps: true, versionKey: false});

export const ServiceModel = mongoose.model('services', DataSchema)