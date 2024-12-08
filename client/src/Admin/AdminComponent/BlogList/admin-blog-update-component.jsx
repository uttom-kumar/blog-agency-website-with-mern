import {Link, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import BlogListStore from "../../../store/blog-list-store.js";
import {useEffect} from "react";


const AdminBlogUpdateComponent = () => {
    const {BlogFormData,BlogOnChange,BlogListFilterByAdminRequest,BlogUpdateRequest} = BlogListStore()

    const {blogID} = useParams();

    useEffect(() => {
        (async () =>{
            await BlogListFilterByAdminRequest()
        })()
    }, [blogID]);

    const UpdateBlogListButton =async ()=>{
        let res = await BlogUpdateRequest(blogID,BlogFormData)

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
                                   value={BlogFormData?.img}
                                   onChange={(e) => {BlogOnChange('img',e.target.value)}}
                            />
                            <input className=" mb-3 form-control"
                                   type="text" placeholder="Enter your blog title"
                                   defaultValue={BlogFormData?.title}
                                   onChange={(e) => {BlogOnChange('title',e.target.value)}}
                            />
                            <textarea className=" my-2 form-control"
                                      rows={4}  placeholder="Enter up to 400 words"
                                      defaultValue={BlogFormData?.des}
                                      onChange={(e) => {BlogOnChange('des',e.target.value)}}
                            />
                            <div className="mt-3 d-flex justify-content-between align-items-center">
                                <button className="btn btn-secondary px-3" type={"reset"}>Reset</button>
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