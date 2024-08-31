import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Role } from '../../types';
import { getCookie } from '../../utils/cookiUtils';
import Loading from '../../utils/elements/Loading';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { useAuth } from '../../utils/context/AuthContext';

const RoleDetails: React.FC = () => {
    const [role, setRole] = useState<Role | null>(null);
    const { id } = useParams<{ id?: string }>();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            fetchRole(id);
        }
    }, [id]);

    const fetchRole = async (id: string) => {

        try {
            const response = await axios.get(`https://api.discoun3ree.com/api/open-roles/${id}`);
            setRole(response.data);
        } catch (error) {
            console.error('Error fetching role details:', error);
        }
    };

    const handleApplyClick = () => {
        if (user) {
            navigate(`/roles/${role?.id}/applications/create`);
        } else {
            navigate('/accounts/sign-in');
        }
    };

    if (!role) return <Loading />;

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow py-6 px-4 md:px-8 lg:px-12 bg-gray-100">
                <div className="bg-white p-6 rounded-lg shadow-md space-y-6 max-w-3xl mx-auto">
                    <h1 className="text-[22px] border-b border-gray-200 font-semibold mb-4">{role.title}</h1>
                    <div
                        className="job-description"
                        dangerouslySetInnerHTML={{ __html: role.description }}
                    />
                    <p className="mb-4">Salary: Kes {role.salary}</p>
                    <p className="mb-4">Start Date: {new Date(role.start_date).toLocaleDateString()}</p>
                    <button
                        className="bg-primary text-white px-5 font-medium text-[15px] py-1.5 rounded-md"
                        onClick={handleApplyClick}
                    >
                        Apply
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RoleDetails;
