import express from 'express'
const router = express.Router()
import {
    DeleteProfile, GeneratePassword,
    Login,
    LogOutProfile,
    ReadProfile,
    RecoverEmailVerify,
    RecoverVerifyOtp,
    Register,
    ResetPassword, subAdminLogin,
    UpdateProfile,
    VerifyOtp
} from "../controllers/UserController.js";
import {AuthMiddleware} from "../middlewares/AuthMiddleware.js";
import {
    BlogCreate, BlogDetails,
    BlogRead,
    BlogRemove,
    BlogUpdate, SingleBlogRead, UserFilterByBlogList
} from "../controllers/BlogController.js";
import {
    SingleTeamListRead,
    TeamListCreate,
    TeamListRead,
    TeamListRemove,
    TeamListUpdate,
    UserFilterByTeamList
} from "../controllers/TeamController.js";
import {
    CreateBlogSlider,
    ReadBlogSlider,
    RemoveBlogSlider, SingleSliderList,
    UpdateBlogSlider, UserFilterBySliderList
} from "../controllers/BlogSliderController.js";
import {CreateContact} from "../controllers/ContactController.js";
import {
    CreateServiceController,
    ReadServiceController,
    RemoveServiceController, SingleReadServiceController, UpdateServiceController, UserFilterByServiceList
} from "../controllers/ServiceController.js";


// sub admin log api
router.post('/subAdminLogin',subAdminLogin)
// user related api
router.post('/Register',Register)
router.post('/Login',Login)
router.post('/VerifyOtp',VerifyOtp)
router.get('/LogOut',AuthMiddleware,LogOutProfile)
router.post('UpdateProfile',AuthMiddleware,UpdateProfile)
router.get('/ReadProfile',AuthMiddleware,ReadProfile)
router.post('/DeleteProfile',AuthMiddleware,DeleteProfile)
router.get('/RecoverEmailVerify',RecoverEmailVerify)
router.post('/RecoverVerifyOtp',RecoverVerifyOtp)
router.post('/ResetPassword',ResetPassword)
router.get('/GeneratePassword',GeneratePassword)

//blog related api
router.post("/BlogCreate",AuthMiddleware , BlogCreate)
router.get("/SingleBlogRead/:id", SingleBlogRead)
router.get("/BlogRead", BlogRead)
router.delete("/BlogRemove/:blogID",AuthMiddleware ,BlogRemove)
router.post("/BlogUpdate/:blogID", AuthMiddleware, BlogUpdate)
router.get("/BlogDetails/:blogID", BlogDetails)
router.get("/UserFilterByBlogList",AuthMiddleware, UserFilterByBlogList)

// router.post("/BlogListByKeyword/:keyword", BlogListByKeyword)
// router.post("/BlogReview",  BlogReview)

//blog hero / slider related api
router.post("/CreateBlogSlider",AuthMiddleware,CreateBlogSlider)
router.get("/SingleSliderList/:id", SingleSliderList)
router.get("/ReadBlogSlider",ReadBlogSlider)
router.get("/RemoveBlogSlider/:id",AuthMiddleware,RemoveBlogSlider)
router.post("/UpdateBlogSlider/:id",AuthMiddleware, UpdateBlogSlider)
router.get("/UserFilterBySliderList",AuthMiddleware, UserFilterBySliderList)

// Blog admin Team List
router.post("/TeamListCreate", AuthMiddleware,TeamListCreate)
router.get("/SingleTeamListRead/:id", SingleTeamListRead)
router.get("/TeamListRead", TeamListRead)
router.get("/TeamListRemove/:id", AuthMiddleware,TeamListRemove)
router.post("/TeamListUpdate/:teamID", AuthMiddleware,TeamListUpdate)
router.get("/UserFilterByTeamList",AuthMiddleware, UserFilterByTeamList)
// Service Section
router.post("/CreateService", AuthMiddleware,CreateServiceController)
router.get("/SingleReadServiceController/:id",SingleReadServiceController)
router.get("/ReadService",ReadServiceController)
router.get("/RemoveService/:id",AuthMiddleware,RemoveServiceController)
router.post("/UpdateService/:serviceID",AuthMiddleware,UpdateServiceController)
router.get("/UserFilterByServiceList",AuthMiddleware, UserFilterByServiceList)


// contact routes
router.post("/CreateContact",CreateContact)




export default router;