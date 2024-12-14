import {create} from "zustand";
import Cookies from "js-cookie";
import axios from "axios";
import {getEmail, setEmail} from "../utility/utility.js";




const AdminStore = create((set) => ({
    isLogin:()=>{
        return !!Cookies.get('token');
    },

    RegisterForm : {fullName: "",email:"",gender: "",password:""},
    RegisterOnChange: (name, value) => {
        set((state)=>({
            RegisterForm:{
                ...state.RegisterForm,
                [name]:value
            }
        }))
    },
    RegisterRequest: async (reqBody) => {
        let url = `https://blog-agency-website-with-mern.vercel.app/api/Register`
        let res = await axios.post(url, reqBody)
        return res.data
    },

    // Admin or user login api request
    LoginFormData: {email:"",password:""},
    LoginOnChange: (name, value) => {
        set((state)=>({
            LoginFormData:{
                ...state.LoginFormData,
                [name]:value
            }
        }))
    },
    LoginRequest: async (LoginFormData) => {
        let url = `https://blog-agency-website-with-mern.vercel.app/api/Login`
        let res = await axios.post(url, LoginFormData)
        setEmail(LoginFormData.email)
        return res.data
    },
    subAdminFormRequest: async (reqBody) => {
        let url = `https://blog-agency-website-with-mern.vercel.app/api/subAdminLogin`
        let res = await axios.post(url, reqBody)
        return res.data
    },

    // Otp verify
    OtpFormData: {otp:""},
    OtpOnChange: (name, value) => {
        set((state)=>({
            OtpFormData:{
                ...state.OtpFormData,
                [name]:value
            }
        }))
    },
    LoginVerifyOtpRequest: async (otp) => {
        let url = `https://blog-agency-website-with-mern.vercel.app/api/VerifyOtp`;
        let email = getEmail()

        let res = await axios.post(url,{email,otp});
        if (res.data['status'] === "success") {
            sessionStorage.removeItem('email')
            Cookies.set("token", res.data.token);
        }
        return res.data
    },
    // logout request
    LogOutRequest: async () => {
        let url = `https://blog-agency-website-with-mern.vercel.app/api/LogOut`
        let res = await axios.get(url, {headers: {token : Cookies.get('token')}});
        if(res.data['status'] === "success"){
            Cookies.remove("token");
        }
        return res.data['status'] === "success"
    },

//     ---------Generate password -------------
    GeneratePasswordRequest: async () => {
        let url = `https://blog-agency-website-with-mern.vercel.app/api/GeneratePassword`
        let res = await axios.get(url)
        console.log(res)
        if(res.data['status'] === "success"){
            set((state) => ({
                RegisterForm: {
                    ...state.RegisterForm,
                    password: res.data.data
                }
            }));
        }
    }

}))
export default AdminStore