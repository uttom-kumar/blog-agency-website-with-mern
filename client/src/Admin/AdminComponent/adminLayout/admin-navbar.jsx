import {Link} from "react-router-dom";




const AdminNavbar = () => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid d-lg-block">
                        <div className="text-lg-center">
                            <Link to={`/auth/admin/dashboard`}
                                  className="navbar-brand text-info">OnBlogAgency</Link>
                        </div>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mt-lg-5 mx-lg-auto ms-md-auto ms-sm-auto ms-auto d-lg-block mb-2 mb-lg-0 text-lg-center text-md-start text-sm-start text-start">
                                <li className="nav-item">
                                    <Link to={`/auth/admin/dashboard`} className="nav-link active"
                                          aria-current="page">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/auth/admin/blog`} className="nav-link active"
                                          aria-current="page">Blog Post</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/auth/admin/slider`} className="nav-link active"
                                          aria-current="page">Slider Post</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/auth/admin/team`} className="nav-link active"
                                          aria-current="page">Team Post</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={`/auth/admin/service`} className="nav-link active"
                                          aria-current="page">Service Post</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
        </div>
    );
};

export default AdminNavbar;