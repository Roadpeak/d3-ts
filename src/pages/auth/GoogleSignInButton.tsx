import React from 'react';
import axios from 'axios';

const GoogleSignInButton: React.FC = () => {
    const handleGoogleSignIn = async () => {
        try {
            const response = await axios.post('https://api.discoun3ree.com/api/auth/google/redirect');
            const { url } = response.data;
            window.location.href = url;
        } catch (error) {
            console.error('Error during Google Sign-In', error);
        }
    };

    return (
        <button
            onClick={handleGoogleSignIn}
            className="bg-red-500 w-full text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
        >
            Sign in with Google
        </button>
    );
};

export default GoogleSignInButton;
