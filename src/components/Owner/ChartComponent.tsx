import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartData
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

interface ChartProps {
    data: {
        dates: string[];
        appointments: Record<string, number>;
        bookings: Record<string, number>;
    };
}

const ChartComponent: React.FC<ChartProps> = ({ data }) => {
    const chartData: ChartData<'line'> = {
        labels: data.dates,
        datasets: [
            {
                label: 'Appointments (services)',
                data: data.dates.map(date => data.appointments[date] || 0),
                borderColor: 'rgba(75,192,192,1)',
                fill: false,
            },
            {
                label: 'Bookings (Offers)',
                data: data.dates.map(date => data.bookings[date] || 0),
                borderColor: 'rgba(153,102,255,1)',
                fill: false,
            },
        ],
    };

    return <Line data={chartData} />;
};

export default ChartComponent;
