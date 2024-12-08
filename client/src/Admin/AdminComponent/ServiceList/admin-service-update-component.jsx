import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import ServiceListStore from "../../../store/service-list-store.js";

const AdminServiceUpdateComponent = () => {
    const {serviceFormData,serviceOnChange,updateServiceRequest,ServiceListReadRequest,userFilterByServiceListRequest} = ServiceListStore()

    const{id} = useParams();
    useEffect(() => {
        (async () => {
            await ServiceListReadRequest()
            await userFilterByServiceListRequest()
        })()
    }, [id]);

    const UpdateServiceButton =async () => {
        let {des} = serviceFormData
        if( des.length !== 250){
            return toast.error("Description Can't pay more than 200 or less than 200")
        }
        let res = await updateServiceRequest(id,serviceFormData)
        if(res === true){
            await userFilterByServiceListRequest()
            toast.success("Update TeamList");
        }
        else{
            toast.error("Updated failed TeamList");
        }
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
                        <h5 className="text-center pt-4">Update Team List</h5>
                        <form className="p-3">
                            <input className="form-control mb-3"
                                   type="text" placeholder="Enter Cloudinary or ImgBB image URL"
                                   defaultValue={serviceFormData?.image}
                                   onChange={(e) => {
                                       serviceOnChange('image', e.target.value)
                                   }}
                            />
                            <input className=" mb-3 form-control"
                                   type="text" placeholder="Enter your name"
                                   defaultValue={serviceFormData?.title}
                                   onChange={(e) => {
                                       serviceOnChange('title', e.target.value)
                                   }}
                            />

                            <p className="m-0"
                               style={{color: serviceFormData?.des.length === 250 ? "green" : "red"}}
                            >Characters Count {serviceFormData?.des.length}</p>
                            <textarea className=" my-2 form-control"
                                      rows={4} placeholder="Enter up to 250 characters"
                                      defaultValue={serviceFormData?.des}
                                      onChange={(e) => {
                                          serviceOnChange('des', e.target.value)
                                      }}
                            />
                            <div className="ms-auto mt-3">
                                <button className="btn btn-success px-5" onClick={UpdateServiceButton}
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

export default AdminServiceUpdateComponent;