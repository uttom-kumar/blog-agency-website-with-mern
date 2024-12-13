import nodemailer from 'nodemailer'
import {EMAIL_HOST, EMAIL_PASS, EMAIL_PORT, EMAIL_SECURITY, EMAIL_USER} from '../config/config.js'

export const ContactSend = async (FullName,EmailTo, EmailText, EmailSubject) => {
    let transport = nodemailer.createTransport({
        service: "gmail",
        host: EMAIL_HOST,
        port : EMAIL_PORT,
        secure : EMAIL_SECURITY,
        auth:{
            user : EMAIL_USER,
            pass : EMAIL_PASS
        },
        // optional tls
        // tls : { rejectUnauthorized : false}
    })

    let mailOption = {
        from : `AGENCY-BLOG-WEBSITE ${EMAIL_USER}`,
        to : EmailTo,
        subject : EmailSubject,
        text : EmailText,
        html: `
            <h1>Client Name : ${FullName}</h1>
            <p>Email : ${EmailTo}</p>
            <p>Message : ${EmailText}</p>
        `
    }
    return await transport.sendMail(mailOption)
}