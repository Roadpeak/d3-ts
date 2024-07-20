import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Event {
    id: number;
    name: string;
    regular_price: number;
    image_url: string;
    vip_price: number | null;
    vvip_price: number | null;
}

const EventSection: React.FC = () => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('https://api.discoun3ree.com/api/events');
            setEvents(response.data);
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    return (
        <div className='bg-gray-100 px-[5%] py-8 flex flex-col '>
            {events.length !== 0 && (
                <p className="text-gray-700 font-medium text-[20px] mb-1">Featured events</p>
            )}
            {events.length === 0 ? (
                null
            ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2">
                    {events.map((event) => (
                        <div key={event.id} className="flex flex-col p-2.5 bg-white rounded-md border border-gray-100 hover:shadow-md">
                            <img src={event.image_url} className='rounded-md' alt="" />
                            <h2 className="text-lg font-semibold mb-2">{event.name}</h2>
                            <p>Starts  @kes. {event.regular_price}</p>
                            <div className="flex items-center w-full gap-2">
                                <button className="w-full items-center py-1.5 border text-center rounded-md text-[14px] font-light mx-auto ">Buy</button>
                                <button className="w-full items-center py-1.5 border text-center rounded-md text-[14px] font-light mx-auto ">Details</button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default EventSection;
