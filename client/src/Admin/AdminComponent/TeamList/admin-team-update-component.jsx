import React, {useEffect, useState} from 'react';
import {Link, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import TeamListStore from "../../../store/team-list-store.js";
import FormSkeleton from "../../../skeleton/form-skeleton.jsx";
import LoadingSkeleton from "../../../skeleton/Loading-skeleton.jsx";

const AdminTeamUpdateComponent = () => {
    const [loading, setLoading] = useState('d-none');
    const [ladingSkeleton,setLoadingSkeleton] = useState(true);
    const {UpdateTeamFormData, UpdateTeamOnChange, updateTeamListRequest, UserFilterByTeamListRequest,
        SingleTeamListReadRequest} = TeamListStore();



    const{id} = useParams();

    useEffect(() => {
        (async () => {
            setLoadingSkeleton(true);
            await SingleTeamListReadRequest(id)
            await UserFilterByTeamListRequest()
            setLoadingSkeleton(false);
        })()
    }, [id]);

    const UpdateTeamListButton =async () => {
        setLoading('d-block')
        let {description} = UpdateTeamFormData
        if( description.length !== 200){
            setLoading('d-none')
            return toast.error("Description Can't pay more than 200 or less than 200")
        }
        let res = await updateTeamListRequest(id,UpdateTeamFormData)
        if(res === true){
            setLoading('d-block')
            await UserFilterByTeamListRequest()
            setLoading('d-none')
            toast.success("Update TeamList");
        }
        else{
            setLoading('d-none')
            toast.error("Updated failed TeamList");
        }
    }

    if(ladingSkeleton){
        return <FormSkeleton />
    }

    return (
        <div>
            <div className={loading}>
                <LoadingSkeleton />
            </div>
            <div className="container-fluid py-3">
                <div className="">
                    <div>
                        <Link className="text-dark fw-bold" to={`/auth/admin/team`}>Team page</Link>
                        /<Link className="text-dark" to={`/auth/admin/dashboard`}>Dashboard</Link>
                    </div>
                    <div className="my-4 mx-auto col-lg-8 bg-white rounded shadow">
                        <h5 className="text-center pt-4">Update Team List</h5>
                        <form className={`p-3`}>
                            <input className="form-control mb-3"
                                   type="text" placeholder="Enter Cloudinary or ImgBB image URL"
                                   value={UpdateTeamFormData?.image}
                                   onChange={(e) => {
                                       UpdateTeamOnChange('image', e.target.value)
                                   }}
                            />
                            <input className=" mb-3 form-control"
                                   type="text" placeholder="Enter your name"
                                   value={UpdateTeamFormData?.name}
                                   onChange={(e) => {
                                       UpdateTeamOnChange('name', e.target.value)
                                   }}
                            />
                            <input className=" mb-3 form-control"
                                   type="text" placeholder="Enter your position"
                                   value={UpdateTeamFormData?.position}
                                   onChange={(e) => {
                                       UpdateTeamOnChange('position', e.target.value)
                                   }}
                            />
                            <p className="m-0"
                               style={{color: UpdateTeamFormData?.bio?.length === 100 ? "green" : "red"}}
                            >Characters Count {UpdateTeamOnChange?.bio?.length}</p>
                            <textarea className=" mb-3 form-control"
                                   rows={2} placeholder="Enter your bio"
                                   value={UpdateTeamFormData?.bio}
                                   onChange={(e) => {
                                       UpdateTeamOnChange('bio', e.target.value)
                                   }}
                            />
                            <p className="m-0"
                               style={{color: UpdateTeamFormData?.description?.length === 200 ? "green" : "red"}}
                            >Characters Count {UpdateTeamOnChange?.description?.length}</p>
                            <textarea className=" my-2 form-control"
                                      rows={4} placeholder="Enter up to 200 characters"
                                      value={UpdateTeamFormData?.description}
                                      onChange={(e) => {
                                          UpdateTeamOnChange('description', e.target.value)
                                      }}
                            />
                            <div className="ms-auto mt-3">
                                <button className="btn btn-success px-5" onClick={UpdateTeamListButton}
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

export default AdminTeamUpdateComponent;