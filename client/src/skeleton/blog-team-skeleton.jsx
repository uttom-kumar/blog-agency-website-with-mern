import Skeleton from "react-loading-skeleton";
import ImagePlaceholder from "../assets/images/image.json";
import Lottie from "lottie-react";



const BlogTeamsSkeleton = (props) => {
    return (
        <div className="bg-white">
            <div className="container py-4 mt-5">
                <div className="row">
                    {
                        Array.from({length: 1}).map((_, i) => (
                            <div key={i} className="col-md-3 p-2 col-lg-3 col-sm-6 col-12">
                                <div className="card shadow-sm h-100 rounded-3 bg-white">
                                    <Lottie className="w-100" animationData={ImagePlaceholder} loop={true}/>
                                    <div className="card-body">
                                        <h1>{props.title || <Skeleton/>}</h1>
                                        <Skeleton count={3}/>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default BlogTeamsSkeleton;