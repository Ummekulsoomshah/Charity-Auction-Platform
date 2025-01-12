import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const Graph = ({ chartData }) => {
    return (
        <div className="chart-container w-full h-full">
            <Bar
                data={chartData}
                options={{
                    plugins: {
                        title: {
                            display: true,
                            text: "Charity Amount Required vs Collected"
                        },
                        legend: {
                            display: false
                        }
                    },
                    maintainAspectRatio: false
                }}
            />
        </div>
    );
};

const BarChart = () => {
    const [chartData, setChartData] = useState({
        labels: ['Required', 'Collected'],
        datasets: [
            {
                label: 'Amount',
                data: [0, 0],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/user/getTotalBids', {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                    }
                });
                const totalBids = response.data.totalBids;
                const requiredAmount = localStorage.getItem('amount') || 10000; // Example required amount

                setChartData({
                    labels: ['Required', 'Collected'],
                    datasets: [
                        {
                            label: 'Amount',
                            data: [requiredAmount, totalBids],
                            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                            borderWidth: 1,
                        },
                    ],
                });
            } catch (err) {
                console.error('Error fetching data', err);
            }
        };

        fetchData();
        socket.on('updateRequiredAmount', (newRequiredAmount) => {
            setChartData((prevChartData) => ({
                labels: ['Required', 'Collected'],
                datasets: [
                    {
                        ...prevChartData.datasets[0],
                        data: [newRequiredAmount, prevChartData.datasets[0].data[1]],
                    },
                ],
            }));
        });
        socket.on('updateBid', (newBid) => {
            setChartData(prevChartData => {
                const totalBids = prevChartData.datasets[0].data[1] + Number(newBid.bid);
                const requiredAmount = localStorage.getItem('amount') || 10000;

                return {
                    labels: ['Required', 'Collected'],
                    datasets: [
                        {
                            label: 'Amount',
                            data: [requiredAmount, totalBids],
                            backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)'],
                            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)'],
                            borderWidth: 1,
                        },
                    ],
                };
            });
        });


        return () => {
            socket.off('newBid');
        };
    }, []);

    return (
        <div className="App w-full flex flex-row items-center justify-center">
            <div className="w-full h-[50vh]"> {/* Adjust the height as needed */}
                <Graph chartData={chartData} />
            </div>
        </div>
    );
};

export default BarChart;