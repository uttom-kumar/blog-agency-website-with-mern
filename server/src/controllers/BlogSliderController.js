import {
    CreateBlogSliderServices,
    ReadBlogSliderServices,
    RemoveBlogSliderServices, UpdateBlogSliderServices, UserFilterBySliderListService
} from "../services/BlogSliderService.js";


export const CreateBlogSlider = async (req, res) => {
    let result = await CreateBlogSliderServices(req)
    return res.json(result)
}

export const ReadBlogSlider = async (req, res) => {
    let result = await ReadBlogSliderServices(req)
    return res.json(result)
}

export const RemoveBlogSlider = async (req, res) => {
    let result = await RemoveBlogSliderServices(req)
    return res.json(result)
}

export const UpdateBlogSlider = async (req, res) => {
    let result = await UpdateBlogSliderServices(req)
    return res.json(result)
}

export const UserFilterBySliderList = async (req, res) => {
    let result = await UserFilterBySliderListService(req)
    return res.json(result)
}