import {create} from "zustand";
import axios from "axios";
import {unauthorized} from "../utility/utility.js";
import Cookies from "js-cookie";

const SliderStore = create((set)=> ({
    BlogSliderList: null,
    BlogSliderListRequest: async () => {
        set({BlogSliderList: null})
        let url = `https://blog-agency-website-with-mern.vercel.app/api/ReadBlogSlider`
        let res = await axios.get(url)
        if(res.data['status'] === "success"){
            set({BlogSliderList: res.data.data})
        }
    },
    SingleSliderListReadRequest: async (id) => {
        let url = `https://blog-agency-website-with-mern.vercel.app/api/SingleSliderList/${id}`
        let res = await axios.get(url);
        if(res.data['status']==="success"){
            set({UpdateSliderFormData: res.data.data})
        }
    },
// ---------------- userFilter By SliderList Request ------------------------
    userFilterBySliderList: null,
    userFilterBySliderListRequest: async () => {
        try{
            let url = `https://blog-agency-website-with-mern.vercel.app/api/UserFilterBySliderList`
            let res = await axios.get(url,{headers: {token : Cookies.get('token')}})
            console.log(res)
            if(res.data['status'] === "success"){
                set({userFilterBySliderList: res.data.data})
            }
        }
        catch (err) {
            unauthorized(err.response.status);
        }
    },


// ---------------- Create Slider Request ------------------------
    sliderFormData: {image:"",heading:"",title:"",description:""},
    sliderOnChange: (name, value) =>{
        set((state)=>({
            sliderFormData:{
                ...state.sliderFormData,
                [name]:value
            }
        }))
    },
    createSliderListRequest: async (reqBody) => {
        try{
            let url = `https://blog-agency-website-with-mern.vercel.app/api/CreateBlogSlider`
            let res = await axios.post(url,reqBody,{headers: {token : Cookies.get('token')}})
            if(res.data['status'] === "success"){
                set({sliderFormData: res.data.data[0]})
            }
            return res.data['status'] === "success"
        }
        catch (err) {
            unauthorized(err.response.status);
        }
    },


//---------------------- Remove Slider Request -------------------------------
    removeSliderRequest: async (id) => {
        try {
            let url = `https://blog-agency-website-with-mern.vercel.app/api/RemoveBlogSlider/${id}`
            await axios.get(url,{headers: {token : Cookies.get('token')}})
        }
        catch (err){
            unauthorized(err.response.status)
        }
    },
// ------------------ update slider request --------------------
    UpdateSliderFormData: {image:"",heading:"",title:"",description:""},
    UpdateSliderOnChange: (name, value) =>{
        set((state)=>({
            UpdateSliderFormData:{
                ...state.UpdateSliderFormData,
                [name]:value
            }
        }))
    },
    updateSliderListRequest: async (id,reqBody) => {
        try{
            let url = `https://blog-agency-website-with-mern.vercel.app/api/UpdateBlogSlider/${id}`
            let res = await axios.post(url,reqBody,{headers: {token : Cookies.get('token')}})
            if(res.data['status']==='success'){
                set({UpdateSliderFormData: res.data.data})
            }
            return res.data['status'] === "success"
        }
        catch (err){
            unauthorized(err.response.status);
        }
    }
}))
export  default SliderStore;