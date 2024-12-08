import Layout from "../component/layout/layout.jsx";
import ServiceListComponent from "../component/services/service-list-component.jsx";
import ServiceListStore from "../store/service-list-store.js";
import {useEffect} from "react";

const ServicePage = () => {
    const {ServiceListReadRequest} = ServiceListStore()

    useEffect(() => {
        (async () =>{
            await ServiceListReadRequest()
        })()
    },[])

    return (
        <Layout>
            <ServiceListComponent />
        </Layout>
    );
};

export default ServicePage;