import React, {useEffect} from 'react';
import {Link, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import TeamListStore from "../../../store/team-list-store.js";

const AdminTeamUpdateComponent = () => {
    const {teamFormData,teamOnChange,updateTeamListRequest,UserFilterByTeamListRequest,TeamListReadRequest} = TeamListStore()
    const{id} = useParams();
    useEffect(() => {
        (async () => {
            await TeamListReadRequest()
            await UserFilterByTeamListRequest()
        })()
    }, [id]);

    const UpdateTeamListButton =async () => {
        let {description} = teamFormData
        if( description.length !== 200){
            return toast.error("Description Can't pay more than 200 or less than 200")
        }
        let res = await updateTeamListRequest(id,teamFormData)
        if(res === true){
            await UserFilterByTeamListRequest()
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
                        <Link className="text-dark fw-bold" to={`/auth/admin/blog`}>Team page</Link>
                        /<Link className="text-dark" to={`/auth/admin/dashboard`}>Dashboard</Link>
                    </div>
                    <div className="my-4 mx-auto col-lg-8 bg-white rounded shadow">
                        <h5 className="text-center pt-4">Update Team List</h5>
                        <form className="p-3">
                            <input className="form-control mb-3"
                                   type="text" placeholder="Enter Cloudinary or ImgBB image URL"
                                   defaultValue={teamFormData?.image}
                                   onChange={(e) => {
                                       teamOnChange('image', e.target.value)
                                   }}
                            />
                            <input className=" mb-3 form-control"
                                   type="text" placeholder="Enter your name"
                                   defaultValue={teamFormData?.name}
                                   onChange={(e) => {
                                       teamOnChange('name', e.target.value)
                                   }}
                            />
                            <input className=" mb-3 form-control"
                                   type="text" placeholder="Enter your position"
                                   defaultValue={teamFormData?.position}
                                   onChange={(e) => {
                                       teamOnChange('position', e.target.value)
                                   }}
                            />
                            <p className="m-0"
                               style={{color: teamFormData.bio.length === 100 ? "green" : "red"}}
                            >Characters Count {teamFormData.bio.length}</p>
                            <textarea className=" mb-3 form-control"
                                   rows={2} placeholder="Enter your bio"
                                   defaultValue={teamFormData?.bio}
                                   onChange={(e) => {
                                       teamOnChange('bio', e.target.value)
                                   }}
                            />
                            <p className="m-0"
                               style={{color: teamFormData.description.length === 200 ? "green" : "red"}}
                            >Characters Count {teamFormData.description.length}</p>
                            <textarea className=" my-2 form-control"
                                      rows={4} placeholder="Enter up to 200 characters"
                                      defaultValue={teamFormData?.description}
                                      onChange={(e) => {
                                          teamOnChange('description', e.target.value)
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