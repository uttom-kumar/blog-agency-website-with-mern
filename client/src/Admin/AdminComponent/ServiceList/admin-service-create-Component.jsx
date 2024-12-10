import {Link} from "react-router-dom";
import toast from "react-hot-toast";
import ServiceListStore from "../../../store/service-list-store.js";



const AdminServiceCreateComponent = () => {
    const{serviceFormData,serviceOnChange,createServiceRequest,userFilterByServiceListRequest,ServiceListReadRequest} = ServiceListStore()



    const CreateBlogListButton =async ()=>{
        if (!serviceFormData?.image || !serviceFormData?.title || !serviceFormData?.des) {
            return toast.error("All fields are required!");
        }
        if(serviceFormData?.des.length !== 250) {
            return toast.error("enter up to 250 words")
        }
        let res = await createServiceRequest(serviceFormData)

        if(res === true) {
            await ServiceListReadRequest()
            await userFilterByServiceListRequest()
            toast.success("Create new blog list");
            serviceOnChange('image', "");
            serviceOnChange('title', "");
            serviceOnChange('des', "");
        }

        else{
            toast.error("blog list creation  failed");
        }

    }
    const ResetButton = () => {
        serviceOnChange('image', "");
        serviceOnChange('title', "");
        serviceOnChange('des', "");
    }



    return (
        <div>
            <div className="container-fluid py-3">
                <div className="">
                    <div>
                        <Link className="text-dark fw-bold" to={`/auth/admin/blog`}>Service page</Link>
                        /<Link className="text-dark" to={`/auth/admin/dashboard`}>Dashboard</Link>
                    </div>
                    <div className="my-4 mx-auto col-lg-8 bg-white rounded shadow">
                        <h5 className="text-center pt-4">Create a new Service post</h5>
                        <form className="p-3">
                            <input className="form-control mb-3"
                                   type="text" placeholder="Enter Cloudinary or ImgBB image URL"
                                   value={serviceFormData?.image}
                                   onChange={(e) => {
                                       serviceOnChange('image', e.target.value)
                                   }}
                            />
                            <input className=" mb-3 form-control"
                                   type="text" placeholder="Enter your blog title"
                                   value={serviceFormData?.title}
                                   onChange={(e) => {
                                       serviceOnChange('title', e.target.value)
                                   }}
                            />
                            <p className="m-0"
                               style={{color: serviceFormData?.des.length === 250 ? "green" : "red"}}
                            >Characters Count {serviceFormData?.des.length}</p>
                            <textarea className=" my-2 form-control"
                                      rows={4} placeholder="Enter up to 250 words"
                                      value={serviceFormData?.des}
                                      onChange={(e) => {
                                          serviceOnChange('des', e.target.value)
                                      }}
                            />
                            <div className="mt-3 d-flex justify-content-between align-items-center">
                                <button className="btn btn-success px-5" onClick={ResetButton}
                                        type={"button"}>Reset
                                </button>
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

export default AdminServiceCreateComponent;