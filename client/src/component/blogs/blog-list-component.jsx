import BlogListStore from "../../store/blog-list-store.js";
import BlogSkeleton from "../../skeleton/blog-skeleton.jsx";
import {convertToLocalTime} from "../../utility/timeStamp.js";
import {Link} from "react-router-dom";



const BlogListComponent = () => {
    const {BlogList} = BlogListStore()


    return (
        <div>
            <div className="container my-5">
                <h2 className="mb-3">Lasted Blog Post</h2>
                <div className="row">
                    {
                        BlogList===null? (<BlogSkeleton />) : (
                            BlogList?.slice(0,6)?.map((item, i) => {
                                return (
                                    <div key={i} className="px-2 py-3 col-lg-4 col-md-6 col-sm-12 col-12">
                                        <div className="card shadow-sm h-100 rounded-3 bg-white">
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
    );
};

export default BlogListComponent;