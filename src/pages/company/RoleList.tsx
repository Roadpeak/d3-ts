import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Role } from '../../types';
import { useNavigate } from 'react-router-dom';
import { getCookie } from '../../utils/cookiUtils';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const RoleList: React.FC = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        const token = getCookie('access_token');

        try {
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json' 
                }
            };

            const response = await axios.get('https://api.discoun3ree.com/api/open-roles', config);
            setRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles:', error);
        }
    };

    return (
        <div className="">
            <Navbar />
            <div className="py-6 px-[5%]">
                <h1 className="text-[20px] font-medium mb-2">Browse open roles</h1>
                <div className="mt-4">
                    {roles.map(role => (
                        <div key={role.id} className="bg-white p-4 rounded shadow mb-2">
                            <p className="text-[18px] font-medium">{role.title}</p>
                            <p>Kes. {role.salary}</p>
                            <button
                                className="bg-primary text-white px-4 py-1.5 text-[15px] font-medium rounded mt-2"
                                onClick={() => navigate(`/roles/${role.id}`)}
                            >
                                View Details
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RoleList;
