import React from 'react';
import Layout from "../component/layout/layout.jsx";
import page404 from '../assets/images/404.svg'



const NoFoundPage = () => {
    return (
        <Layout>
            <div className="mx-auto col-4 py-5 ">
                <img className="img-fluid" src={page404} alt="404"/>
                <h1 className="fw-bolder fs-1">পেজটি খুঁজে পাওয়া যায়নি!</h1>
            </div>
        </Layout>
    );
};

export default NoFoundPage;