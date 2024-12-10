import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import ReactCodeInput from "react-code-input";
import {useState} from "react";
import LoadingSkeleton from "../../../skeleton/Loading-skeleton.jsx";

const AdminOtpVerifyComponent = () => {
    const [loading, setLoading] = useState('d-none');
    let navigate = useNavigate()
    const SubmitButton = (e) => {
        e.preventDefault();
        setLoading('d-block')
        navigate(`/auth/admin/dashboard`);
        setLoading('d-none');
        toast.success("Otp verify successfully.");
    }
    return (
        <>
            <div className={loading}>
                <LoadingSkeleton/>
            </div>
            <div className="container">
                <div className="mx-auto my-5 pt-5 col-lg-4 col-md-8 col-sm-12 col-12">
                    <form onSubmit={SubmitButton} className=" p-4 bg-white rounded shadow">
                        <h4>OTP Verification</h4>
                        <p>Check your email & sent to 6 digits code</p>
                        <div className="text-center">
                            <ReactCodeInput inputMode={"numeric"} name={"otp"} type='text' fields={6}/>
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

export default AdminOtpVerifyComponent;