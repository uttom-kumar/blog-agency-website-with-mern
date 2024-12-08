import Layout from "../component/layout/layout.jsx";
import HeroSlider from "../component/blogs/hero-slider.jsx";
import {useEffect} from "react";
import BlogListStore from "../store/blog-list-store.js";
import BlogListComponent from "../component/blogs/blog-list-component.jsx";
import SliderStore from "../store/slider-store.js";

const HomePage = () => {
    const {BlogListRequest} =BlogListStore()
    const {BlogSliderListRequest} = SliderStore()
    useEffect(() => {
        (async () =>{
            await BlogSliderListRequest()
            await BlogListRequest()
        })()
    }, []);
    return (
        <Layout>
            <HeroSlider/>
            <BlogListComponent/>
            <div className=" my-5">
                <section className="container mt-5 py-5 text-center bg-white shadow">
                    <div className="mx-auto col-lg-8  ">
                        <h2 className="mb-3">Subscribe to Our Newsletter</h2>
                        <p className="text-muted mb-4">
                            Stay updated with the latest news and exclusive offers. Enter your
                            email below to subscribe!
                        </p>
                        <div className="row justify-content-center">
                            <div className="col-md-6 col-lg-5">
                                <form className="d-flex gap-2">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter your email"
                                        required
                                    />
                                    <button type="submit" className="btn btnButton">
                                        Subscribe
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default HomePage;