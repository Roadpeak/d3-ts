import React, { useState } from 'react';
import axiosInstance from '../../services/axiosInstance';

interface JobApplicationModalProps {
    jobId: number;
    isOpen: boolean;
    onClose: () => void;
}

const JobApplicationModal: React.FC<JobApplicationModalProps> = ({ jobId, isOpen, onClose }) => {
    const [coverLetter, setCoverLetter] = useState('');
    const [education, setEducation] = useState('');
    const [experience, setExperience] = useState('');
    const [cv, setCv] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setSuccess(null);
        setError(null);

        // Check for cover letter word limit (e.g., 300 words)
        const wordLimit = 300;
        const wordCount = coverLetter.trim().split(/\s+/).length;
        if (wordCount > wordLimit) {
            setError(`Cover letter exceeds the ${wordLimit}-word limit.`);
            setLoading(false);
            return;
        }

        // Check file size and type
        if (cv) {
            if (cv.size > 2 * 1024 * 1024) { // 2 MB
                setError('CV file size exceeds 2 MB.');
                setLoading(false);
                return;
            }
            if (!['application/pdf'].includes(cv.type)) {
                setError('Only PDF files are allowed for CV.');
                setLoading(false);
                return;
            }
        }

        const formData = new FormData();
        formData.append('cover_letter', coverLetter);
        formData.append('education', education);
        formData.append('experience', experience);
        if (cv) formData.append('cv', cv);

        try {
            const response = await axiosInstance.post(`/jobs/${jobId}/apply`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Application submitted successfully', response.data);
            setSuccess('Your application has been submitted successfully.');
            setCoverLetter('');
            setEducation('');
            setExperience('');
            setCv(null);
        } catch (error) {
            console.error("There was an error submitting the application!", error);
            setError('There was an error submitting your application. Please try again.');
        } finally {
            setLoading(false);
            setTimeout(() => onClose(), 2000);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-4">Submit your application</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Cover Letter</label>
                        <textarea
                            className="w-full mt-2 p-2 border rounded"
                            value={coverLetter}
                            onChange={(e) => setCoverLetter(e.target.value)}
                            placeholder="Write your cover letter here..."
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Education</label>
                        <input
                            type="text"
                            className="w-full mt-2 p-2 border rounded"
                            value={education}
                            onChange={(e) => setEducation(e.target.value)}
                            placeholder="Enter your education details..."
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Experience</label>
                        <input
                            type="text"
                            className="w-full mt-2 p-2 border rounded"
                            value={experience}
                            onChange={(e) => setExperience(e.target.value)}
                            placeholder="Enter your experience details..."
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">CV</label>
                        <input
                            type="file"
                            className="w-full mt-2 p-2 border rounded"
                            onChange={(e) => setCv(e.target.files ? e.target.files[0] : null)}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button type="button" onClick={onClose} className="mr-4 text-primary font-medium text-[14px]">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-primary text-[14px] font-medium rounded-md text-white" disabled={loading}>
                            {loading ? 'Submitting...' : 'Submit Application'}
                        </button>
                    </div>
                </form>
                {success && <div className="mt-4 text-green-600">{success}</div>}
                {error && <div className="mt-4 text-red-600">{error}</div>}
            </div>
        </div>
    );
};

export default JobApplicationModal;
