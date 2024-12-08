import BlogSkeleton from "../../skeleton/blog-skeleton.jsx";
import {Link} from "react-router-dom";
import {convertToLocalTime} from "../../utility/timeStamp.js";
import BlogListStore from "../../store/blog-list-store.js";


const BlogList = () => {
    const {BlogList} = BlogListStore()
    return (
        <div>
            <div className="container my-5">
                <div className="row" >
                    {
                        BlogList === null ? (<BlogSkeleton/>) : (
                            BlogList?.map((item, index) => {
                                return (
                                    <div key={index} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                        <div className="card shadow-sm h-100 rounded-3">
                                            <Link to={`/blogDetails/${item?._id}`}>
                                                <div className="card_img">
                                                    <img className="img-fluid w-100 rounded-top-2" src={item?.img}
                                                         alt="card-img"/>
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
            </div>
        </div>
    );
};

export default BlogList;