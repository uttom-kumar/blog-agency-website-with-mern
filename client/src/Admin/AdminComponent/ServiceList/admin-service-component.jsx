import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import {convertToLocalTime} from "../../../utility/timeStamp.js";
import {Link} from "react-router-dom";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import ServiceListStore from "../../../store/service-list-store.js";
import NoData from "../../../component/noData/no-data.jsx";
import LoadingSkeleton from "../../../skeleton/Loading-skeleton.jsx";
import TableSkeleton from "../../../skeleton/table-skeleton.jsx";


const AdminServiceComponent = () => {
    const [loading, setLoading] = useState('d-none');
    const {userFilterByServiceList,userFilterByServiceListRequest,DeleteServiceRequest} = ServiceListStore()


    useEffect(() => {
        (async ()=> {
            await userFilterByServiceListRequest()
        })()
    }, []);

    const DeleteButton = async (blogID) => {
        setLoading('d-block')
        await DeleteServiceRequest(blogID)
        await userFilterByServiceListRequest()
        setLoading('d-none')
        toast.success("Delete successfully!");
    }



    return (
        <>
            <div className={loading}>
                <LoadingSkeleton />
            </div>
            <div className="px-4 mt-4">
                <div className="d-flex justify-content-between align-items-center py-3">
                    <h5>Service list</h5>
                    <Link to={`/auth/admin/createService`} className="btn btn-success border-0">
                        Create Service List
                    </Link>
                </div>
                <div style={{ overflowX: "auto" ,display: "block",width:"100%",whiteSpace: "nowrap" }}>
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="thead-dark text-center">
                            <tr>
                                <th>Total</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th className="text-center">Date</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            {
                                userFilterByServiceList?.map((item, i) => {
                                    return (
                                        <tbody key={i + 1}>
                                        <tr>
                                            <td className="text-center">{i + 1}</td>
                                            <td className="text-center">
                                                <img className="table_img" src={item?.image} alt=""/>
                                            </td>
                                            <td>{item?.title}</td>
                                            <td className="text-center">{convertToLocalTime(item?.createdAt)}</td>
                                            <td className="text-center">
                                                <Link to={`/auth/admin/updateService/${item._id}`}
                                                      className="btn text-info">
                                                    <FiEdit/>
                                                </Link>
                                            </td>
                                            <td className="text-center">
                                                <button className="btn text-danger"
                                                        onClick={() => DeleteButton(item?._id)}>
                                                    <MdDelete/>
                                                </button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    )
                                })
                            }
                        </table>
                        {userFilterByServiceList?.length === 0 && <NoData/>}
                        {userFilterByServiceList === null && <TableSkeleton/>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminServiceComponent;