import Skeleton from "react-loading-skeleton";



const BlogAboutSkeleton = (props) => {
    return (
        <>
            <div className="container mt-5">
                <div className="row">
                    <div className="card shadow-sm h-100 rounded-3 bg-white">
                        <div className="card-body">
                            <h1>{props.title || <Skeleton/>}</h1>
                            <Skeleton count={20}/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogAboutSkeleton;