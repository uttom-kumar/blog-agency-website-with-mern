import {ServiceModel} from "../models/ServiceModel.js";


export const CreateService = async (req) => {
    try{
        let user_id = req.headers.user_id
        let reqBody = req.body
        reqBody.userID = user_id

        let data = await ServiceModel.create(reqBody)

        return {
            status : "success",
            message: "Service created",
            data : data
        }
    }
    catch (err){
        return{
            status: "failed",
            message: "service creation failed",
        }
    }
}

export const ReadService = async (req) => {
    try{
        let data = await ServiceModel.find()

        return {
            status : "success",
            message: "Service read successfully",
            data : data
        }
    }
    catch (err){
        return{
            status: "failed",
            message: "service read failed",
        }
    }
}

export const RemoveService = async (req) => {
    try{
        let user_id = req.headers.user_id
        let serviceID = req.params.id


        let data = await ServiceModel.deleteOne({_id: serviceID, userID:user_id})

        return {
            status : "success",
            message: "Service Removed successfully",
            data : data
        }
    }
    catch (err){
        return{
            status: "failed",
            message: "service remove failed",
        }
    }
}

export const UpdateService = async (req) => {
    try{
        let user_id = req.headers.user_id
        let serviceID = req.params.serviceID
        let reqBody = req.body

        let data = await ServiceModel.updateOne({userID: user_id, _id:serviceID},{$set: reqBody})

        return {
            status : "success",
            message: "Service Removed successfully",
            data : data
        }
    }
    catch (err){
        return{
            status: "failed",
            message: "service remove failed",
        }
    }
}

export const UserFilterByServiceListService = async (req) => {
    try{
        let user_id = req.headers.user_id
        let data = await ServiceModel.find({userID:user_id})
        return {
            status : "success",
            data : data
        }
    }
    catch (err) {
        return{
            status: "failed",
            message: "User Filter Failed",
            error : err.toString()
        }
    }
}