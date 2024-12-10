import {SliderModel} from "../models/SliderModel.js";
import {BlogModel} from "../models/BlogModel.js";

export const CreateBlogSliderServices =async (req) => {
    try{
        let user_id = req.headers.user_id
        let reqBody = req.body
        reqBody.userID = user_id

        let data = await SliderModel.create(reqBody)
        return {
            status: "success",
            message: "Blog Slider created",
            data: data
        }
    }
    catch (err) {
        return{
            status: "failed",
            message: "some thing went wrong",
            error: err.toString()
        }
    }
}

export const SingleSliderListService =async (req) => {
    try {
        let id = req.params.id
        let data = await SliderModel.findOne({ _id: id })
        if(!data) {
            return {
                status: "failed",
                message: "Blog not found"
            }
        }
        return {
            status: "success",
            message: "single read blog service successfully",
            data : data
        }
    }
    catch (error) {
        return{
            status: "failed",
            message: "failed single read blog service",
            error: error.toString()
        }
    }
}

export const ReadBlogSliderServices =async (req) => {
    try{
        let data = await SliderModel.find()
        return {
            status: "success",
            message: "Blog Slider Read successfully",
            data: data
        }
    }
    catch (err) {
        return{
            status: "failed",
            message: "Blog Slider Read failed",
            error: err.toString()
        }
    }
}

export const RemoveBlogSliderServices =async (req) => {
    try{
        let user_id = req.headers.user_id
        let serviceID = req.params.id
    
        let data = await SliderModel.deleteOne({userID:user_id, _id:serviceID})
        return {
            status: "success",
            message: "Blog Slider Remove successfully",
            data: data
        }
    }
    catch (err) {
        return{
            status: "failed",
            message: "Blog Slider remove failed",
            error: err.toString()
        }
    }
}

export const UpdateBlogSliderServices =async (req) => {
    try{
        let user_id = req.headers.user_id
        let id = req.params.id
        let reqBody = req.body

        let data = await SliderModel.updateOne({userID:user_id, _id:id},{$set: reqBody})
        return {
            status: "success",
            message: "Blog Slider Read successfully",
            data: data
        }
    }
    catch (err) {
        return{
            status: "failed",
            message: "Blog Slider Read failed",
            error: err.toString()
        }
    }
}

export const UserFilterBySliderListService =async (req) => {
    try{
        let user_id = req.headers.user_id
        let data = await SliderModel.find({userID:user_id})
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