import SliderStore from "../../../store/slider-store.js";
import toast from "react-hot-toast";
import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";

const AdminHeroSliderUpdateComponent = () => {
    const {UpdateSliderFormData, UpdateSliderOnChange, BlogSliderListRequest,
        userFilterBySliderListRequest, updateSliderListRequest, SingleSliderListReadRequest} = SliderStore()

    const {id} = useParams();

    useEffect(() => {
        (async () => {
            await SingleSliderListReadRequest(id)
            await userFilterBySliderListRequest()
        })()
    }, [id]);

    const UpdateSliderListButton = async () => {

        let res = await updateSliderListRequest(id,UpdateSliderFormData)
        if(res === true){
            await BlogSliderListRequest()
            await userFilterBySliderListRequest()
            toast.success("Update Slider List");
        }
    }
    return (
        <div>
            <div className="container-fluid py-3">
                <div className="">
                    <div>
                        <Link className="text-dark fw-bold" to={`/auth/admin/slider`}>Slide page</Link>
                        /<Link className="text-dark" to={`/auth/admin/dashboard`}>Dashboard</Link>
                    </div>
                    <div className="my-4 mx-auto col-lg-8 bg-white rounded shadow">
                        <h5 className="text-center pt-4">Update Slider post</h5>
                        <form className="p-3">
                            <input className="form-control mb-3"
                                   type="text" placeholder="Enter Cloudinary or ImgBB image URL"
                                   value={UpdateSliderFormData?.image}
                                   onChange={(e) => {UpdateSliderOnChange('image', e.target.value)}}
                            />
                            <input className=" mb-3 form-control"
                                   type="text" placeholder="Enter your blog heading"
                                   value={UpdateSliderFormData?.heading}
                                   onChange={(e) => {UpdateSliderOnChange('heading', e.target.value)}}
                            />
                            <input className=" mb-3 form-control"
                                   type="text" placeholder="Enter your blog title"
                                   value={UpdateSliderFormData?.title}
                                   onChange={(e) => {UpdateSliderOnChange('title', e.target.value)}}
                            />
                            <textarea className=" my-2 form-control"
                                      rows={4} placeholder="Enter up to 400 words"
                                      value={UpdateSliderFormData?.description}
                                      onChange={(e) => {UpdateSliderOnChange('description', e.target.value)}}
                            />
                            <div className="ms-auto mt-3">
                                <button className="btn btn-success px-5" onClick={UpdateSliderListButton}
                                        type={"button"}>Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AdminHeroSliderUpdateComponent;