import loadingImg from '../assets/images/Dual Ring@1x-1.0s-200px-200px (2).svg';

const LoadingSkeleton = () => {
    return (
        <div className="loading_overlay">
            <img className="loadingImg" src={loadingImg} alt="Loading..." />
        </div>
    );
};

export default LoadingSkeleton;
