import {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import ServiceListStore from "../../../store/service-list-store.js";
import LoadingSkeleton from "../../../skeleton/Loading-skeleton.jsx";
import FormSkeleton from "../../../skeleton/form-skeleton.jsx";

const AdminServiceUpdateComponent = () => {
    const [loading, setLoading] = useState('d-none');
    const [loadingSkeleton,setLoadingSkeleton] = useState(true);
    const {UpdateServiceFormData,UpdateServiceOnChange,updateServiceRequest,ServiceListReadRequest,
        userFilterByServiceListRequest, SingleServiceListReadRequest} = ServiceListStore()

    const{id} = useParams();

    useEffect(() => {
        (async () => {
            setLoadingSkeleton(true);
            await SingleServiceListReadRequest(id)
            await ServiceListReadRequest()
            await userFilterByServiceListRequest()
            setLoadingSkeleton(false);
        })()
    }, [id]);

    const UpdateServiceButton =async () => {
        setLoading('d-block')
        let {des} = UpdateServiceFormData
        if( des.length !== 250){
            setLoading('d-none')
            return toast.error("Description Can't pay more than 200 or less than 200")
        }
        let res = await updateServiceRequest(id,UpdateServiceFormData)
        if(res === true){
            setLoading('d-block')
            await userFilterByServiceListRequest()
            setLoading('d-none')
            toast.success("Update TeamList");
        }
        else{
            setLoading('d-none')
            toast.error("Updated failed TeamList");
        }
    }


    if(loadingSkeleton){
        return <FormSkeleton />
    }


    return (
        <div>
            <div className={loading}>
                <LoadingSkeleton/>
            </div>
            <div className="container-fluid py-3">
                <div className="">
                    <div>
                        <Link className="text-dark fw-bold" to={`/auth/admin/service`}>Service page</Link>
                        /<Link className="text-dark" to={`/auth/admin/dashboard`}>Dashboard</Link>
                    </div>
                    <div className="my-4 mx-auto col-lg-8 bg-white rounded shadow">
                        <h5 className="text-center pt-4">Update Team List</h5>
                        <form className="p-3">
                            <input className="form-control mb-3"
                                   type="text" placeholder="Enter Cloudinary or ImgBB image URL"
                                   value={UpdateServiceFormData?.image}
                                   onChange={(e) => {
                                       UpdateServiceOnChange('image', e.target.value)
                                   }}
                            />
                            <input className=" mb-3 form-control"
                                   type="text" placeholder="Enter your name"
                                   value={UpdateServiceFormData?.title}
                                   onChange={(e) => {
                                       UpdateServiceOnChange('title', e.target.value)
                                   }}
                            />

                            <p className="m-0"
                               style={{color: UpdateServiceFormData?.des?.length === 250 ? "green" : "red"}}
                            >Characters Count {UpdateServiceOnChange?.des?.length}</p>
                            <textarea className=" my-2 form-control"
                                      rows={4} placeholder="Enter up to 250 characters"
                                      value={UpdateServiceFormData?.des}
                                      onChange={(e) => {
                                          UpdateServiceOnChange('des', e.target.value)
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