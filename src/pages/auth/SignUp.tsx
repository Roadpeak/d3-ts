import { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiLock } from 'react-icons/fi';
import axios from 'axios';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    role: 'seller',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://d3-api.onrender.com/api/v1/users/register', formData);
      console.log('User signed up successfully:', response.data);

      // Extract the token from the response data
      const token = response.data.token;

      localStorage.setItem('token', token);

    } catch (error) {
      console.error('Error signing up:', error);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-black to-white text-white">
      <div className="w-[25%] p-6 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-semibold text-center mb-4 text-red-400">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex text-gray-500 items-center border border-gray-300 rounded-md px-3 py-2">
            <FiUser className="text-red-400" />
            <input
              type="text"
              name="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              className="ml-2 w-full focus:outline-none"
            />
          </div>
          <div className="flex text-gray-500 items-center border border-gray-300 rounded-md px-3 py-2">
            <FiUser className="text-red-400" />
            <input
              type="text"
              name="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              className="ml-2 w-full focus:outline-none"
            />
          </div>
          <div className="flex items-center text-gray-500 border border-gray-300 rounded-md px-3 py-2">
            <FiMail className="text-red-400" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="ml-2 w-full focus:outline-none"
            />
          </div>
          <div className="flex text-gray-500 items-center border border-gray-300 rounded-md px-3 py-2">
            <FiPhone className="text-red-400" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="ml-2 w-full focus:outline-none"
            />
          </div>
          <div className="flex items-center border border-gray-300 text-gray-400 rounded-md px-3 py-2">
            <FiLock className="text-red-400" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="ml-2 w-full focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-primary w-full text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
