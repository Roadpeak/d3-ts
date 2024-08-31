import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../utils/context/AuthContext';
import { getCookie } from '../../utils/cookiUtils';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const ApplicationForm: React.FC = () => {
    const [coverLetter, setCoverLetter] = useState<string>('');
    const [cv, setCv] = useState<File | null>(null);
    const [userId, setUserId] = useState<number | null>(null);
    const { roleId } = useParams<{ roleId: string }>();
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
            setUserId(user.id);
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;

        if (name === 'cv' && files) {
            setCv(files[0]);
        } else if (name === 'cover_letter') {
            setCoverLetter(value);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = getCookie('access_token');

        if (userId === null) {
            console.error('User ID is not available. Cannot submit application.');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('open_role_id', roleId || '');
            formData.append('user_id', userId.toString());
            formData.append('cover_letter', coverLetter);
            if (cv) formData.append('cv', cv);
            formData.append('status', 'pending');

            await axios.post(
                `https://api.discoun3ree.com/api/applications`,
                formData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            navigate(`/`);
        } catch (error) {
            console.error('Error applying for role:', error);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow py-6 px-4 md:px-8 lg:px-12 bg-gray-100">                
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6 max-w-3xl mx-auto">
                    <h1 className="text-[22px] font-medium text-gray-800 mb-6">Submit Your Application</h1>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">Cover Letter</label>
                        <textarea
                            name="cover_letter"
                            value={coverLetter}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition"
                            rows={6}
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-semibold mb-2">CV (PDF/Doc/Docx)</label>
                        <input
                            type="file"
                            name="cv"
                            onChange={handleChange}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:text-sm file:font-semibold file:bg-yellow-100 file:text-yellow-700 hover:file:bg-yellow-200 transition"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-primary text-white px-6 py-1.5 rounded-lg shadow transition"
                    >
                        Apply
                    </button>
                </form>
            </main>
            <Footer />
        </div>
    );
};

export default ApplicationForm;
