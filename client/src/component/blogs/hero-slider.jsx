import {Link} from "react-router-dom";
import BlogSliderSkeleton from "../../skeleton/blog-slider-skeleton.jsx";
import SliderStore from "../../store/slider-store.js";


const HeroSlider = () => {
    const{BlogSliderList} = SliderStore()


    return (
        <>
            <div className="bg-white">
                <div id="carouselExampleDark" className="carousel hero-bg carousel-light slide">
                    <div className="carousel-indicators">
                        {
                            BlogSliderList?.map((item, i) => {
                            return (
                                <button
                                    key={i}
                                    type="button"
                                    data-bs-target="#carouselExampleDark"
                                    data-bs-slide-to={i}
                                    className="active bg-dark"
                                    aria-current="true"
                                    aria-label=""
                                ></button>
                            );
                        })}
                    </div>
                    <div className="carousel-inner">
                        {
                            BlogSliderList === null? <BlogSliderSkeleton /> :
                            BlogSliderList?.map((item, i) => {
                            let active = "carousel-item";
                            if (i === 0) {
                                active = "carousel-item active";
                            }
                            return (
                                <div key={i} className={active} data-bs-interval="10000">
                                    <div className="container">
                                        <div className="row justify-content-center">
                                            <div className="Slider_order2 col-lg-6 col-md-12 col-sm-12 col-12  py-5">
                                                <h3 className="headline-1 fw-bolder">
                                                    {item?.title}
                                                </h3>
                                                <p className="text-dark">{item?.description}</p>

                                                <Link
                                                    to={`/blogDetails/${item?._id}`}
                                                    className="btn text-white btn-info rounded-2 mt-1 px-5"
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
                        })}
                    </div>
                    <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target="#carouselExampleDark"
                        data-bs-slide="prev"
                    >
                        <span className="carousel-control-prev-icon custom-btn" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button
                        className="carousel-control-next btn"
                        type="button"
                        data-bs-target="#carouselExampleDark"
                        data-bs-slide="next"
                    >
                        <span className="carousel-control-next-icon custom-btn" aria-hidden="true" ></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </>
    )
};

export default HeroSlider;