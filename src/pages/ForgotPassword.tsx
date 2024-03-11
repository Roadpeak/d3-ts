import React, { useState } from 'react';
import fintechLogo from './fintech-logo.png'; // Placeholder for fintech logo
import { Link } from 'react-router-dom';

const ForgotPasswordPage: React.FC = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you can handle the password reset logic
    console.log('Password reset requested for:', { email });
  };

  return (
    <div className="bg-gradient-to-r from-black to-white min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="text-center mb-8">
          <p className="">D-THREE</p>
          {/* <img src={fintechLogo} alt="Fintech Logo" className="mx-auto h-16 mb-4" /> */}
          <h1 className="text-3xl font-bold text-black">Forgot Password</h1>
          <p className="text-gray-700">Enter your email to reset your password</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full rounded border border-gray-300 outline-none"
              placeholder='e.g. email@example.com'
              required
            />
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">Reset Password</button>
          </div>
        </form>
        <p className="text-sm text-gray-700 text-center">Remembered your password? <Link to='/accounts/sign-in' className="text-red-500">Log in</Link></p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
