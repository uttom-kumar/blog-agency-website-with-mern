import React from 'react';
import Skeleton from "react-loading-skeleton";

const BlogChartSkeleton = (props) => {
    return (
        <div className="container">
            <h1>{props.title || <Skeleton count={1} height={300}/>}</h1>
        </div>
    );
};

export default BlogChartSkeleton;