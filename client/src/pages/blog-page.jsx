
import Layout from "../component/layout/layout.jsx";
import BlogList from "../component/blogs/BlogList.jsx";
import BlogListStore from "../store/blog-list-store.js";
import {useEffect} from "react";

const BlogPage = () => {
    const {BlogListRequest} = BlogListStore()
    useEffect(() => {
        (async () =>{
            await BlogListRequest()
        })()
    }, []);
    return (
        <Layout>
           <BlogList />
        </Layout>
    );
};

export default BlogPage;