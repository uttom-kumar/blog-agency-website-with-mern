import {Link} from "react-router-dom";
import toast from "react-hot-toast";
import BlogListStore from "../../../store/blog-list-store.js";
import {useState} from "react";
import LoadingSkeleton from "../../../skeleton/Loading-skeleton.jsx";




const AdminBlogCreateComponent = () => {
    const {BlogFormData,BlogOnChange,BlogListCreateRequest,BlogListFilterByAdminRequest,BlogListRequest} = BlogListStore()
    const [loading, setLoading] = useState('d-none');

    const CreateBlogListButton =async ()=>{
        setLoading('d-block');
        if(BlogFormData?.des.length < 500) {
            setLoading('d-none');
            return toast.error("enter up to 500 words")
        }
        let res = await BlogListCreateRequest(BlogFormData)
        setLoading('d-none');
        if(res === true) {
            setLoading('d-block')
            await BlogListRequest()
            await BlogListFilterByAdminRequest()
            setLoading('d-none');
            toast.success("Create new blog list");
            BlogOnChange('img', "");
            BlogOnChange('title', "");
            BlogOnChange('des', "");
        }
        else{
            setLoading('d-none');
            toast.error("blog list creation  failed");
        }

    }
    const ResetButton = () => {
        BlogOnChange('img', "");
        BlogOnChange('title', "");
        BlogOnChange('des', "");
    }


    return (
        <div>
            <div className={loading}>
                <LoadingSkeleton />
            </div>
            <div className="container-fluid py-3">
                <div className="">
                    <div>
                        <Link className="text-dark fw-bold" to={`/auth/admin/blog`}>Blog page</Link>
                        /<Link className="text-dark" to={`/auth/admin/dashboard`}>Dashboard</Link>
                    </div>
                    <div className="my-4 mx-auto col-lg-8 bg-white rounded shadow">
                        <h5 className="text-center pt-4">Create a new blog post</h5>
                        <form className="p-3">
                            <input className="form-control mb-3"
                                   type="text" placeholder="Enter Cloudinary or ImgBB image URL"
                                   value={BlogFormData?.img || ""}
                                   onChange={(e) => {
                                       BlogOnChange('img', e.target.value)
                                   }}
                            />
                            <input className=" mb-3 form-control"
                                   type="text" placeholder="Enter your blog title"
                                   value={BlogFormData?.title}
                                   onChange={(e) => {
                                       BlogOnChange('title', e.target.value)
                                   }}
                            />
                            <p className="m-0"
                               style={{color: BlogFormData?.des.length > 500 ? "green" : "red"}}
                            >Characters Count {BlogFormData?.des.length}</p>
                            <textarea className=" my-2 form-control"
                                      rows={4} placeholder="Enter up to 400 words"
                                      value={BlogFormData?.des}
                                      onChange={(e) => {
                                          BlogOnChange('des', e.target.value)
                                      }}
                            />
                            <div className="mt-3 d-flex justify-content-between align-items-center">
                                <button className="btn btn-secondary px-3" type={"reset"}
                                    onClick={ResetButton}
                                >Reset</button>
                                <button className="btn btn-success px-5" onClick={CreateBlogListButton}
                                        type={"button"}>Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminBlogCreateComponent;