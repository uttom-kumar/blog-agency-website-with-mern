import {Link} from "react-router-dom";
import { FaFacebookF } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import { FaLinkedinIn } from "react-icons/fa6";



const AppNavbar = () => {

    const searchBtn = (e) => {
        e.preventDefault();
        toast.success("working now please wait...");
    }



    return (
        <>
            <div className="top_menu bg-light">
                <div className="container py-1">
                    <div className="d-flex justify-content-between">
                        <div className="">
                            <span>
                                <span className="f-12">
                                    <i className="bi bi-envelope"></i> Support@OnBlogAgency.com
                                </span>
                                <span className="f-12 mx-2">
                                    <i className="bi bi-envelope"></i> 01722947932
                                </span>
                            </span>
                        </div>
                        <div className="d-flex gap-4">
                            <Link to={`https://www.facebook.com/uttomkumar0/`} target={`_blank`} className="text-dark"><FaFacebookF/></Link>
                            <Link to="https://www.linkedin.com/in/uttomkumarbarman/" className="text-dark" target={`_blank`}><FaLinkedinIn/></Link>
                        </div>
                    </div>
                </div>
            </div>
            <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <Link to={"/"} className="navbar-brand ">
                        <span className="d-flex align-items-center text-info">OnBlogAgency</span>
                    </Link>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <form className="d-flex m-auto mt-lg-0 mt-md-3 mt-sm-3 mt-3" onSubmit={searchBtn}>
                            <input className="form-control me-2" type="search" placeholder="Search"
                                   aria-label="Search"/>
                            <button className="btn btn-outline-dark" type="submit"><FaSearch/></button>
                        </form>
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active" aria-current="page">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link">
                                    About
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/blog" className="nav-link">
                                    Blog
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/service" className="nav-link">
                                    Service
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link">
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </>
    );
};

export default AppNavbar;