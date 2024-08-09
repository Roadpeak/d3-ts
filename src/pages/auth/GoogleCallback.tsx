import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Loading from '../../utils/elements/Loading';

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
                    if (window.location.hostname === 'localhost') {
                        document.cookie = `access_token=${token}; path=/`;
                    } else {
                        document.cookie = `access_token=${token}; path=/; domain=.discoun3ree.com; secure; SameSite=None`;
                    }
                    navigate('/');
                    window.location.reload();
                } catch (error) {
                    console.error('Error during Google login', error);
                }
            }
        };

        handleGoogleCallback();
    }, [navigate]);

    return <Loading />;
};

export default GoogleCallback;
