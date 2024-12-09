import mongoose from "mongoose";
const ObjectID = mongoose.Types.ObjectId;

import {BlogModel} from "../models/BlogModel.js";




export const CreateBlogService = async (req) => {
    try{
        let user_id = req.headers.user_id
        let reqBody = req.body
        reqBody.userID = user_id

        let data = await BlogModel.create(reqBody)

        return {
            status: "success",
            message : "Blog Create Successfully",
            data : data
        }
    }
    catch (e) {
        return{
            status : "failed",
            message : "Blog Create failed"
        }
    }
}

export const ReadBlogService = async (req) => {
    try{
        let joinWithUserStage = {
            $lookup:{
                from: "users",
                localField: "userID",
                foreignField: "_id",
                as : "user"
            }
        }
        let unwindUserStage = {$unwind : "$user"}
        let UserProjectionStage = {
            $project:{
                "_id":1,
                "title":1,
                "userID":1,
                "des":1,
                "img": 1,
                "user.fullName" : 1,
                "user._id":1,
                "createdAt": 1
            }
        }
        let data = await BlogModel.aggregate([
            joinWithUserStage,
            unwindUserStage,
            UserProjectionStage
        ])
        return {
            status: "success",
            message: "Blog list read Successfully",
            data: data
        }
    }
    catch (e){
        return{
            status: "failed",
            message: "Blog Read Failed",
            error : e.toString()
        }
    }
}

export const BlogRemoveService = async (req) => {
    try{
        let user_id = req.headers.user_id
        let blogID = req.params.blogID

        let data= await BlogModel.deleteOne({_id: blogID, userID:user_id})

        return {
            status: "success",
            message: "Blog list read Successfully",
            data : data
        }
    }
    catch (e){
        return{
            status: "failed",
            message: "Blog remove Failed",
            error : e.toString()
        }
    }
}

export const BlogUpdateService = async (req) => {
    try{
        let user_id = req.headers.user_id
        let blogID = req.params.blogID
        let reqBody = req.body

        let data = await BlogModel.updateOne(
            {"_id": blogID},
            {$set: reqBody}
        )

        return {
            status: "success",
            message: "Blog List update Successfully",
            data : data
        }
    }
    catch (e){
        return{
            status: "failed",
            message: "Blog remove Failed",
            error : e.toString()
        }
    }
}

export const BlogDetailService = async (req) => {
    try{
        let blogID = new ObjectID(req.params.blogID)
        let matchStage = {
            $match: {_id: blogID}
        }
        let joinWithUserStage = {
            $lookup:{
                from: "users",
                localField: "userID",
                foreignField: "_id",
                as : "user"
            }
        }
        let unwindUserStage = {$unwind : "$user"}
        let UserProjectionStage = {
            $project:{
                "_id" :1,
                "title":1,
                "des":1,
                "img": 1,
                "user.fullName" : 1,
                "createdAt": 1
            }
        }
        let data = await BlogModel.aggregate([
            matchStage,
            joinWithUserStage,
            unwindUserStage,
            UserProjectionStage
        ])
        return {
            status: "success",
            message : "Blog Detail Successfully",
            data : data
        }
    }
    catch (err){
        return{
            status: "failed",
            message: "Blog Detail Failed",
            error: err.toString()
        }
    }
}


export const UserFilterByBlogListService = async (req) => {
    try{
        let user_id = req.headers.user_id
        let data = await BlogModel.find({userID:user_id})
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
