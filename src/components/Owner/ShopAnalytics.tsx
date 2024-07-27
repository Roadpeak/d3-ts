import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ChartComponent from './ChartComponent';
import { useParams } from 'react-router-dom';

interface AnalyticsData {
    dates: string[];
    appointments: Record<string, number>;
    bookings: Record<string, number>;
}

const ShopAnalytics: React.FC = () => {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const { id } = useParams();
    const shopId = id;

    useEffect(() => {
        axios.get(`https://api.discoun3ree.com/api/shop/${shopId}/analytics`)
            .then(response => setData(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, [shopId]);

    if (!data) return <p>Loading...</p>;

    return <ChartComponent data={data} />;
};

export default ShopAnalytics;
