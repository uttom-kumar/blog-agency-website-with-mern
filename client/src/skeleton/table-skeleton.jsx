import React from 'react';
import Skeleton from "react-loading-skeleton";

const TableSkeleton = (props) => {
    return (
        <div>
            <h1>{props.title || <Skeleton count={10} height={100}/>}</h1>
        </div>
    );
};

export default TableSkeleton;