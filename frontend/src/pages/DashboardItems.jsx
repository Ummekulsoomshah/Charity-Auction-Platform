import React, { useEffect } from 'react'
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import { Line } from "react-chartjs-2";
import { useState } from "react";
import axios from 'axios'
import io from 'socket.io-client';
const socket = io(process.env.REACT_APP_BACKEND_URL, { transports: ['websocket'] });

Chart.register(CategoryScale);

const Graph = ({ chartData }) => {
    return (
        <div className="chart-container w-[70%] h-full">
            <Line
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: " Bids of today"
                        },
                        legend: {
                            display: false
                        }
                    }
                }}
            />
        </div>
    );
};
const DashboardItems = () => {

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Bids',
                data: [],
                borderColor: 'rgba(75,192,192,1)',
                borderWidth: 2,
            }
        ]
    });

    useEffect(() => {
        const fetchData = async () => {
            try {


                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/getTodayBids`, {

                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                console.log(response.data)
                const bids = response.data.bids;

                const labels = bids.map(bidItem => new Date(bidItem.timestamp).toLocaleTimeString());
                const data = bids.map(bidItem => bidItem.bid);
                setChartData({
                    labels,
                    datasets: [
                        {
                            label: "Bids",
                            data,
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 2
                        }
                    ]
                });

            } catch (err) {
                console.log(err, 'error in fetching data')
            }
        }
        fetchData();
        socket.on('updateBid', (newBid) => {
            console.log("newBid",newBid)
            setChartData(prevChartData => {
                const newLabels = [...prevChartData.labels, new Date(newBid.timestamp).toLocaleTimeString()];
                const newData = [...prevChartData.datasets[0].data, newBid.bid];

                return {
                    labels: newLabels,
                    datasets: [
                        {
                            ...prevChartData.datasets[0],
                            data: newData
                        }
                    ]
                };
            });
        });
        return () => {
            socket.off('newBid');
        };
    }, [])
    return (
        <div className="App w-full flex flex-row items-center justify-center">
            <div className="w-full h-[50vh]"> {/* Adjust the height as needed */}
                <Graph chartData={chartData} />
            </div>
        </div>
    )
}

export default DashboardItems
