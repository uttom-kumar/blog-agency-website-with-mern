import React, { useState } from "react";
import TeamListStore from "../../../store/team-list-store.js";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const AdminTeamCreateComponent = () => {
    const { teamFormData, teamOnChange, createTeamRequest, UserFilterByTeamListRequest } = TeamListStore();
    const [loading, setLoading] = useState(false);

    const CreateTeamListButton = async () => {
        if (loading) return; // Prevent multiple submissions

        let { description, bio } = teamFormData;

        // Validate description length
        if (description?.length !== 200) {
            return toast.error("Description must be exactly 200 characters long.");
        }

        // Validate bio length
        if (bio?.length !== 100) {
            return toast.error("Bio must be exactly 100 characters long.");
        }

        setLoading(true); // Disable the button during async operation

        // Create team request
        let res = await createTeamRequest(teamFormData);

        // Handle success and failure
        if (res === true) {
            await UserFilterByTeamListRequest();
            toast.success("Team List updated successfully!");

            // Reset form fields
            teamOnChange("image", "");
            teamOnChange("name", "");
            teamOnChange("position", "");
            teamOnChange("bio", "");
            teamOnChange("description", "");
        } else {
            toast.error("Failed to update Team List.");
        }

        setLoading(false); // Re-enable the button
    };

    const ResetButton = () => {
        teamOnChange("image", "");
        teamOnChange("name", "");
        teamOnChange("position", "");
        teamOnChange("bio", "");
        teamOnChange("description", "");
    }





    return (
        <div className="container-fluid py-3">
            <div>
                <div>
                    <Link className="text-dark fw-bold" to={`/auth/admin/blog`}>
                        Team page
                    </Link>
                    /<Link className="text-dark" to={`/auth/admin/dashboard`}>
                    Dashboard
                </Link>
                </div>
                <div className="my-4 mx-auto col-lg-8 bg-white rounded shadow">
                    <h5 className="text-center pt-4">Create Team List</h5>
                    <form className="p-3">
                        <input
                            className="form-control mb-3"
                            type="text"
                            placeholder="Enter Cloudinary or ImgBB image URL"
                            value={teamFormData?.image}
                            onChange={(e) => teamOnChange("image", e.target.value)}
                        />
                        <input
                            className="mb-3 form-control"
                            type="text"
                            placeholder="Enter your name"
                            value={teamFormData?.name}
                            onChange={(e) => teamOnChange("name", e.target.value)}
                        />
                        <input
                            className="mb-3 form-control"
                            type="text"
                            placeholder="Enter your position"
                            value={teamFormData?.position}
                            onChange={(e) => teamOnChange("position", e.target.value)}
                        />
                        <p
                            className="m-0"
                            style={{ color: teamFormData?.bio?.length === 100 ? "green" : "red" }}
                        >
                            Bio Characters Count: {teamFormData?.bio?.length }
                        </p>
                        <textarea
                            className="mb-3 form-control"
                            placeholder="Enter your bio (100 characters)"
                            value={teamFormData?.bio}
                            onChange={(e) => teamOnChange("bio", e.target.value)}
                        />
                        <p
                            className="m-0"
                            style={{ color: teamFormData?.description?.length === 200 ? "green" : "red" }}
                        >
                            Description Characters Count: {teamFormData?.description?.length}
                        </p>
                        <textarea
                            className="my-2 form-control"
                            rows={4}
                            placeholder="Enter your description (200 characters)"
                            value={teamFormData?.description}
                            onChange={(e) => teamOnChange("description", e.target.value)}
                        />
                        <div className="ms-auto mt-4 mb-4 d-flex justify-content-between align-items-center">
                            <button
                                className="btn btn-success px-5"
                                onClick={ResetButton}
                                type="button"
                            >
                                Reset
                            </button>
                            <button
                                className="btn btn-success px-5"
                                onClick={CreateTeamListButton}
                                type="button"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminTeamCreateComponent;
