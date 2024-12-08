import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import {useState} from "react";
import AdminStore from "../../../store/admin-store.js";


const AdminLoginComponent = () => {
    const [error ,setError] = useState("");
    const {LoginFormData,LoginOnChange,LoginRequest} = AdminStore()
    let navigate = useNavigate();


    const SubmitButton =async (e) => {
        e.preventDefault();
        try{
            let res = await LoginRequest(LoginFormData)
            if(res["status"] === "success"){
                navigate("/auth/admin/loginVerifyOtp")
                toast.success("check your email sent 6 digits otp code");
            }
            else{
                if(res['status']==="failed"){
                    setError(res['message'])
                }
            }
        }
        catch (err){
            toast.error("some thing went wrong!");
        }
    }

    return (
        <div>
            <div className="container">
                <div className="mx-auto my-5 pt-5 col-lg-4 col-md-8 col-sm-12 col-12">
                    <div className="p-3 bg-white rounded shadow">
                        <form onSubmit={SubmitButton}>
                            <div className="text-center">
                                <p className="text-muted mb-4">Log in to <span className="text-info">BlogOnAgency</span>.</p>
                            </div>
                            <div>
                                <p className="text-danger">{error}</p>
                            </div>
                            <input type="text" className="form-control mb-3" placeholder="email address"
                                defaultValue={LoginFormData.email}
                                   onChange={(e) => {LoginOnChange("email", e.target.value)}}
                            />
                            <input type="password" className="form-control mb-3" placeholder="password"
                                   defaultValue={LoginFormData.password}
                                   onChange={(e) => {LoginOnChange("password", e.target.value)}}
                            />
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