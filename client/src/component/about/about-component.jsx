import {Link} from "react-router-dom";
import aboutImage from '../../assets/images/hero.png'
import TeamComponent from "../teams/team-component.jsx";
import TeamListStore from "../../store/team-list-store.js";
import {useEffect} from "react";



const AboutComponent = () => {
    const {TeamListReadRequest} = TeamListStore()

    useEffect(() => {
        (async () =>{
            await TeamListReadRequest()
        })()
    }, []);

    return (
        <div>
            <div className="container py-4">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div>
                            <h1 className="fw-bolder text-info">About Us</h1>
                            <p>Since 2018, Help write my resume has helped more than 15 million people worldwide create stronger resumes, navigate their job search, and achieve career fulfillment.</p>
                            <p>
                                Our team of experts is dedicated to helping you every step of the way, from using our tools to create a showstopping resume and cover letter to providing professional interview tips and career guidance.
                            </p>
                            <Link className="btn btn-info" to={`/service`}>See Our Services</Link>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12">
                        <div>
                            <img className="img-fluid" src={aboutImage} alt="about image" />
                        </div>
                    </div>
                </div>
            </div>
            <TeamComponent />
        </div>
    );
};

export default AboutComponent;