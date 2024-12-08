import {create} from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import {unauthorized} from "../utility/utility.js";

const ServiceListStore = create((set)=>({
    ServiceList:null,
    ServiceListReadRequest: async () => {
        set({ServiceList:null});
        let url = `http://localhost:5050/api/ReadService`
        let res = await axios.get(url)
        if(res.data['status'] === "success"){
            set({ServiceList: res.data.data})
        }
    },
// ----------------------------- usr filter by service request ----------------------
    userFilterByServiceList: null,
    userFilterByServiceListRequest: async () => {
        try{
            let url = `http://localhost:5050/api/UserFilterByServiceList`
            let res = await axios.get(url,{headers: {token : Cookies.get('token')}})
            if(res.data['status'] === "success"){
                set({userFilterByServiceList: res.data.data})
            }
        }
        catch (err) {
            unauthorized(err.response.status);
        }
    },
// ------------------------Create Service Request --------------------------------
    serviceFormData: {image:"",title:"",des:""},
    serviceOnChange: (name, value) =>{
        set((state)=>({
            serviceFormData:{
                ...state.serviceFormData,
                [name]:value
            }
        }))
    },
    createServiceRequest: async (reqBody) => {
        try{
            let url = `http://localhost:5050/api/CreateService`
            let res = await axios.post(url,reqBody,{headers: {token : Cookies.get('token')}})
            if(res.data['status'] === "success"){
                set({serviceFormData: res.data.data[0]})
            }
            return res.data['status'] === "success"
        }
        catch (err) {
            unauthorized(err.response.status);
        }
    },
//---------------------- Remove Team Request -------------------------------
    DeleteServiceRequest: async (id) => {
        try {
            let url = `http://localhost:5050/api/RemoveService/${id}`
            await axios.get(url,{headers: {token : Cookies.get('token')}})
        }
        catch (err){
            unauthorized(err.response.status)
        }
    },
// -------------------------- --- update Team request ----------------------------------
    updateServiceRequest: async (id,reqBody) => {
        try{
            let url = `http://localhost:5050/api/UpdateService/${id}`
            let res = await axios.post(url,reqBody,{headers: {token : Cookies.get('token')}})
            return res.data['status'] === "success"
        }
        catch (err){
            unauthorized(err.response.status);
        }
    }

}))
export default ServiceListStore;