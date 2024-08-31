import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Application } from '../../types';

const ApplicationList: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const { roleId } = useParams<{ roleId: string }>();

    useEffect(() => {
        fetchApplications();
    }, [roleId]);

    const fetchApplications = async () => {
        try {
            const response = await axios.get(`/api/roles/${roleId}/applications`);
            setApplications(response.data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Applications</h1>
            <div className="grid grid-cols-1 gap-4">
                {applications.map(app => (
                    <div key={app.id} className="bg-white p-4 rounded shadow mb-2">
                        <h2 className="text-xl font-semibold">{app.first_name} {app.last_name}</h2>
                        <p className="text-gray-600">Email: {app.email}</p>
                        <p className="text-gray-600">Phone: {app.phone}</p>
                        <p className="text-gray-600">Position: {app.position}</p>
                        <p className="text-gray-600">Status: {app.status}</p>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                            onClick={() => window.location.href = `/applications/${app.id}`}
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ApplicationList;
