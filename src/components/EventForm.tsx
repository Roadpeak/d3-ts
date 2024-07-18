import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import AdminLayout from '../utils/layouts/AdminLayout';
import { useParams } from 'react-router-dom';

const EventForm: React.FC = () => {
    const [name, setName] = useState('');
    const [organizer, setOrganizer] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');
    const [numberOfTickets, setNumberOfTickets] = useState(0);
    const [groupSize, setGroupSize] = useState<number | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [regular, setRegular] = useState<number>(0);
    const [vip, setVip] = useState<number>(0);
    const [vvip, setVvip] = useState<number>(0);
    const { id } = useParams();

    const handleImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setLoading(true);
            try {
                const formData = new FormData();
                formData.append('image', file);

                const response = await axios.post('https://api.discoun3ree.com/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setImageUrl(response.data.url);
            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://api.discoun3ree.com/api/events', {
                name,
                description,
                organizer,
                start_time: startTime,
                end_time: endTime,
                location,
                number_of_tickets: numberOfTickets,
                group_size: groupSize,
                image_url: imageUrl,
                shop_id: id,
                regular_price: regular,
                vip_price: vip,
                vvip_price: vvip,

            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            console.log(response.data);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <AdminLayout>
            <p className="mb-3 text-gray-800 font-medium text-[20px]">Add an event</p>
            <form onSubmit={handleSubmit} className="mx-auto p-6 bg-white rounded-lg">
                <div className="flex flex-col md:flex-row gap-4 w-full">
                    <div className="mb-4 w-full">
                        <label className="block text-gray-600 text-sm font-light mb-1" htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            placeholder='Enter name of event'
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 outline-none focus:border-primary text-[14px] rounded"
                            required
                        />
                    </div>
                    <div className="mb-4 w-full">
                        <label className="block text-gray-600 text-sm font-light mb-1" htmlFor="name">Event Organizer</label>
                        <input
                            type="text"
                            id="organizer"
                            value={organizer}
                            placeholder='Who is organizing this event?'
                            onChange={(e) => setOrganizer(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 outline-none focus:border-primary text-[14px] rounded"
                            required
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-light mb-1" htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        placeholder='More about the event'
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 outline-none focus:border-primary text-[14px] rounded"
                    />
                </div>
                <div className="w-full flex flex-col md:flex-row gap-4 items-center">
                    <div className="w-full mb-4">
                        <label className="block text-gray-600 text-sm font-light mb-1" htmlFor="startTime">Start Time</label>
                        <input
                            type="datetime-local"
                            id="startTime"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 outline-none focus:border-primary text-[14px] rounded"
                            required
                        />
                    </div>
                    <div className="w-full mb-4">
                        <label className="block text-gray-600 text-sm font-light mb-1" htmlFor="endTime">End Time</label>
                        <input
                            type="datetime-local"
                            id="endTime"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-200 outline-none focus:border-primary text-[14px] rounded"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-light mb-1" htmlFor="location">Location</label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        placeholder='Where will it be held'
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 outline-none focus:border-primary text-[14px] rounded"
                    />
                </div>
                <div className="flex flex-col md:flex-row items-center w-full gap-4">
                    <div className="w-full mb-4">
                        <label className="block text-gray-600 text-sm font-light mb-1" htmlFor="numberOfTickets">Number of Tickets</label>
                        <input
                            type="number"
                            id="numberOfTickets"
                            value={numberOfTickets}
                            placeholder='Maximum number of tickets'
                            onChange={(e) => setNumberOfTickets(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-gray-200 outline-none focus:border-primary text-[14px] rounded"
                            required
                        />
                    </div>
                    <div className="w-full mb-4">
                        <label className="block text-gray-600 text-sm font-light mb-1" htmlFor="groupSize">Group Size</label>
                        <input
                            type="number"
                            id="groupSize"
                            placeholder='If groups, enter group size'
                            value={groupSize || ''}
                            onChange={(e) => setGroupSize(e.target.value ? Number(e.target.value) : null)}
                            className="w-full px-3 py-2 border border-gray-200 outline-none focus:border-primary text-[14px] rounded"
                        />
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-light mb-1" htmlFor="image">Image</label>
                    <input
                        type="file"
                        id="image"
                        placeholder='Upload event banner.'
                        onChange={handleImageChange}
                        className="w-full px-3 py-2 border border-gray-200 outline-none focus:border-primary text-[14px] rounded"
                    />
                    {loading && <p className="text-sm text-gray-500">Uploading...</p>}
                    {imageUrl && <img src={imageUrl} className='' />}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-light mb-1">Ticket Prices <br /> <span className="text-[13px] text-gray-500">Note: If you have only one package for tickets, please fill in the regular one.</span></label>
                    <div className="flex w-full flex-col md:flex-row gap-4">
                        <div className="flex flex-col w-full">
                            <label className="text-gray-500 text-[13px] font-light">Regular</label>
                            <input
                                type="number"
                                value={regular}
                                onChange={(e) => setRegular(Number(e.target.value))}
                                className="px-3 py-2 border border-gray-200 outline-none focus:border-primary text-[14px] rounded"
                                required
                            />
                        </div>
                        <div className="flex flex-col w-full ">
                            <label className="text-gray-500 text-[13px] font-light">VIP</label>
                            <input
                                type="number"
                                value={vip}
                                onChange={(e) => setVip(Number(e.target.value))}
                                className="px-3 py-2 border border-gray-200 outline-none focus:border-primary text-[14px] rounded"
                                required
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <label className="text-gray-500 text-[13px] font-light">VVIP</label>
                            <input
                                type="number"
                                value={vvip}
                                onChange={(e) => setVvip(Number(e.target.value))}
                                className="px-3 py-2 border border-gray-200 outline-none focus:border-primary text-[14px] rounded"
                                required
                            />
                        </div>
                    </div>
                </div>
                <button
                    type="submit"
                    className="bg-primary hover:bg-red-700 text-white text-[14px] py-2 px-4 rounded"
                >
                    Create Event
                </button>
            </form>
        </AdminLayout>
    );
};

export default EventForm;
