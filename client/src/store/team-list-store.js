import {create} from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import {unauthorized} from "../utility/utility.js";

const TeamListStore = create((set)=>({
    TeamList: null,
    TeamListReadRequest: async () => {
        set({TeamList:null})
        let url = `https://blog-agency-website-with-mern.vercel.app/api/TeamListRead`
        let res = await axios.get(url)
        if(res.data['status'] === "success"){
            set({TeamList: res.data.data})
        }
    },
    SingleTeamListReadRequest: async (id) => {
        let url = `https://blog-agency-website-with-mern.vercel.app/api/SingleTeamListRead/${id}`
        let res = await axios.get(url);
        if(res.data['status']==="success"){
            set({teamFormData: res.data.data})
        }
    },
// ----------------------------- usr filter by service request ----------------------
    UserFilterByTeamList: null,
    UserFilterByTeamListRequest: async () => {
        try{
            let url = `https://blog-agency-website-with-mern.vercel.app/api/UserFilterByTeamList`
            let res = await axios.get(url,{headers: {token : Cookies.get('token')}})
            if(res.data['status'] === "success"){
                set({UserFilterByTeamList: res.data.data})
            }
        }
        catch (err) {
            unauthorized(err.response.status);
        }
    },

// ------------------------------Create Team Request -----------------------------------
    teamFormData: {image:"",name:"",position:"",bio:"",description:""},
    teamOnChange: (name, value) =>{
        set((state)=>({
            teamFormData:{
                ...state.teamFormData,
                [name]:value
            }
        }))
    },
    createTeamRequest: async (reqBody) => {
        try{
            let url = `https://blog-agency-website-with-mern.vercel.app/api/TeamListCreate`
            let res = await axios.post(url,reqBody,{headers: {token : Cookies.get('token')}})
            if(res.data['status'] === "success"){
                set({teamFormData: res.data.data[0]})
            }
            return res.data['status'] === "success"
        }
        catch (err) {
            unauthorized(err.response.status);
        }
    },
//---------------------- Remove Team Request -------------------------------
    removeTeamRequest: async (id) => {
        try {
            let url = `https://blog-agency-website-with-mern.vercel.app/api/TeamListRemove/${id}`
            await axios.get(url,{headers: {token : Cookies.get('token')}})
        }
        catch (err){
            unauthorized(err.response.status)
        }
    },
// -------------------------- --- update Team request ----------------------------------
    updateTeamListRequest: async (id,reqBody) => {
        try{
            let url = `https://blog-agency-website-with-mern.vercel.app/api/TeamListUpdate/${id}`
            let res = await axios.post(url,reqBody,{headers: {token : Cookies.get('token')}})
            return res.data['status'] === "success"
        }
        catch (err){
            unauthorized(err.response.status);
        }
    }
}))
export default TeamListStore;