import BlogListStore from "../../../store/blog-list-store.js";
import {useEffect, useState} from "react";
import {convertToLocalTime} from "../../../utility/timeStamp.js";
import {Link} from "react-router-dom";
import {FiEdit} from "react-icons/fi";
import {MdDelete} from "react-icons/md";
import NoData from "../../../component/noData/no-data.jsx";
import TableSkeleton from "../../../skeleton/table-skeleton.jsx";
import toast from "react-hot-toast";
import LoadingSkeleton from "../../../skeleton/Loading-skeleton.jsx";
import Zoom from 'react-medium-image-zoom'




const BlogShowComponent = () => {
    const [loading, setLoading] = useState('d-none')
    const {BlogListFilterAdmin, BlogListFilterByAdminRequest, BlogDeleteRequest} = BlogListStore()

    useEffect(() => {
        (async ()=>{
            await BlogListFilterByAdminRequest ()
        })()
    }, []);

    const BlogDeleteButton = async (blogID) => {
        setLoading('d-block');
        await BlogDeleteRequest(blogID);
        await BlogListFilterByAdminRequest();
        setLoading('d-none');
        toast.success("Deleted successfully!");
    };



    return (
        <>
            <div className={loading}>
                <LoadingSkeleton/>
            </div>
            <div className="mt-5">
                <div style={{overflowX: "auto", display: "block", width: "100%", whiteSpace: "nowrap"}}>
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                        <tr>
                            <th>Total</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th className="text-center">Create Date</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                        </thead>
                        {
                            BlogListFilterAdmin?.map((item, i) => (
                                <tbody key={i}>
                                <tr>
                                    <td className="text-center">{i + 1}</td>
                                    <td className="text-center">
                                        <Zoom>
                                            <img className="BlogTable_img" src={item?.img} alt=""
                                            />
                                        </Zoom>
                                    </td>
                                    <td>{item?.title}</td>
                                    <td className="text-center">{convertToLocalTime(item?.createdAt)}</td>
                                    <td className="text-center">
                                        <Link
                                            to={`/auth/admin/updateBlogList/${item._id}`}
                                            className="btn text-info"
                                        >
                                            <FiEdit/>
                                        </Link>
                                    </td>
                                    <td className="text-center">
                                        <button
                                            className="btn text-danger"
                                            onClick={() => BlogDeleteButton(item?._id)}
                                        >
                                            <MdDelete/>
                                        </button>
                                    </td>
                                </tr>
                                </tbody>
                            ))}
                    </table>
                    {BlogListFilterAdmin?.length === 0 && <NoData/>}
                    {BlogListFilterAdmin === null && <TableSkeleton/>}
                </div>
            </div>
        </>
    );
};

export default BlogShowComponent;