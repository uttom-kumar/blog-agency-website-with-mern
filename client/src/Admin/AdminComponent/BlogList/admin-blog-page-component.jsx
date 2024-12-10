import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import BlogListStore from "../../../store/blog-list-store.js";
import {convertToLocalTime} from "../../../utility/timeStamp.js";
import {Link} from "react-router-dom";
import toast from "react-hot-toast";
import {useEffect, useState} from "react";
import BlogSkeleton from "../../../skeleton/blog-skeleton.jsx";
import NoData from "../../../component/noData/no-data.jsx";
import TableSkeleton from "../../../skeleton/table-skeleton.jsx";
import LoadingSkeleton from "../../../skeleton/Loading-skeleton.jsx";


const AdminBlogPageComponent = () => {
    const [loading, setLoading] = useState('d-none');
    const {BlogDeleteRequest,BlogListFilterByAdminRequest,BlogListFilterAdmin} = BlogListStore()

    useEffect(() => {
        (async ()=> {
           await BlogListFilterByAdminRequest()
        })()
    }, []);

    const BlogDeleteButton = async (blogID) => {
        setLoading('d-block')
        await BlogDeleteRequest(blogID)
        await BlogListFilterByAdminRequest()
        setLoading('d-none')
        toast.success("Delete successfully!");
    }

    return (
        <>
            <div className={loading}>
                <LoadingSkeleton />
            </div>
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center py-3">
                    <h5>Blog Post</h5>
                    <Link to={`/auth/admin/createBlogList`} className="btn btn-success border-0">
                        Create Blog List
                    </Link>
                </div>
                <div className="scroll_table">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead className="thead-dark">
                            <tr>
                                <th></th>
                                <th></th>
                                <th>Title</th>
                                <th className="text-center">Create Date</th>
                                <th></th>
                                <th></th>
                            </tr>
                            </thead>
                            {
                                BlogListFilterAdmin?.map((item, i) => {
                                    return (
                                        <tbody key={i}>
                                        <tr>
                                            <td className="text-center">{i + 1}</td>
                                            <td className="text-center">
                                                <img className="img-fluid table_img" src={item?.img} alt=""/>
                                            </td>
                                            <td>{item?.title}</td>
                                            <td className="text-center">{convertToLocalTime(item?.createdAt)}</td>
                                            <td className="text-center">
                                                <Link to={`/auth/admin/updateBlogList/${item._id}`}
                                                      className="btn text-info">
                                                    <FiEdit/>
                                                </Link>
                                            </td>
                                            <td className="text-center">
                                                <button className="btn text-danger"
                                                        onClick={() => BlogDeleteButton(item?._id)}>
                                                    <MdDelete/>
                                                </button>
                                            </td>
                                        </tr>
                                        </tbody>
                                    )
                                })
                            }
                        </table>
                        {BlogListFilterAdmin?.length === 0 && <NoData/>}
                        {BlogListFilterAdmin === null && <TableSkeleton/>}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AdminBlogPageComponent;