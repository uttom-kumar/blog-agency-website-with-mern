import {ContactModel} from "../models/contactModel.js";

export const CreateContactService = async (req) => {
    try{
        let reqBody = req.body

        await ContactModel.create(reqBody)

        return {
            status: "success",
            message: "Contact Service Created",
        }
    }
    catch(err){
        return{
            status: "failed",
            message: "Create contact failed"
        }
    }
}

export const ReadContactService = async (req) => {
    try{
        let data = await ContactModel.find()
        return {
            status: "success",
            message: "Read contact successfully",
            data: data
        }
    }
    catch(err){
        return{
            status: "failed",
            message: "Read contact failed",
            error: err.toString()
        }
    }
}