import {useNavigate} from "react-router-dom";
import toast from "react-hot-toast";
import ReactCodeInput from "react-code-input";

const AdminOtpVerifyComponent = () => {
    let navigate = useNavigate()
    const SubmitButton = (e) => {
        e.preventDefault();
        navigate(`/auth/admin/dashboard`);
        toast.success("Otp verify successfully.");
    }
    return (
        <div className="container">
            <div className="mx-auto my-5 pt-5 col-lg-4 col-md-8 col-sm-12 col-12">
                <form onSubmit={SubmitButton} className=" p-4 bg-white rounded shadow">
                    <h4>OTP Verification</h4>
                    <p>Check your email & sent to 6 digits code</p>
                    <div className="text-center">
                        <ReactCodeInput inputMode={"numeric"} name={"otp"} type='text' fields={6} />
                    </div>
                    <div className="text-center">
                        <button type="submit" className="mt-3 btn btn-success w-100">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminOtpVerifyComponent;