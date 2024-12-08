import Layout from "../component/layout/layout.jsx";
import BlogDetails from "../component/blogs/blog-details.jsx";
import BlogListStore from "../store/blog-list-store.js";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import ServiceListComponent from "../component/services/service-list-component.jsx";


const BlogDetailsPage = () => {
    const{BlogListDetailsRequest,BlogListRequest} = BlogListStore()

    let {blogID} = useParams()

    useEffect(()=>{
        (async () =>{
            await BlogListDetailsRequest(blogID)
            await BlogListRequest()
        })()
    },[])


    return (
        <Layout>
            <BlogDetails />
            <ServiceListComponent />
        </Layout>
    );
};

export default BlogDetailsPage;