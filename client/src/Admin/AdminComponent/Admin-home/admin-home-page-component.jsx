import BlogListStore from "../../../store/blog-list-store.js";
import { useEffect } from "react";
import TeamListStore from "../../../store/team-list-store.js";
import ServiceListStore from "../../../store/service-list-store.js";
import BlogChartComponent from "./blog-chart-component.jsx";
import ServiceChartComponent from "./service-chart-component.jsx";
import CounterListComponent from "./counter-list-component.jsx";
import BlogShowComponent from "./blog-show-component.jsx";

const AdminHomePageComponent = () => {
    const {BlogListFilterByAdminRequest } = BlogListStore();
    const {UserFilterByTeamListRequest} = TeamListStore()
    const {userFilterByServiceListRequest} = ServiceListStore()

    useEffect(() => {
        (async () => {
            await BlogListFilterByAdminRequest();
            await UserFilterByTeamListRequest()
            await userFilterByServiceListRequest()
        })();
    }, [BlogListFilterByAdminRequest]);


    return (
        <div className="px-4 mt-4">
            <CounterListComponent />
            <div className="row">
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <BlogChartComponent />
                </div>
                <div className="col-lg-6 col-md-12 col-sm-12 col-12">
                    <ServiceChartComponent />
                </div>
            </div>
            <BlogShowComponent />
        </div>
    );
};

export default AdminHomePageComponent;
