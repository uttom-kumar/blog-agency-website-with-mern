import Skeleton from "react-loading-skeleton";
import Lottie from "lottie-react";
import ImagePlaceholder from '../assets/images/image.json'



const BlogContactSkeleton = (props) => {
    return (
        <>
            <div className="container bg-white rounded shadow p-5 mt-5">
                <div className="row align-items-center">
                    <div className="col-6">
                        <div className="card-body">
                            <h1>{props.title || <Skeleton/>}</h1>
                            <h1>{props.title || <Skeleton/>}</h1>
                            <h1 >{props.title || <Skeleton style={{height: "250px"}}/>}</h1>
                            <h1 >{props.title || <Skeleton style={{height: "50px", width:"50%"}}/>}</h1>
                        </div>
                    </div>
                    <div className="col-6">
                    <Lottie className="w-75" animationData={ImagePlaceholder} loop={true}/>
                </div>
                </div>
            </div>
        </>
    );
};

export default BlogContactSkeleton;