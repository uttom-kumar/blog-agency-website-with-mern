import ServiceListStore from "../../../store/service-list-store.js";
import {useEffect} from "react";
import ReactApexChart from "react-apexcharts";
import BlogChartSkeleton from "../../../skeleton/blog-chart-skeleton.jsx";

const ServiceChartComponent = () => {
    const {userFilterByServiceList,userFilterByServiceListRequest} = ServiceListStore()

    useEffect(() => {
        (async () => {
            await userFilterByServiceListRequest()
        })();
    }, []);


    // Preparing data for the chart
    const chartData = userFilterByServiceList
        ? {
            series: [
                {
                    name: 'Service', // Label for the data series
                    data: userFilterByServiceList?.map((_,index) => index+1 || 0), // Views data
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
                    categories: userFilterByServiceList?.map((item) =>
                        new Date(item?.createdAt).toLocaleDateString() || "Unknown Date"
                    ), // Human-readable dates for the x-axis
                    title: {
                        text: 'Date',
                    },
                },
                title: {
                    text: 'Service Views Over Time',
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

export default ServiceChartComponent;