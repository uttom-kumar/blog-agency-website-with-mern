import {TeamModel} from "../models/TeamModel.js";


export const TeamListCreateService = async (req) => {
    try{
        let user_id = req.headers.user_id
        let reqBody = req.body
        reqBody.userID = user_id

        let data = await TeamModel.create(reqBody)

        return{
            status: "success",
            message: "Team list created successfully",
            data: data
        }
    }
    catch (err) {
        return {
            status: "success",
            message: "Team Creation Failed",
            error : err.toString()
        }
    }
}

export const TeamListReadService = async (req) => {
    try{
        let data = await TeamModel.find()
        return{
            status: "success",
            message: "Team List Read Successfully",
            data:data
        }
    }
    catch (err) {
        return {
            status: "success",
            message: "Team list Read Failed",
            error : err.toString()
        }
    }
}

export const TeamListRemoveService = async (req) => {
    try{
        let user_id = req.headers.user_id
        let teamID = req.params.id


        let data = await TeamModel.deleteOne({_id:teamID, userID:user_id})

        return{
            status: "success",
            message: "Team Removed Successfully",
            data:data
        }
    }
    catch (err) {
        return {
            status: "success",
            message: "Team List Remove Failed",
            error : err.toString()
        }
    }
}

export const TeamListUpdateService = async (req) => {
    try{
        let user_id = req.headers.user_id
        let teamID = req.params.teamID
        let reqBody = req.body


        let data = await TeamModel.updateOne({_id: teamID, userID: user_id}, {$set: reqBody})

        return{
            status: "success",
            message: "Team list Update successfully",
            data: data
        }
    }
    catch (err) {
        return {
            status: "success",
            message: "Team List update Failed",
            error : err.toString()
        }
    }
}

export const UserFilterByTeamListService = async (req) => {
    try{
        let user_id = req.headers.user_id
        let data = await TeamModel.find({userID:user_id})
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