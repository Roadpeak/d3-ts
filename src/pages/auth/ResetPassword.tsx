import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import fintechLogo from './fintech-logo.png'; // Placeholder for fintech logo

const ResetPasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you can handle the password reset logic
    console.log('Password reset with:', { password });
  };

  return (
    <div className="bg-gradient-to-r from-red-600 to-purple-600 min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="text-center mb-8">
            <p className="">D-THREE</p>
          {/* <img src={fintechLogo} alt="Fintech Logo" className="mx-auto h-16 mb-4" /> */}
          <h1 className="text-3xl font-bold text-black">Reset Password</h1>
          <p className="text-gray-700">Enter your new password</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-black">New Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 block w-full rounded border-black"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-black">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 p-2 block w-full rounded border-black"
              required
            />
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">Reset Password</button>
          </div>
        </form>
        <p className="text-sm text-gray-700 text-center">Remembered your password? <Link to='/accounts/login' className="text-red-500">Log in</Link></p>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
