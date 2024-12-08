import BlogListStore from "../../store/blog-list-store.js";
import BlogSkeleton from "../../skeleton/blog-skeleton.jsx";
import {Link, useParams} from "react-router-dom";
import {convertToLocalTime} from "../../utility/timeStamp.js";
import {useEffect} from "react";


const BlogDetails = () => {
    const{BlogListDetails,BlogList,BlogListDetailsRequest} = BlogListStore()

    const {blogID} = useParams()

    useEffect(() => {
        (async () => {
           await BlogListDetailsRequest(blogID)
        })()
    }, [blogID]);

    return (
        <>
            <div className="container my-5">
                {
                    BlogListDetails?.map((item, i) => {
                        console.log(item)
                        return (
                            <div className="card py-4" key={i}>
                                <div className=" col-lg-6 col-md-8 col-sm-12 col-12 mx-auto">
                                    <img src={item.img} className="details_img" alt='img'/>
                                </div>
                                <div className="card-body">
                                    <div className="d-flex gap-2 align-items-center text-secondary">
                                        <p><span>Admin :</span> {item?.user?.fullName}</p>
                                        <p>Date : {convertToLocalTime(item?.createdAt)}</p>
                                    </div>
                                    <h5>{item?.title}</h5>
                                    <p>{item?.des}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <div className="container my-5">
                    <h2 className="mb-3">Related Post</h2>
                    <div className="row">
                        {
                            BlogList === null ? (<BlogSkeleton/>) : (
                                BlogList?.map((item, index) => {
                                    return (
                                        <div key={index} className="px-2 py-3 col-lg-4 col-md-6 col-sm-12 col-12">
                                            <div className="card shadow-sm h-100 bg-white">
                                                <Link to={`/blogDetails/${item?._id}`}>
                                                    <div className="card_img">
                                                        <img className="img-fluid w-100 rounded-top-2" src={item?.img}
                                                             alt=""/>
                                                    </div>
                                                </Link>
                                                <div className="card-body">
                                                    <div className="d-flex justify-content-between">
                                                        <p style={{fontSize: "14px"}}>{item?.user?.fullName}</p>
                                                        <p style={{fontSize: "14px"}}>
                                                            {convertToLocalTime(item?.createdAt)}
                                                        </p>
                                                    </div>
                                                    <Link to={`/blogDetails/${item?._id}`} className="">
                                                        <h6 className="fw-blod text-dark my-1">{item?.title.slice(0, 40)} </h6>
                                                    </Link>
                                                    <p className="bodyMedium text-dark my-1">{item?.des.slice(0, 100)}...</p>

                                                    <Link to={`/blogDetails/${item?._id}`} className="text-info">Read
                                                        More</Link>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })
                            )
                        }
                    </div>
                    <Link to={`/blog`} className="btn btn-info mt-5">Show More Blogs</Link>
                </div>
            </div>
        </>
    );
};

export default BlogDetails;