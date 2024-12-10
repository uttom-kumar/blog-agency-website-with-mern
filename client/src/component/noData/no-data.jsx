import nodataImage from '../../assets/images/no-results.png'

const NoData = () => {
    return (
        <div className="mx-auto col-4">
            <img src={nodataImage} alt="nodata image" className="img-fluid"/>
            <h3 className="text-center text-secondary">data not found</h3>
        </div>
    );
};

export default NoData;