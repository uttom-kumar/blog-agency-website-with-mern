import toast from "react-hot-toast";
import {Link, useNavigate} from "react-router-dom";
import AdminStore from "../../../store/admin-store.js";
import {useState} from "react";
import {IsEmail} from "../../../utility/ValidationHelper.js";
import LoadingSkeleton from "../../../skeleton/Loading-skeleton.jsx";


const AdminRegisterComponent = () => {
    const[loading, setLoading] = useState('d-none');
    const[confirmPassword, setConfirmPassword] = useState("")
    const [error ,setError ] = useState("");
    const {RegisterRequest, RegisterForm, RegisterOnChange} = AdminStore()
    let navigate = useNavigate();


    const SubmitButton = async (e) => {
        e.preventDefault();

        try{
            setLoading("d-block")
            if(confirmPassword !== RegisterForm.password){
                setLoading("d-none");
                return setError("Passwords do not match");
            }
            let res = await RegisterRequest(RegisterForm)
            if(res["status"] === 'success'){
                navigate("/auth/admin/login")
                setLoading("d-none");
                toast.success("Register successfully!");

            }else {
                if(res['status']==="failed"){
                    setLoading("d-none");
                    setError(res['message'])
                }
                if(!IsEmail(RegisterForm.email)){
                    setLoading("d-none");
                    toast.error("Please enter a valid email");
                }
            }
        }catch (err) {
            setLoading("d-none");
            toast.error("An unexpected error occurred. Please try again later.");
        }
    }

    return (
        <>
            <div className={loading}>
                <LoadingSkeleton/>
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
                            <input type="text" className="form-control mb-3" placeholder="Full Name"
                                   defaultValue={RegisterForm.fullName}
                                   onChange={(e) => {
                                       RegisterOnChange('fullName', e.target.value)
                                   }}
                            />
                            <input type="text" className="form-control mb-3" placeholder="email address"
                                   defaultValue={RegisterForm.email}
                                   onChange={(e) => {
                                       RegisterOnChange('email', e.target.value)
                                   }}
                            />
                            <div className="my-4">
                                <h5>Choose Gender</h5>
                                <div className="d-flex gap-3 align-items-center">
                                    <div className="d-flex gap-1 align-items-center">
                                        <input className="" id="male" type="radio" name="gender"
                                               defaultValue="Male"
                                               checked={RegisterForm.gender === 'Male'}
                                               onChange={(e) => {
                                                   RegisterOnChange('gender', e.target.value)
                                               }}
                                        />
                                        <label htmlFor="male">Male</label>
                                    </div>
                                    <div className="d-flex gap-1 align-items-center">
                                        <input className="" id="female" type="radio" name="gender"
                                               defaultValue="Female"
                                               checked={RegisterForm.gender === 'Female'}
                                               onChange={(e) => {
                                                   RegisterOnChange('gender', e.target.value)
                                               }}
                                        />
                                        <label htmlFor="female">Female</label>
                                    </div>
                                </div>
                            </div>
                            <input type="password" className="form-control mb-3" placeholder="password"
                                   defaultValue={RegisterForm.password}
                                   onChange={(e) => {
                                       RegisterOnChange('password', e.target.value)
                                   }}
                            />
                            <input type="password" className="form-control mb-3" placeholder="Confirm password"
                                   defaultValue={confirmPassword}
                                   onChange={(e) => {
                                       setConfirmPassword(e.target.value)
                                   }}
                            />
                            <div className="text-center">
                                <button type="submit" className="btn px-5 btn-success">Sign up</button>
                            </div>
                            <div className="text-center mt-3">
                                <Link to={`/auth/admin/login`}>
                                    Already have an account?
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminRegisterComponent;