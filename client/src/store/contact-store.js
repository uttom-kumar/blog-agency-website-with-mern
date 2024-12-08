import {create} from "zustand";
import axios from "axios";


const ContactStore = create((set)=>({
    ContactFormData : {name: "", email: "",subject: "", msg: ""},
    ContactFormOnChange: (name, value)=> {
        set((state)=>({
            ContactFormData: {
                ...state.ContactFormData,
                [name]:value
            }
        }))
    },

    ContactCreateRequest: async (reqBody) => {
        let url = `https://blog-agency-website-with-mern.vercel.app/api/CreateContact`

        let res = await axios.post(url,reqBody)
        return res.data['status'] === "success"
    }

}))
export default ContactStore;