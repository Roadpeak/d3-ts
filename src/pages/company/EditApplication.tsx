import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Application } from '../../types';

const EditApplication: React.FC = () => {
    const [application, setApplication] = useState<Partial<Application>>({});
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        fetchApplication();
    }, []);

    const fetchApplication = async () => {
        try {
            const response = await axios.get(`/api/applications/${id}`);
            setApplication(response.data);
        } catch (error) {
            console.error('Error fetching application:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setApplication({ ...application, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.put(`/api/applications/${id}`, application);
            navigate(`/applications/${id}`);
        } catch (error) {
            console.error('Error updating application:', error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Edit Application Status</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700">Status</label>
                    <input
                        type="text"
                        name="status"
                        value={application.status || ''}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Update Status
                </button>
            </form>
        </div>
    );
};

export default EditApplication;
