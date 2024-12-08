import ServiceListStore from "../../store/service-list-store.js";
import BlogSkeleton from "../../skeleton/blog-skeleton.jsx";


const ServiceListComponent = () => {
    const {ServiceList} = ServiceListStore()
    return (
        <div>
            <div className="container py-5">
                <h3 className="text-center mb-4">Our Services</h3>
                <div className="row">
                    {
                        ServiceList===null?(<BlogSkeleton />):(
                            ServiceList?.map((item,i)=>{
                                return (
                                    <div key={i} className="col-lg-4 col-md-6 col-sm-12 col-12 mt-3">
                                        <div className="card h-100">
                                            <div className="card_img">
                                                <img className="card-img-top img-fluid" src={item?.image}
                                                     alt="cardImage"/>
                                            </div>
                                            <div className="card-body text-center">
                                                <p className="card-title">{item?.title}</p>
                                                <p className="card-title">{item?.des}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )
                    }
                </div>
                <div>
                    <iframe
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ServiceListComponent;