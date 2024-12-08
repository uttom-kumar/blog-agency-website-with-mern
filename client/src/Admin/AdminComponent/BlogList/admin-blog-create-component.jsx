import {Link} from "react-router-dom";
import toast from "react-hot-toast";
import BlogListStore from "../../../store/blog-list-store.js";




const AdminBlogCreateComponent = () => {
    const {BlogFormData,BlogOnChange,BlogListCreateRequest,BlogListFilterByAdminRequest,BlogListRequest} = BlogListStore()


    const CreateBlogListButton =async ()=>{
        if(BlogFormData?.des.length < 500) {
            return toast.error("enter up to 500 words")
        }
        let res = await BlogListCreateRequest(BlogFormData)

        if(res === true) {
            await BlogListRequest()
            await BlogListFilterByAdminRequest()
            toast.success("Create new blog list");
            BlogOnChange('img', "");
            BlogOnChange('title', "");
            BlogOnChange('des', "");
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
                                <button className="btn btn-secondary px-3" type={"reset"}>Reset</button>
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