import {BrowserRouter, Route, Routes, useLocation,} from "react-router-dom";
import HomePage from "./pages/home-page.jsx";
import AboutPage from "./pages/about-page.jsx";
import BlogPage from "./pages/blog-page.jsx";
import ServicePage from "./pages/service-page.jsx";
import ContactPage from "./pages/contact-page.jsx";
import {useEffect} from "react";
import BlogDetailsPage from "./pages/blog-details-page.jsx";
import AdminHomePage from "./Admin/AdminComponent/Admin-Pages/admin-home-page.jsx";
import AdminBlogPage from "./Admin/AdminComponent/Admin-Pages/admin-blog-page.jsx";
import AdminSliderPage from "./Admin/AdminComponent/Admin-Pages/admin-slider-page.jsx";
import AdminTeamPage from "./Admin/AdminComponent/Admin-Pages/admin-team-page.jsx";
import AdminRegisterPage from "./Admin/AdminComponent/Admin-Pages/admin-register-page.jsx";
import AdminLoginPage from "./Admin/AdminComponent/Admin-Pages/admin-login-page.jsx";
import AdminRecoverEmailComponent from "./Admin/AdminComponent/Admin-Form/admin-recover-email-component.jsx";
import AdminOtpVerifyComponent from "./Admin/AdminComponent/Admin-Form/admin-otpVerify-component.jsx";
import PrivetRoutes from "./Privet-Routes/privet-routes.jsx";
import AdminLoginVerifyOtpPage from "./Admin/AdminComponent/Admin-Pages/admin-login-verify-otp-page.jsx";
import AdminCreateBlogList from "./Admin/AdminComponent/Admin-Pages/admin-create-blog-list.jsx";
import NextTopLoader from "nextjs-toploader";
import AdminBlogListUpdatePage from "./Admin/AdminComponent/Admin-Pages/admin-blog-list-update-page.jsx";
import AdminHeroSliderCreatePage from "./Admin/AdminComponent/Admin-Pages/admin-hero-slider-create-page.jsx";
import AdminSliderUpdatePage from "./Admin/AdminComponent/Admin-Pages/admin-slider-update-page.jsx";
import AdminCreateTeamPage from "./Admin/AdminComponent/Admin-Pages/admin-create-team-page.jsx";
import AdminTeamUpdatePage from "./Admin/AdminComponent/Admin-Pages/admin-team-update-page.jsx";
import AdminServicePage from "./Admin/AdminComponent/Admin-Pages/admin-service-page.jsx";
import AdminServiceCreatePage from "./Admin/AdminComponent/Admin-Pages/admin-service-create-page.jsx";
import AdminServiceUpdatePage from "./Admin/AdminComponent/Admin-Pages/admin-service-update-page.jsx";
import NoFoundPage from "./pages/noFoundPage.jsx";
import UserLogin from "./component/user/user-login.jsx";



function ScrollToTopOnNavigation() {
    const { pathname } = useLocation();
    useEffect(() => {
        const scroll = () => {
            window.scrollTo(0, 0);
        };
        requestAnimationFrame(scroll);
    }, [pathname]);
    return null;
}


const App = (props) => {
    return (
        <>
            <NextTopLoader
                color="#e11d48"
                height={2}
                speed={400}
            />{props.children}
            <BrowserRouter>
                <ScrollToTopOnNavigation />
                <Routes>
                    <Route path={`/*`} element={<NoFoundPage />} />
                    <Route path={"/"} element={<HomePage />}/>
                    <Route path={"/about"} element={<AboutPage />}/>
                    <Route path={"/blog"} element={<BlogPage />}/>
                    <Route path={"/blogDetails/:blogID"} element={<BlogDetailsPage />}/>
                    <Route path={"/service"} element={<ServicePage />}/>
                    <Route path={"/contact"} element={<ContactPage />}/>


                    <Route path={"/auth/admin/register"} element={<AdminRegisterPage />}/>
                    <Route path={"/auth/admin/login"} element={<AdminLoginPage />}/>
                    <Route path={"/auth/admin/sub-login"} element={<UserLogin />}/>
                    <Route path={"/auth/admin/loginVerifyOtp"} element={<AdminLoginVerifyOtpPage />}/>
                    <Route path={"/auth/admin/emailVerify"} element={<AdminRecoverEmailComponent />}/>
                    <Route path={"/auth/admin/otpVerify"} element={<AdminOtpVerifyComponent />}/>
                    <Route path={"/auth/admin/resetPassword"} element={<AdminOtpVerifyComponent />}/>

                    <Route path={"/auth/admin/dashboard"} element={
                        <PrivetRoutes>
                            <AdminHomePage />
                        </PrivetRoutes>
                    } />
                    {/*----------------blog related all routes----------------------*/}
                    <Route path={"/auth/admin/blog"} element={
                        <PrivetRoutes>
                            <AdminBlogPage />
                        </PrivetRoutes>
                    } />
                    <Route path={"/auth/admin/createBlogList"} element={
                        <PrivetRoutes>
                            <AdminCreateBlogList />
                        </PrivetRoutes>
                    } />
                    <Route path={"/auth/admin/updateBlogList/:blogID"} element={
                        <PrivetRoutes>
                            <AdminBlogListUpdatePage />
                        </PrivetRoutes>
                    } />
                    {/* --------------------slider related all route ----------------*/}
                    <Route path={"/auth/admin/slider"} element={
                        <PrivetRoutes>
                            <AdminSliderPage />
                        </PrivetRoutes>
                    } />
                    <Route path={"/auth/admin/createSlider"} element={
                        <PrivetRoutes>
                            <AdminHeroSliderCreatePage />
                        </PrivetRoutes>
                    } />
                    <Route path={"/auth/admin/updateSlider/:id"} element={
                        <PrivetRoutes>
                            <AdminSliderUpdatePage />
                        </PrivetRoutes>
                    } />
                    {/*-----------------------team related all routes--------------------*/}
                    <Route path={"/auth/admin/team"} element={
                        <PrivetRoutes>
                            <PrivetRoutes>
                                <AdminTeamPage />
                            </PrivetRoutes>
                        </PrivetRoutes>
                    } />
                    <Route path={"/auth/admin/teamCreate"} element={
                        <PrivetRoutes>
                            <PrivetRoutes>
                                <AdminCreateTeamPage />
                            </PrivetRoutes>
                        </PrivetRoutes>
                    } />
                    <Route path={"/auth/admin/teamUpdate/:id"} element={
                        <PrivetRoutes>
                            <PrivetRoutes>
                                <AdminTeamUpdatePage />
                            </PrivetRoutes>
                        </PrivetRoutes>
                    } />
                    {/*-------------------------service related all routes -------------------*/}
                    <Route path={"/auth/admin/service"} element={
                        <PrivetRoutes>
                            <AdminServicePage />
                        </PrivetRoutes>
                    } />
                    <Route path={"/auth/admin/createService"} element={
                        <PrivetRoutes>
                            <AdminServiceCreatePage />
                        </PrivetRoutes>
                    } />
                    <Route path={"/auth/admin/updateService/:id"} element={
                        <PrivetRoutes>
                            <AdminServiceUpdatePage />
                        </PrivetRoutes>
                    } />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;