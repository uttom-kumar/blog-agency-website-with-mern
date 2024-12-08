import {Link, useNavigate} from "react-router-dom";
import {Dropdown} from "react-bootstrap";
import imgT from "../../../assets/images/hero.png";
import AdminStore from "../../../store/admin-store.js";
import toast from "react-hot-toast";


const AdminDashboard = () => {
    const {LogOutRequest} = AdminStore()
    const navigate = useNavigate();


    const logoutButton =async () => {
        let res = await LogOutRequest()
        if(res === true) {
            navigate('/auth/admin/login')
            toast.success("Log Out successfully!");
        }
    }
    return (
        <div className="sticky-top">
            <div className="container-fluid">
                <div>
                    <div className="d-flex justify-content-between align-items-center px-2 bg-white">
                        <div>
                            <Link to={`/auth/admin/dashboard`}>DashBoard</Link>
                        </div>
                        <div>
                            <Dropdown>
                                <Dropdown.Toggle variant="" id="dropdown-basic" className="btn-outline-none border-0">
                                    <img className="profile_img  rounded-circle" src={imgT} alt=""/>
                                </Dropdown.Toggle>
                                <Dropdown.Menu className="text-center">
                                    <Dropdown.Item>
                                        <button className="btn btn-outline-none text-danger border-0" type="button" onClick={logoutButton}>Logout</button>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;