import {ContactSend} from "../utility/ContactUtility.js";


export const CreateContactService = async (req) => {
    try{
        let reqBody = req.body
        let {fullName, email , subject, msg} = reqBody

        if (!fullName || !email || !subject || !msg) {
           return {
               status : "failed",
               message: "All fields are required"
           };
        }

        let EmailSubject = `${subject}`
        let EmailText = `${msg}`

        await ContactSend(fullName, email, EmailText, EmailSubject)

        return{
            status : "success",
            message : "Send Successfully"
        }

    }
    catch(err){
        return {
            status : "failed",
            message : "please correct information",
        }
    }
}
