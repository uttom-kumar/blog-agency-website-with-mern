import React from 'react';
import Skeleton from "react-loading-skeleton";

const FormSkeleton = (props) => {
    return (
        <div className="my-5">
            <div className="mx-auto col-lg-8 p-4 bg-white shadow rounded">
                <h1>{props.title || <Skeleton count={3} height={50} style={{margin:"10px 0"}}/>}</h1>
                <h1>{props.title || <Skeleton count={1} height={250}/>}</h1>
                <div className="d-flex justify-content-between align-items-center">
                    <h1>{props.title || <Skeleton count={1} width={250}/>}</h1>
                    <h1>{props.title || <Skeleton count={1} width={250}/>}</h1>
                </div>
            </div>
        </div>
    );
};

export default FormSkeleton;