import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import ReactCodeInput from "react-code-input";
import AdminStore from "../../../store/admin-store.js";
import {useState} from "react";
import LoadingSkeleton from "../../../skeleton/Loading-skeleton.jsx";

const AdminLoginVerifyOtpComponent = () => {
    const [loading, setLoading] = useState('d-none');
    const {OtpFormData,  OtpOnChange, LoginVerifyOtpRequest} = AdminStore()
    let navigate = useNavigate()
    const [error ,setError] = useState("");

    const SubmitButton =async (e) => {
        e.preventDefault();
        try{
            setLoading('d-block');
            let res = await LoginVerifyOtpRequest(OtpFormData.otp)
            if(res["status"] === "success"){
                navigate(`/auth/admin/dashboard`);
                setLoading('d-none');
                toast.success("Otp verify successfully.");
            }
            else if(OtpFormData.length !== 6 ){
                setLoading('d-none');
                setError("all fields required");
            }
            if(res['status']==="failed"){
                setLoading('d-none');
                setError(res['msg'])
            }
        }
        catch (err){
            setLoading('d-none');
            toast.error("some thing went wrong!");
        }
    }
    return (
        <>
            <div className={loading}>
                <LoadingSkeleton />
            </div>
            <div className="container">
                <div className="mx-auto my-5 pt-5 col-lg-4 col-md-8 col-sm-12 col-12">
                    <form onSubmit={SubmitButton} className=" p-4 bg-white rounded shadow">
                        <h4>OTP Verification</h4>
                        <p>Check your email & sent to 6 digits code</p>
                        <p className="text-danger mb-3">{error}</p>
                        <div className="text-center">
                            <ReactCodeInput inputMode={"numeric"} name={"otp"} type='text' fields={6}
                                            value={OtpFormData.otp}
                                            onChange={(value) => {
                                                OtpOnChange("otp", value)
                                            }}
                            />
                        </div>
                        <div className="text-center">
                            <button type="submit" className="mt-3 btn btn-success w-100">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AdminLoginVerifyOtpComponent;
