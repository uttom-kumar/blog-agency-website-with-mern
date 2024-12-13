import mongoose from "mongoose";

const DataSchema = mongoose.Schema({
    fullName: {type: String, required: true},
    email: {type: String, required: true},
    subject: {type: String, required: true},
    msg: {type: String, required: true}
},{timestamps: true, versionKey: false});

export const ContactModel = mongoose.model('contacts', DataSchema)