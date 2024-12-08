import {UserModel} from "../models/UserModel.js";
import {EmailSend} from "../utility/EmailUtility.js";
import {EncodedToken} from "../utility/TokenUtility.js";
import mongoose from "mongoose";

export const subAdminLoginService = async (req, res) => {
    try{
        let {email,password} = req.body
        let user = await UserModel.aggregate([
            {$match: {email:email, password:password}},
        ])
        if(user){
            let token = EncodedToken( user[0]["email"], user[0]["_id"])
            let options = {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "none",
                secure: true,
            };
            res.cookie("token", token, options)

            return{
                status : "success",
                message : "Login Successfully",
                token : token
            }
        }
        else{
            return {
                status: "failed",
                message: "User Not Found",
            }
        }
    }
    catch (err){
        return{
            status: "failed",
            message: "service login failed",
            error: err.toString()
        }
    }
}

export const RegisterService = async (req, res) => {
    try{
        let reqBody= req.body

        let user = await UserModel.findOne({email : reqBody.email})

        if(user){
            return {
                status : "failed",
                message : "Email already exists"
            }
        }
        if (!reqBody.email || !reqBody.password || !reqBody.fullName || !reqBody.gender) {
            return {
                status: "failed",
                message: "All fields are required"
            }
        }
        const data = await UserModel.create(reqBody)
        return {
            status : "success",
            message : "User registration successfully!",
            data: data
        }
      
    }
    catch (err) {
        return {
            status : "failed",
            error : err.toString()
        }
    }
}

export const LoginService = async (req) => {
    try{
        let {email , password} = req.body
        let code = Math.floor(100000+Math.random()*900000)
        let user = await UserModel.findOne({email : email})
        if(!user){
            return {
                status : "failed",
                message : "user not found"
            }
        }
        if(!email || !password){
            return {
                status : "failed",
                message : "all fields are required"
            }

        }
        if(user['password']!==password){
            return {
                status : "failed",
                message : "password don't match"
            }
        }
        
        let EmailTo = email
        let EmailText = `Your Verification Code is = ${code}`
        let EmailSubject = "Email Verification"

        await EmailSend(EmailTo, EmailText, EmailSubject)
        await UserModel.updateOne({email:email, password:password}, {$set:{otp : code}})

        return{
            status : "success",
            message : "6 digits Code Send Successfully"
        }
       
    }
    catch(err){
        return {
            status : "failed",
            message : "please correct information",
        }
    }
}

export const OtpVerifyService = async (req, res) => {
    try{
        let {otp, email} = req.body
        let user = await UserModel.aggregate([
            {$match: {email:email, otp:otp}},
        ])

        if(user) {
            let token = EncodedToken( user[0]["email"], user[0]["_id"])
            await UserModel.updateOne({email:user[0]["email"]},{$set: {otp:0}})

            let options = {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "none",
                secure: true,
            };
            res.cookie("token", token, options)

            return{
                status : "success",
                message : "Login Successfully",
                token : token
            }
        }
        else{
            return {
                status : "fail",
                message : "Invalid OTP"
            }
        }
    }
    catch (err){
        return{
            status : "failed",
            msg : 'Invalid Otp Code',
            error : err.toString()
        }
    }
}

export const UpdateProfileService = async (req, res) => {
    try{
        let userID = req.params.user_id
        let reqBody = req.body

        let data = await UserModel.updateOne({user_id: userID},{$set:reqBody})
        return {
            status : "success",
            message : "Profile Updated Successfully",
            data : data
        }
    }
    catch (err){
        return {
            status : "failed",
            message : "Profile Update Failed",
            error : err.toString()
        }
    }
}

export const ReadProfileService = async (req, res) => {
    try{
        let userID = new ObejctId(req.headers.user_id)
        let MatchStage = {
            $match : {
                _id : userID
            }
        }
        let ProjectionStage = {
            $project : {
                _id : 0,
                password : 0,
                otp : 0,
                status : 0
            }
        }
        let data = await UserModel.aggregate([
            MatchStage,
            ProjectionStage
        ])
        return{
            status : "success",
            message : "Profile Read Successfully",
            data : data
        }
    }
    catch (err){
        return {
            status : "failed",
            message : "Profile Update Failed",
            error : err.toString()
        }
    }
}

export const LogOutProfileService = async (req, res) => {
    try{
        res.clearCookie("token")
        return {
            status : "success",
            message : "Logged Out Successfully",
        }
    }
    catch (err){
        return {
            status : "failed",
            message : "Failed to Logout",
            error : err.toString()
        }
    }
}

export const DeleteProfileService = async (req, res) => {
    try{
        let userID = req.headers.user_id
        await UserModel.deleteOne({_id: userID})
        return {
            status : "success",
            message : "Profile Deleted Successfully"
        }
    }
    catch (err){
        return {
            status : "failed",
            message : "Profile Delete Failed",
            error : err.toString()
        }
    }
}

export const RecoverEmailVerifyService = async (req, res) => {
    try{
        let {email} = req.body
        let user = await UserModel.aggregate([
            {$match :  {email : email}},
            {$count : "total"}
        ])
        let code = Math.floor(100000+Math.random()*900000)
        let EmailTo = email
        let EmailText = `Your Verification Code: ${code}`
        let EmailSubject = "Email Verification Code"


        if(user[0].total === 1) {
            await EmailSend (EmailTo, EmailText, EmailSubject)
            await UserModel.updateOne({email:email},{$set:{otp: code}},{upsert:true})
            return {
                status : "success",
                message : "6 digits Code Send Successfully"
            }
        }
        else{
            return {
                status : "failed",
                message : "User Not Found",
            }
        }
    }
    catch(err) {
        return {
            status : "failed",
            message : "Email Verification Code Failed",
            error : err.toString()
        }
    }
}

export const RecoverVerifyOtpService = async (req, res) => {
    try{
        let {email, otp} = req.body
        otp = parseInt(otp)

        let OtpCount = await UserModel.aggregate([
            {$match :  {email : email, status : 0 }},
            {$count : "total"}
        ])

        if(OtpCount[0].total === 1) {
            let OtpUpdate = await UserModel.updateOne(
                {
                    email : email,
                    otp : otp,
                    status : 0
                },
                {
                    otp : otp,
                    status : 1
                }
            )
            return {
                status : "success",
                message : "OTP verification Code Successfully",
                data : OtpUpdate
            }
        }
        else {
            return {
                status: false,
                message: "Invalid OTP Code"
            };
        }
    }

    catch (err){
        return{
            status : "failed",
            message : "Invalid OTP Code. Please Try again",
            error : err.toString()
        }
    }
}

export const ResetPasswordService = async (req, res) => {
    try{
        let reqBody = req.body
        let {email ,otp, password} = reqBody

        // otp===number then parseInt
        // otp = parseInt(otp)

        let OtpUsedCount = await UserModel.aggregate([
            {$match :  {email, otp, status : 1}},
            {$count : "total"}
        ])

        if(OtpUsedCount[0].total === 1){
            //update password
            let passUpdate = await UserModel.updateOne(reqBody)

            // reset opt and status code
            await UserModel.updateOne(
                {
                    email : email,
                    otp : otp,
                    status : 1
                },
                {
                    otp : 0,
                    status : 0
                }
            )
            return {
                status : "success",
                message : "Password changed Successfully",
                data : passUpdate
            }
        }
        else {
            return {
                status : "failed",
                message : "password does not change!"
            }
        }
    }
    catch (err){
        return {
            status : "failed",
            message : "Something went wrong",
            error : err.toString()
        }
    }
}