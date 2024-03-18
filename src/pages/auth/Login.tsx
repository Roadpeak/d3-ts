import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import fintechLogo from './fintech-logo.png'; // Placeholder for fintech logo

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/users/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setError('');
      // Optionally, you can redirect the user to another page after successful login
      console.log('User logged in successfully:', response.data);
    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="bg-gradient-to-r from-black to-white min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="text-center mb-8">
            <p className="">D-THREE</p>
          {/* <img src={fintechLogo} alt="Fintech Logo" className="mx-auto h-16 mb-4" /> */}
          <h1 className="text-2xl font-semibold text-black">Sign In</h1>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full rounded border border-gray-300 outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 block w-full rounded border border-gray-300 outline-none"
              required
            />
          </div>
          <p className="text-sm text-gray-700 text-start mb-1">Don't have an account? <Link to='/accounts/sign-up' className="text-red-500">Sign Up</Link></p>
          <div className="mb-4">
            <button type="submit" className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">Log In</button>
          </div>
        </form>
        <p className="text-sm text-gray-700 text-center">Forgot your password? <Link to='/accounts/forgot-password' className="text-red-500">Reset it here</Link></p>
      </div>
    </div>
  );
};

export default LoginPage;
