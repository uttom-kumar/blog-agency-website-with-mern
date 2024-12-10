import Slider from "react-slick";
import {Link} from "react-router-dom";
import BlogSliderSkeleton from "../../skeleton/blog-slider-skeleton.jsx";
import SliderStore from "../../store/slider-store.js";


const HeroSlider = () => {
    const{BlogSliderList} = SliderStore()
    const settings = {
        className: "",
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        adaptiveHeight: true
    };

    return (
        <div className="slider-container mx-lg-5">
            <Slider {...settings}>
                {
                    BlogSliderList === null ? <BlogSliderSkeleton /> :
                    BlogSliderList?.map((item, i) => {
                        return (
                            <div key={i} className="">
                                <div className="container">
                                    <div className="row justify-content-center">
                                        <div className="Slider_order2 col-lg-6 col-md-12 col-sm-12 col-12  py-5">
                                            <h3 className="headline-1 fw-bolder">
                                                {item?.title}
                                            </h3>
                                            <p className="text-dark">{item?.description}</p>

                                            <Link
                                                to={`/blogDetails/${item?._id}`}
                                                className="btn text-white btn-info rounded-2 mt-1"
                                            >
                                                Read More
                                            </Link>
                                        </div>
                                        <div className="col-lg-6 col-md-12 col-sm-12 col-12 py-5">
                                            <img src={item["image"]} className="Slider_order1 img-fluid" alt="..."/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                }
            </Slider>
        </div>
    );
}

export default HeroSlider;