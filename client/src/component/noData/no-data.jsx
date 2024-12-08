import nodataImage from '../../assets/images/no-results.png'

const NoData = () => {
    return (
        <div className="mx-auto col-6">
            <img src={nodataImage} alt="nodata image" className="img-fluid"/>
        </div>
    );
};

export default NoData;