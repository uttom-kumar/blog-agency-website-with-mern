import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {useState} from "react";
import AdminStore from "../../../store/admin-store.js";
import LoadingSkeleton from "../../../skeleton/Loading-skeleton.jsx";
import {BiSolidHide, BiSolidShow} from "react-icons/bi";


const AdminLoginComponent = () => {
    const [loading, setLoading] = useState('d-none');
    const [error ,setError] = useState("");
    const {LoginFormData,LoginOnChange,LoginRequest} = AdminStore()
    let navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const SubmitButton =async (e) => {
        e.preventDefault();
        try{
            setLoading('d-block')
            let res = await LoginRequest(LoginFormData)
            if(res["status"] === "success"){
                navigate("/auth/admin/loginVerifyOtp")
                setLoading('d-none');
                toast.success("check your email sent 6 digits otp code");
                LoginOnChange('email',"")
                LoginOnChange('password',"")
            }
            else{
                if(res['status']==="failed"){
                    setLoading('d-none');
                    setError(res['message'])
                }
            }
        }
        catch (err){
            setLoading('d-none');
            toast.error("some thing went wrong!");
        }
    }

    return (
        <div>
            <div className={loading}>
                <LoadingSkeleton />
            </div>
            <div className="container">
                <div className="mx-auto my-5 pt-5 col-lg-4 col-md-8 col-sm-12 col-12">
                    <div className="p-3 bg-white rounded shadow">
                        <form onSubmit={SubmitButton}>
                            <div className="text-center">
                                <p className="text-muted mb-4">Log in to <span className="text-info">BlogOnAgency</span>.
                                </p>
                            </div>
                            <div>
                                <p className="text-danger">{error}</p>
                            </div>
                            <input type="text" className="form-control mb-3" placeholder="email address"
                                   defaultValue={LoginFormData.email}
                                   onChange={(e) => {
                                       LoginOnChange("email", e.target.value)
                                   }}
                            />
                            <div className="input-group mb-3">
                                <input type={showPassword ? "text" : "password"} className="form-control"
                                       placeholder="password"
                                       defaultValue={LoginFormData.password}
                                       onChange={(e) => {
                                           LoginOnChange("password", e.target.value)
                                       }}
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <BiSolidHide/> : <BiSolidShow/>}
                                </button>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn px-5 py-2 btn-primary w-100">Sign up</button>
                            </div>
                            <div className="text-center mt-3">
                                <Link to={`/auth/admin/emailVerify`}>
                                    Forgotten account?
                                </Link>
                            </div>
                            <div className="text-center mt-3">
                                <Link className="btn btn-success" to={`/auth/admin/register`}>
                                    Create a new account
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginComponent;