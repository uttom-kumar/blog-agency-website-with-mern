import AdminNavbar from "./admin-navbar.jsx";
import AdminDashboard from "./admin-dashboard.jsx";

const AdminLayout = (props) => {

    return (
        <>
            <div className="d-lg-flex d-md-block d-sm-block d-block">
                <div className="col-lg-3 col-md-12 col-sm-12  col-12 left_navbar_side fixed-top">
                    <AdminNavbar/>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12  col-12 ms-lg-auto mt-lg-0 mt-md-5 mt-sm-5 mt-5  ">
                    <AdminDashboard />
                    {props.children}
                </div>
            </div>
        </>
    );
};

export default AdminLayout;