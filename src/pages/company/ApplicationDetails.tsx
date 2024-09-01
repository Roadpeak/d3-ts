import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Application } from '../../types';

const ApplicationDetails: React.FC = () => {
    const [application, setApplication] = useState<Application | null>(null);
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        fetchApplication();
    }, [id]);

    const fetchApplication = async () => {
        try {
            const response = await axios.get(`/api/applications/${id}`);
            setApplication(response.data);
        } catch (error) {
            console.error('Error fetching application details:', error);
        }
    };

    if (!application) return <p>Loading...</p>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Application Details</h1>
            <p className="mb-4"><strong>First Name:</strong> {application.user.first_name}</p>
            <p className="mb-4"><strong>Last Name:</strong> {application.user.last_name}</p>
            <p className="mb-4"><strong>Email:</strong> {application.user.email}</p>
            <p className="mb-4"><strong>Phone:</strong> {application.user.phone}</p>
            <p className="mb-4"><strong>Position:</strong> {application.open_role.title}</p>
            <p className="mb-4"><strong>Status:</strong> {application.status}</p>
            <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() => window.location.href = `/applications/${application.id}/edit`}
            >
                Edit Status
            </button>
        </div>
    );
};

export default ApplicationDetails;
