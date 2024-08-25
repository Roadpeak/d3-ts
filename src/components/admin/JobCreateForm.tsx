import React, { useState } from 'react';
import AdminLayout from '../../utils/layouts/AdminLayout';
import SideMenu from './SideMenu';
import axiosInstance from '../../services/axiosInstance';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const JobCreateForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [salary, setSalary] = useState<number | undefined>(undefined);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        axiosInstance.post('/jobs', { title, description, salary })
            .then(response => {
                console.log('Job created successfully', response.data);
                setTitle('');
                setDescription('');
                setSalary(undefined);
            })
            .catch(error => {
                console.error("There was an error creating the job!", error);
            });
    };

    return (
        <AdminLayout>
            <SideMenu />
            <div className="container mx-auto mt-5">
                <h1 className="text-2xl font-bold mb-4">Create Job</h1>
                <form onSubmit={handleSubmit} className="bg-white p-5 rounded shadow">
                    <div className="mb-4">
                        <label className="block text-gray-700">Title</label>
                        <input
                            type="text"
                            className="w-full mt-2 p-2 border rounded"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <ReactQuill
                            value={description}
                            onChange={setDescription}
                            className="mt-2 border rounded"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Salary</label>
                        <input
                            type="number"
                            className="w-full mt-2 p-2 border rounded"
                            value={salary}
                            onChange={(e) => setSalary(parseFloat(e.target.value))}
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Create Job
                    </button>
                </form>
            </div>
        </AdminLayout>
    );
};

export default JobCreateForm;
