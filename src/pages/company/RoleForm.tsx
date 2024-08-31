import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Role } from '../../types';
import AdminLayout from '../../utils/layouts/AdminLayout';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getCookie } from '../../utils/cookiUtils';

const RoleForm: React.FC = () => {
    const [role, setRole] = useState<Partial<Role>>({});
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [description, setDescription] = useState<string>('');
    const { id } = useParams<{ id?: string }>();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            setIsEditing(true);
            fetchRole(id);
        }
    }, [id]);

    const fetchRole = async (id: string) => {
        try {
            const response = await axios.get(`https://api.discoun3ree.com/api/roles/${id}`);
            setRole(response.data);
            setDescription(response.data.description || ''); // Set description
        } catch (error) {
            console.error('Error fetching role:', error);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRole({ ...role, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = getCookie('access_token'); 

        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            };

            if (isEditing) {
                await axios.put(`https://api.discoun3ree.com/api/open-roles/${id}`, {
                    ...role,
                    description
                }, config);
            } else {
                await axios.post('https://api.discoun3ree.com/api/open-roles', {
                    ...role,
                    description
                }, config);
            }

            navigate('/roles');
        } catch (error) {
            console.error('Error saving role:', error);
        }
    };

    return (
        <AdminLayout>
            <div className="container mx-auto mt-5">
                <h1 className="text-2xl font-bold mb-4">{isEditing ? 'Edit Role' : 'Create New Role'}</h1>
                <form onSubmit={handleSubmit} className="bg-white p-5 rounded shadow">
                    <div>
                        <label className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={role.title || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700">Description</label>
                        <ReactQuill
                            value={description}
                            onChange={setDescription}
                            className="border rounded"
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700">Salary</label>
                        <input
                            type="number"
                            name="salary"
                            value={role.salary || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700">Start Date</label>
                        <input
                            type="date"
                            name="start_date"
                            value={role.start_date || ''}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-primary text-white px-4 py-1.5 rounded mt-4"
                    >
                        {isEditing ? 'Update Role' : 'Create Role'}
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default RoleForm;
