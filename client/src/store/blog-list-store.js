import {create} from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import {unauthorized} from "../utility/utility.js";

const BlogListStore = create((set)=>({

    BlogList: null,
    BlogListRequest: async () => {
        let url = `https://blog-agency-website-with-mern.vercel.app/api/BlogRead`
        let res = await axios.get(url);
        if(res.data['status'] === "success"){
            set({BlogList: res.data.data})
        }
    },
    BlogListDetails: null,
    BlogListDetailsRequest: async (blogID) => {
        let url = `https://blog-agency-website-with-mern.vercel.app/api/BlogDetails/${blogID}`
        let res = await axios.get(url);
        if(res.data['status'] === "success"){
            set({BlogListDetails: res.data.data})
        }
    },


    // Create Blog list
    BlogFormData: {title:"", des:"", img:""},
    BlogOnChange: (name, value) => {
        set((state)=>({
            BlogFormData:{
                ...state.BlogFormData,
                [name]:value
            }
        }))
    },
    BlogListCreateRequest: async (reqBody) => {
        try{
            let url = `https://blog-agency-website-with-mern.vercel.app/api/BlogCreate`
            let res = await axios.post(url,reqBody,{headers: {token : Cookies.get('token')}})
            if(res.data['status'] === "success"){
                set({BlogFormData : res.data.data[0]})
            }
            return res.data['status'] === "success"
        }
        catch (err){
            unauthorized(err.response.status);
        }
    },

// -----------------blog update request -------------------------
    BlogUpdateRequest: async (blogID,reqBody) => {
        try{
            let url = `https://blog-agency-website-with-mern.vercel.app/api/BlogUpdate/${blogID}`
            let res = await axios.post(url,reqBody,{headers: {token : Cookies.get('token')}})
            return res.data['status'] === "success"
        }
        catch (err){
            unauthorized(err.response.status);
        }
    },

    //blogList filter by user
    BlogListFilterAdmin:null,
    BlogListFilterByAdminRequest: async () => {
        try{
            let url = `https://blog-agency-website-with-mern.vercel.app/api/UserFilterByBlogList`
            let res = await axios.get(url,{headers: {token : Cookies.get('token')}});
            if(res.data['status'] === "success"){
                set({BlogListFilterAdmin: res.data.data})
            }
        }
        catch (err){
            unauthorized(err.response.status);
        }
    },


// ----------------blog delete request -------------------------
    BlogDeleteRequest: async (blogID) => {
        try{
            let url = `https://blog-agency-website-with-mern.vercel.app/api/BlogRemove/${blogID}`
            await axios.delete(url,{headers: {token : Cookies.get('token')}})
        }
        catch (err){
            unauthorized(err.response.status);
        }
    },

}))
export default BlogListStore;