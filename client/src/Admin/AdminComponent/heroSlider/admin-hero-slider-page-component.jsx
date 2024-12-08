import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import imgT from '../../../assets/images/hero.png'
import {Link} from "react-router-dom";
import SliderStore from "../../../store/slider-store.jsx";
import {useEffect} from "react";
import toast from "react-hot-toast";

const AdminHeroSliderPageComponent = () => {
    const {userFilterBySliderList,userFilterBySliderListRequest,removeSliderRequest} = SliderStore()

    useEffect(() => {
        (async ()=> {
            await userFilterBySliderListRequest()
        })()
    }, []);

    const DeleteButton = async (id) => {
        await removeSliderRequest(id)
        await userFilterBySliderListRequest()
        toast.success("Delete successfully!");
    }

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center py-3">
                <h5>Slider Post</h5>
                <Link to={`/auth/admin/createSlider`} className="btn btn-info">Create Slider</Link>
            </div>
            <div className="scroll_table">
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead className="thead-dark">
                        <tr>
                            <th></th>
                            <th></th>
                            <th>Heading</th>
                            <th>Title</th>
                            <th className="text-center">Date</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        {
                            userFilterBySliderList?.map((item, i) => {
                                return (
                                    <tbody key={i}>
                                    <tr>
                                        <td className="text-center">{i+1}</td>
                                        <td>
                                            <img className="img-fluid table_img" src={item?.image} alt=""/>
                                        </td>
                                        <td>{item?.heading}</td>
                                        <td>{item?.title}</td>
                                        <td className="text-center">{'02-03-2024'}</td>
                                        <td className="text-center">
                                            <Link to={`/auth/admin/updateSlider/${item?._id}`} className="btn text-info">
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

export default AdminHeroSliderPageComponent;