import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import TeamListStore from "../../../store/team-list-store.js";
import {useEffect} from "react";
import toast from "react-hot-toast";
import {Link} from "react-router-dom";

const AdminTeamPageComponent = () => {
    const {UserFilterByTeamList,UserFilterByTeamListRequest,removeTeamRequest} = TeamListStore()

    useEffect(() => {
        (async ()=> {
            await UserFilterByTeamListRequest()
        })()
    }, []);

    const DeleteButton = async (id) => {
        await removeTeamRequest(id)
        await UserFilterByTeamListRequest()
        toast.success("Delete successfully!");
    }


    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center py-3">
                <h5>Team List</h5>
                <Link to={`/auth/admin/teamCreate`} className="btn btn-info">Create Team</Link>
            </div>
            <div className="scroll_table">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead className="thead-dark text-center">
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Name</th>
                            <th>Position</th>
                            <th className="text-center">Date</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        {
                            UserFilterByTeamList?.map((item, i) => {
                                return (
                                    <tbody key={i} className="text-center">
                                    <tr>
                                        <td className="text-center">{i+1}</td>
                                        <td>
                                            <img className="img-fluid table_img" src={item?.image} alt=""/>
                                        </td>
                                        <td>{item?.name}</td>
                                        <td>{item?.position}</td>
                                        <td className="text-center">{'02-03-2024'}</td>
                                        <td className="text-center">
                                            <Link to={`/auth/admin/teamUpdate/${item?._id}`} className="btn text-info">
                                                <FiEdit/>
                                            </Link>
                                        </td>
                                        <td className="text-center">
                                            <button className="btn text-danger " onClick={() => DeleteButton(item?._id)}>
                                                <MdDelete/>
                                            </button>
                                        </td>
                                    </tr>
                                    </tbody>
                                )
                            })
                        }
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminTeamPageComponent