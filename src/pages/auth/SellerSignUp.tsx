import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const SellerSignUp: React.FC = () => {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        role: 'seller',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('https://d3-api.onrender.com/api/v1/users/register', formData);
            const token = response.data.token;
            localStorage.setItem('token', token);
            setError('');
            navigate('/');
        } catch (error) {
            setLoading(false);
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.message);
            } else {
                setError('An error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-white">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <div className="text-center mb-8">
                    <Link to='/' className="">D-THREE</Link>
                    <h1 className="text-2xl font-semibold text-black">Seller Sign UP</h1>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
                    <div className="mb-4">
                        <label htmlFor="first_name" className="block text-sm font-medium text-black">First Name</label>
                        <input
                            type="text"
                            id="first_name"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded border border-gray-300 focus:border-primary outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="last_name" className="block text-sm font-medium text-black">Last name</label>
                        <input
                            type="text"
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded border border-gray-300 focus:border-primary outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded border border-gray-300 focus:border-primary outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className="block text-sm font-medium text-black">Phone</label>
                        <input
                            type="number"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded border border-gray-300 focus:border-primary outline-none"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full rounded border border-gray-300 focus:border-primary outline-none"
                            required
                        />
                    </div>
                    <p className="text-sm text-gray-700 text-start mt-4 mb-1">Already have a seller account? <Link to='/accounts/seller/sign-in' className="text-red-500">Sign In</Link></p>
                    <button
                        type="submit"
                        className="bg-primary w-full text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-300"
                    >
                        {loading ? <ClipLoader color="#fff" /> : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SellerSignUp;
