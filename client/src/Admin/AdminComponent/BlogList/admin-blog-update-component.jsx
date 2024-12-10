import {Link, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import BlogListStore from "../../../store/blog-list-store.js";
import {useEffect} from "react";


const AdminBlogUpdateComponent = () => {
    const {UpdateBlogFormData,UpdateBlogOnChange,BlogListFilterByAdminRequest,
        BlogUpdateRequest,SingleBlogReadRequest,BlogListRequest} = BlogListStore()

    const {blogID} = useParams();

    useEffect(() => {
        (async () =>{
            await BlogListRequest()
            await BlogListFilterByAdminRequest()
            await SingleBlogReadRequest(blogID)
        })()
    }, [blogID]);

    const UpdateBlogListButton =async ()=>{
        let res = await BlogUpdateRequest(blogID,UpdateBlogFormData)

        if(res === true) {
            await BlogListFilterByAdminRequest()
            toast.success("Create new blog list");
        }
        else{
            toast.error("blog list creation  failed");
        }

    }



    return (
        <div>
            <div className="container-fluid py-3">
                <div className="">
                    <div>
                        <Link className="text-dark fw-bold" to={`/auth/admin/blog`}>Blog page</Link>
                        /<Link className="text-dark" to={`/auth/admin/dashboard`}>Dashboard</Link>
                    </div>
                    <div className="my-4 mx-auto col-lg-8 bg-white rounded shadow">
                        <h5 className="text-center pt-4">Update blog post</h5>
                        <form className="p-3">
                            <input className="form-control mb-3"
                                   type="text" placeholder="Enter Cloudinary or ImgBB image URL"
                                   value={UpdateBlogFormData?.img}
                                   onChange={(e) => {UpdateBlogOnChange('img',e.target.value)}}
                            />
                            <input className=" mb-3 form-control"
                                   type="text" placeholder="Enter your blog title"
                                   value={UpdateBlogFormData?.title}
                                   onChange={(e) => {UpdateBlogOnChange('title',e.target.value)}}
                            />
                            <textarea className=" my-2 form-control"
                                      rows={12}  placeholder="Enter up to 400 words"
                                      value={UpdateBlogFormData?.des}
                                      onChange={(e) => {UpdateBlogOnChange('des',e.target.value)}}
                            />
                            <div className="mt-3">
                                <button className="btn btn-success px-5" onClick={UpdateBlogListButton} type={"button"}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminBlogUpdateComponent;