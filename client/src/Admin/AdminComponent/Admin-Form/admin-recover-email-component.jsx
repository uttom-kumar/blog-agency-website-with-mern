import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import LoadingSkeleton from "../../../skeleton/Loading-skeleton.jsx";


const AdminRecoverEmailComponent = () => {
    const [loading, setLoading] = useState('d-none');
    let navigate = useNavigate()
    const SubmitButton = (e) => {
        e.preventDefault();
        setLoading('d-block')
        navigate(`/auth/admin/otpVerify`)
        setLoading('d-none');
        toast.success("Recover email added successfully.");
    }
    return (
        <>
            <div className={loading}>
                <LoadingSkeleton />
            </div>
            <div className="container">
                <div className="mx-auto my-5 pt-5 col-lg-4 col-md-8 col-sm-12 col-12">
                    <form onSubmit={SubmitButton} className=" p-4 bg-white rounded shadow">
                        <h4>Find your Email</h4>
                        <p>A verification code will be sent to the email address you provide</p>
                        <input className="form-control" type="text" placeholder="Enter your Email address"/>
                        <button type="submit" className="mt-3 btn btn-success px-5">Search</button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AdminRecoverEmailComponent;