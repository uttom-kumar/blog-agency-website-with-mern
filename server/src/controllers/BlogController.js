import {
    BlogDetailService,
    BlogRemoveService,
    BlogUpdateService,
    CreateBlogService,
    ReadBlogService, UserFilterByBlogListService,
} from "../services/BlogService.js";


export const BlogCreate = async (req, res) => {
    let result = await CreateBlogService(req);
    return res.json(result);
}

export const BlogRead = async (req, res) => {
    let result = await ReadBlogService(req);
    return res.json(result);
}
export const BlogRemove = async (req, res) => {
    let result = await BlogRemoveService(req);
    return res.json(result);
}
export const BlogUpdate = async (req, res) => {
    let result = await BlogUpdateService(req);
    return res.json(result);
}

export const BlogDetails = async (req, res) => {
    let result = await BlogDetailService(req)
    return res.json(result);
}


export const UserFilterByBlogList = async (req, res) => {
    let result = await UserFilterByBlogListService(req);
    return res.json(result);
}
