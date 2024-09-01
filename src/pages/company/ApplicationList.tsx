import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Application } from '../../types';
import AdminLayout from '../../utils/layouts/AdminLayout';

const ApplicationList: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const { roleId } = useParams<{ roleId: string }>();

    useEffect(() => {
        fetchApplications();
    }, [roleId]);

    const fetchApplications = async () => {
        try {
            const response = await axios.get(`https://api.discoun3ree.com/api/applications`);
            setApplications(response.data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    return (
        <AdminLayout>
            <div className="py-6">
                <h1 className="text-2xl font-bold mb-4">Applications</h1>
                <div className="grid grid-cols-1 gap-4">
                    {applications.map(app => (
                        <div key={app.id} className="bg-white p-4 rounded shadow mb-2">
                            <h2 className="text-xl font-semibold">{app.user.first_name} {app.user.last_name}</h2>
                            <p className="text-gray-600">Email: {app.user.email}</p>
                            <p className="text-gray-600">Position: {app.open_role.title}</p>
                            <p className="text-gray-600">Status: {app.status}</p>
                            <p className="text-gray-600">Applied On: {new Date(app.created_at).toLocaleDateString()}</p>
                            <div className="mt-4">
                                <h3 className="text-lg font-medium">Cover Letter</h3>
                                <p className="whitespace-pre-wrap">{app.cover_letter}</p>
                            </div>
                            <a
                                href={`https://api.discoun3ree.com/storage/${app.cv}`}
                                className="bg-blue-500 text-white px-4 py-2 rounded mt-4 inline-block"
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                            >
                                Download CV
                            </a>
                            <button
                                className="bg-gray-500 text-white px-4 py-2 rounded mt-2 ml-4"
                                onClick={() => window.location.href = `/applications/${app.id}`}
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
};

export default ApplicationList;
