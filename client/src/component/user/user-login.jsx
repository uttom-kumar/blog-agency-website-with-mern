import {useNavigate} from "react-router-dom";
import toast from 'react-hot-toast'
import {useState} from "react";
import AdminStore from "../../store/admin-store.js";
import Cookies from "js-cookie";
import LoadingSkeleton from "../../skeleton/Loading-skeleton.jsx";

const UserLogin = () => {
    const {LoginFormData,LoginOnChange,subAdminFormRequest} = AdminStore()
    const[loading,setLoading] = useState('d-none');
    const[error, setError] = useState("");

    const navigate = useNavigate();

    const SubmitButton =async (e) => {
        e.preventDefault();
        try{
            setLoading('d-block');
            let res = await subAdminFormRequest(LoginFormData)

            if(res["status"] === "success"){
                Cookies.set('token', res.token)
                navigate("/auth/admin/dashboard");
                setLoading('d-none');
                toast.success("logged in successfully!");
            }
            else{
                if(res['status']==="failed"){
                    setLoading("d-none");
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
                <LoadingSkeleton/>
            </div>
            <div className="container ">
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
                                <button type="submit" className="btn px-5 py-2 btn-primary w-100">Login up</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default UserLogin
