import React, { useEffect, useState } from 'react';
import JobApplicationModal from './JobApplicationModal';
import JobDescription from './JobDescription';
import { Job } from '../../types';
import axiosInstance from '../../services/axiosInstance';
import { useAuth } from '../../utils/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const JobList: React.FC = () => {
    const [jobs, setJobs] = useState<Job[]>([]);
    const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        axiosInstance.get('/jobs')
            .then(response => {
                setJobs(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the jobs!", error);
            });
    }, []);

    const handleApplyClick = (jobId: number) => {
        if (user) {
            setSelectedJobId(jobId);
            setIsModalOpen(true);
        } else {
            navigate('/accounts/sign-in');
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedJobId(null);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="px-[5%] mx-auto mt-5">
            <h1 className="text-2xl font-bold mb-4">Open Roles</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map(job => (
                    <div key={job.id} className="bg-white p-5 rounded shadow">
                        <h2 className="text-xl font-semibold">{job.title}</h2>
                        <JobDescription description={job.description} />
                        <p className="text-gray-800 font-bold">Salary: Kes. {job.salary}</p>
                        <p className="text-gray-500">Posted: {formatDate(job.created_at)}</p>
                        <button
                            onClick={() => handleApplyClick(job.id)}
                            className="mt-4 bg-primary text-white px-4 py-1.5 font-medium rounded"
                        >
                            Apply Now
                        </button>
                    </div>
                ))}
            </div>

            {selectedJobId && (
                <JobApplicationModal
                    jobId={selectedJobId}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </div>
    );
};

export default JobList;
