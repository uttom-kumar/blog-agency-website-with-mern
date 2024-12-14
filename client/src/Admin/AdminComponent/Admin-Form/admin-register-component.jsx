import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import AdminStore from "../../../store/admin-store.js";
import { useState } from "react";
import {IsEmail, ValidPassword} from "../../../utility/ValidationHelper.js";
import LoadingSkeleton from "../../../skeleton/Loading-skeleton.jsx";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

const AdminRegisterComponent = () => {
    const [loading, setLoading] = useState('d-none');
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState("");
    const { RegisterRequest, RegisterForm, RegisterOnChange } = AdminStore();
    const navigate = useNavigate();


    const SubmitButton = async (e) => {
        e.preventDefault();
        setLoading("d-block");


        if (!IsEmail(RegisterForm.email)) {
            setLoading("d-none");
            return toast.error("Please enter a valid email");
        }

        const validPassMessage = ValidPassword(RegisterForm.password);
        if (validPassMessage !== "Password is valid.") {
            setLoading("d-none");
            return toast.error(validPassMessage);
        }


        if (confirmPassword !== RegisterForm.password) {
            setLoading("d-none");
            return toast.error("Passwords do not match");
        }


        try {
            let res = await RegisterRequest(RegisterForm);

            if (res["status"] === "success") {
                toast.success("Registered successfully!");
                navigate("/auth/admin/login");

                // Clear form inputs after success
                setLoading("d-none");
                RegisterOnChange("fullName", "");
                RegisterOnChange("email", "");
                RegisterOnChange("gender", "");
                RegisterOnChange("password", "");
                setConfirmPassword("");
            } else {
                setLoading("d-none");
                setError(res["message"]);
            }
        } catch (error) {
            setLoading("d-none");
            toast.error("An error occurred. Please try again.");
        }
    };


    return (
        <>
            <div className={loading}>
                <LoadingSkeleton />
            </div>
            <div className="container">
                <div className="mx-auto my-5 pt-5 col-lg-4 col-md-8 col-sm-12 col-12">
                    <div className="p-3 bg-white rounded shadow">
                        <form onSubmit={SubmitButton}>
                            <div className="text-center">
                                <h4 className="m-0">Create a new account</h4>
                                <p className="text-muted mb-4">It's quick and easy.</p>
                            </div>
                            <div>
                                <p className="text-danger">{error}</p>
                            </div>
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Full Name"
                                defaultValue={RegisterForm.fullName}
                                onChange={(e) => RegisterOnChange('fullName', e.target.value)}
                            />
                            <input
                                type="text"
                                className="form-control mb-3"
                                placeholder="Email Address"
                                defaultValue={RegisterForm.email}
                                onChange={(e) => RegisterOnChange('email', e.target.value)}
                            />
                            <div className="my-4">
                                <h5>Choose Gender</h5>
                                <div className="d-flex gap-3 align-items-center">
                                    <div className="d-flex gap-1 align-items-center">
                                        <input
                                            id="male"
                                            type="radio"
                                            name="gender"
                                            value="Male"
                                            checked={RegisterForm.gender === "Male"}
                                            onChange={(e) => RegisterOnChange('gender', e.target.value)}
                                        />
                                        <label htmlFor="male">Male</label>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                        <input
                                            id="female"
                                            type="radio"
                                            name="gender"
                                            value="Female"
                                            checked={RegisterForm.gender === "Female"}
                                            onChange={(e) => RegisterOnChange('gender', e.target.value)}
                                        />
                                        <label htmlFor="female">Female</label>
                                    </div>
                                </div>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Password"
                                    defaultValue={RegisterForm.password}
                                    onChange={(e) => RegisterOnChange('password', e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <BiSolidHide /> : <BiSolidShow />}
                                </button>
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    className="form-control"
                                    placeholder="Confirm Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <BiSolidHide /> : <BiSolidShow />}
                                </button>
                            </div>
                            <div className="text-center">
                                <button type="submit" className="btn px-5 btn-success">Sign Up</button>
                            </div>
                            <div className="text-center mt-3">
                                <Link to={`/auth/admin/login`}>Already have an account?</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminRegisterComponent;
