import {Link, useNavigate} from "react-router-dom";
import toast from "react-hot-toast";

const AdminForgetPasswordComponent = () => {
    let navigate = useNavigate();

    const SubmitButton = (e) => {
        e.preventDefault();
        navigate(`/auth/admin/resetPassword`);
        toast.success("Recover email added successfully.");
    }
    return (
        <div>
            <div className="container">
                <div className="mx-auto my-5 pt-5 col-lg-4 col-md-8 col-sm-12 col-12">
                    <div className="p-3 bg-white rounded shadow">
                        <form onSubmit={SubmitButton}>
                            <div className="text-center">
                                <p className="text-muted mb-4">Log in to <span className="text-info">BlogOnAgency</span>.
                                </p>
                            </div>
                            <input type="text" className="form-control mb-3" placeholder="email address"/>
                            <input type="password" className="form-control mb-3" placeholder="password"/>
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

export default AdminForgetPasswordComponent;