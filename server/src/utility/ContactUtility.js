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
        from : `${EmailTo}`,
        to : EMAIL_USER,
        subject : EmailSubject,
        html: `<!DOCTYPE html>
            <html lang="en">
            <head>
              <meta charset="UTF-8">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Email Template</title>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f4;
                  margin: 0;
                  padding: 0;
                }
                .container {
                  width: 100%;
                  max-width: 600px;
                  margin: 20px auto;
                  background-color: #ffffff;
                  border-radius: 8px;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                .header {
                  background-color: #4CAF50;
                  padding: 20px;
                  text-align: center;
                  color: #ffffff;
                  border-top-left-radius: 8px;
                  border-top-right-radius: 8px;
                }
                .header h1 {
                  margin: 0;
                }
                .content {
                  padding: 20px;
                  text-align: left;
                  color: #333333;
                }
                .content h2 {
                  color: #4CAF50;
                }
                .content p {
                  line-height: 1.6;
                }
                .button {
                  display: block;
                  width: 100%;
                  text-align: center;
                  margin: 20px 0;
                }
                .button a {
                  background-color: #4CAF50;
                  color: #ffffff;
                  padding: 10px 20px;
                  text-decoration: none;
                  border-radius: 5px;
                }
                .footer {
                  background-color: #f4f4f4;
                  padding: 10px;
                  text-align: center;
                  font-size: 12px;
                  color: #777777;
                  border-bottom-left-radius: 8px;
                  border-bottom-right-radius: 8px;
                }
              </style>
            </head>
            <body>

              <div class="container">
                <div class="header">
                  <h1>Welcome to Our Service</h1>
                </div>

                <div class="content">
                  <h2>Hi there, ${EmailTo}</h2>
                  <h4>Subject : ${EmailSubject}</h4>
                  <p>Message: <strong>${EmailText}</strong></p>
                </div>

                <div class="footer">
                  <p>&copy; 2024 Your Company. All rights reserved.</p>
                </div>
              </div>

            </body>
            </html>
      `,
    }
    return await transport.sendMail(mailOption)
}