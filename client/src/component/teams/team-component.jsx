import Slider from "react-slick";
import TeamListStore from "../../store/team-list-store.js";
import BlogTeamSkeleton from "../../skeleton/blog-team-skeleton.jsx";
import NoData from "../noData/no-data.jsx";


const TeamComponent =() =>{
    const{TeamList} = TeamListStore()

    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1368,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 1
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    if(TeamList===null){
        return <BlogTeamSkeleton />
    }
    else if(TeamList.length === 0){
        return <NoData />
    }
    else{
        return (
            <>
                <div className="container my-5">
                    <h3 className="text-center">Our Team</h3>
                    <div className="row">
                        <Slider {...settings}>
                            {TeamList?.map((item, i) => (
                                <div key={i} className="p-3">
                                    <div className="card bg-transparent border-0 team_card  h-100 p-2">
                                        <div className="text-center Team_img">
                                            <img src={item?.image} className="img-fluid" alt={name}/>
                                        </div>
                                        <div className="card-body bg-white team_body text-center text-secondary">
                                            <h3 className="m-0 ">{item?.name}</h3>
                                            <p className="m-0 ">{item?.position}</p>
                                            <p className="m-0 ">{item?.bio}</p>
                                            <p className="m-0 mt-2 ">{item?.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </>
        );
    }
}

export default TeamComponent;