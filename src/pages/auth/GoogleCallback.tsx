import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GoogleCallback: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleGoogleCallback = async () => {
            const urlParams = new URLSearchParams(window.location.search);
            const code = urlParams.get('code');

            if (code) {
                try {
                    const response = await axios.post('https://api.discoun3ree.com/api/auth/google/callback', { code });
                    const token = response.data.access_token;
                    localStorage.setItem('token', token);
                    navigate('/');
                } catch (error) {
                    console.error('Error during Google login', error);
                }
            }
        };

        handleGoogleCallback();
    }, [navigate]);

    return <div>Loading...</div>;
};

export default GoogleCallback;
