import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const PieChartContactWeek = () => {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('http://localhost:5065/api/ContactChartForm/ChartDataForWeek');
            const { data } = response;

            if (Array.isArray(data) && data.length > 0) {
                const chartData = {
                    labels: data.map((item) => item.label),
                    datasets: [
                        {
                            data: data.map((item) => item.value),
                            backgroundColor: ['#FF6384', '#36A2EB'],
                            hoverBackgroundColor: ['#FF6384', '#36A2EB'],
                        },
                    ],
                };
                setChartData(chartData);
            } else {
                // Xử lý trường hợp không có dữ liệu trả về
                setChartData(null);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h3 style={{ textAlign: 'center' }}>Week</h3>
            <div style={{height:400}}>

            {chartData ? <Pie data={chartData} /> : <p>No data available.</p>}

            </div>
        </div>
    );
};

export default PieChartContactWeek;
