import React, {useEffect} from 'react';
import BlogListStore from "../../../store/blog-list-store.js";
import TeamListStore from "../../../store/team-list-store.js";
import ServiceListStore from "../../../store/service-list-store.js";

const CounterListComponent = () => {
    const { BlogListFilterAdmin, BlogListFilterByAdminRequest } = BlogListStore();
    const {UserFilterByTeamList,UserFilterByTeamListRequest} = TeamListStore()
    const {userFilterByServiceList,userFilterByServiceListRequest} = ServiceListStore()

    useEffect(() => {
        (async () => {
            await BlogListFilterByAdminRequest();
            await UserFilterByTeamListRequest()
            await userFilterByServiceListRequest()
        })();
    }, [BlogListFilterByAdminRequest]);
    return (
        <div>
            <div className="row mb-4 px-2">
                <div className="col-lg-4 col-md-2 col-sm-12 col-12">
                    <div className="bg-white p-3 rounded shadow">
                        <div>
                            <p className="m-0">Blog</p>
                            <p className="m-0 text-end">{BlogListFilterAdmin?.length}</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-2 col-sm-12 col-12">
                    <div className="bg-white p-3 rounded shadow">
                        <div>
                            <p className="m-0">Service</p>
                            <p className="m-0 text-end">{userFilterByServiceList?.length}</p>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-2 col-sm-12 col-12">
                    <div className="bg-white p-3 rounded shadow">
                        <div>
                            <p className="m-0">Team</p>
                            <p className="m-0 text-end">{UserFilterByTeamList?.length}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CounterListComponent;