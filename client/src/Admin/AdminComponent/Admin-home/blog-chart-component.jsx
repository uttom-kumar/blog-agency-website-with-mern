import BlogListStore from "../../../store/blog-list-store.js";
import TeamListStore from "../../../store/team-list-store.js";
import ServiceListStore from "../../../store/service-list-store.js";
import {useEffect} from "react";
import ReactApexChart from "react-apexcharts";
import BlogChartSkeleton from "../../../skeleton/blog-chart-skeleton.jsx";

const BlogChartComponent = () => {
    const { BlogListFilterAdmin, BlogListFilterByAdminRequest } = BlogListStore();
    const {UserFilterByTeamListRequest} = TeamListStore()
    const {userFilterByServiceListRequest} = ServiceListStore()

    useEffect(() => {
        (async () => {
            await BlogListFilterByAdminRequest();
            await UserFilterByTeamListRequest()
            await userFilterByServiceListRequest()
        })();
    }, []);


    // Preparing data for the chart
    const chartData = BlogListFilterAdmin
        ? {
            series: [
                {
                    name: 'Blog',
                    data: BlogListFilterAdmin?.map((_,index) => index+1 || 0),
                },
            ],
            options: {
                chart: {
                    type: 'line',
                    height: 350,
                },
                stroke: {
                    curve: 'smooth',
                },
                xaxis: {
                    categories: BlogListFilterAdmin?.map((item) =>
                        new Date(item?.createdAt).toLocaleDateString() || "Unknown Date"
                    ), // Human-readable dates for the x-axis
                    title: {
                        text: 'Date',
                    },
                },
                title: {
                    text: 'Blog Views Over Time',
                    align: 'left',
                },
                yaxis: {
                    title: {
                        text: 'Views',
                    },
                },
                tooltip: {
                    x: {
                        format: 'dd MMM yyyy',
                    },
                },
            },
        }
        : null;

    return (
        <div className="mt-4">
            <div className="bg-white rounded p-4">
                {chartData ? (
                    <ReactApexChart
                        options={chartData.options}
                        series={chartData.series}
                        type="line"
                        height={350}
                    />
                ) : (
                    <BlogChartSkeleton />
                )}
            </div>
        </div>
    );
};

export default BlogChartComponent;