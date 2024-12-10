import {Link} from "react-router-dom";
import toast from "react-hot-toast";
import SliderStore from "../../../store/slider-store.js";
import {useState} from "react";
import LoadingSkeleton from "../../../skeleton/Loading-skeleton.jsx";

const AdminHeroSliderCreateComponent = () => {
    const [loading, setLoading] = useState('d-none');
    const {sliderFormData,sliderOnChange,createSliderListRequest,BlogSliderListRequest,userFilterBySliderListRequest} = SliderStore()



    const CreateSliderListButton = async () => {
        setLoading('d-block')
        const { heading, title, image, description } = sliderFormData;
        if(!heading || !title || !image) {
            setLoading('d-none')
            return toast.error("Please fill in all required fields")
        }
        if(description.length < 50) {
            setLoading('d-none')
            return toast.error("Description must be at least 50 characters long.")
        }
        setLoading('d-block')
        let res = await createSliderListRequest(sliderFormData)

        if(res === true){
            await BlogSliderListRequest()
            await userFilterBySliderListRequest()
            setLoading('d-none')
            toast.success("Create Slider List");
            sliderOnChange('image', "");
            sliderOnChange('heading', "");
            sliderOnChange('title', "");
            sliderOnChange('description', "");
        }
    }

    const ResetButton = () => {
        sliderOnChange('image', "");
        sliderOnChange('heading', "");
        sliderOnChange('title', "");
        sliderOnChange('description', "");
    }


    return (
        <div>
            <div className={loading}>
                <LoadingSkeleton />
            </div>
            <div className="container-fluid py-3">
                <div className="">
                    <div>
                        <Link className="text-dark fw-bold" to={`/auth/admin/blog`}>Slide page</Link>
                        /<Link className="text-dark" to={`/auth/admin/dashboard`}>Dashboard</Link>
                    </div>
                    <div className="my-4 mx-auto col-lg-8 bg-white rounded shadow">
                        <h5 className="text-center pt-4">Create a new Slider post</h5>
                        <form className="p-3">
                            <input className="form-control mb-3"
                                   type="text" placeholder="Enter Cloudinary or ImgBB image URL"
                                   value={sliderFormData?.image}
                                   onChange={(e) => {sliderOnChange('image', e.target.value)}}
                            />
                            <input className=" mb-3 form-control"
                                   type="text" placeholder="Enter your blog heading"
                                   value={sliderFormData?.heading}
                                   onChange={(e) => {sliderOnChange('heading', e.target.value)}}
                            />
                            <input className=" mb-3 form-control"
                                   type="text" placeholder="Enter your blog title"
                                   value={sliderFormData?.title}
                                   onChange={(e) => {sliderOnChange('title', e.target.value)}}
                            />
                            <textarea className=" my-2 form-control"
                                      rows={4} placeholder="Enter up to 400 words"
                                      value={sliderFormData?.description}
                                      onChange={(e) => {sliderOnChange('description', e.target.value)}}
                            />
                            <div className="ms-auto d-flex justify-content-between align-items-center mt-3">
                                <button className="btn btn-success px-5" onClick={ResetButton}
                                        type={"reset"}>Reset
                                </button>
                                <button className="btn btn-success px-5" onClick={CreateSliderListButton}
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

export default AdminHeroSliderCreateComponent;