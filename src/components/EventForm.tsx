import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import AdminLayout from '../utils/layouts/AdminLayout';

const EventForm: React.FC = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [location, setLocation] = useState('');
    const [numberOfTickets, setNumberOfTickets] = useState(0);
    const [groupSize, setGroupSize] = useState<number | null>(null);
    const [imageUrl, setImageUrl] = useState('');
    const [loading, setLoading] = useState(false);

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
                start_time: startTime,
                end_time: endTime,
                location,
                number_of_tickets: numberOfTickets,
                group_size: groupSize,
                image_url: imageUrl,
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            // console.log('Event created:', response.data);
        } catch (error) {
            console.error('Error creating event:', error);
        }
    };

    return (
        <AdminLayout>
            <p className="mb-3 text-gray-800 font-medium text-[20px]">Add an event</p>
            <form onSubmit={handleSubmit} className="mx-auto p-6 bg-white rounded-lg">
                <div className="mb-4">
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
                <div className="w-full flex gap-4 items-center ">
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
                <div className="flex items-center w-full gap-4">
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
                    {imageUrl && <p className="text-sm text-green-500">Image uploaded: {imageUrl}</p>}
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
