import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  const email = query.get('email');

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('https://api.discoun3ree.com/api/reset-password', {
        token,
        email,
        password,
        password_confirmation: confirmPassword,
      });
      setSuccess(response.data.message);
      setError('');
      setTimeout(() => {
        navigate('/accounts/sign-in');
      }, 3000);
    } catch (error) {
      setError('Failed to reset password. Please try again.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <form onSubmit={handleResetPassword}>
          <div className="mb-4">
            <label className="text-[14px] text-black">New Password</label>
            <input
              type="password"
              className="p-2 block w-full text-[13px] font-light text-primary border-b border-gray-300 focus:border-primary focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-[14px] text-black">Confirm New Password</label>
            <input
              type="password"
              className="p-2 block w-full text-[13px] font-light text-primary border-b border-gray-300 focus:border-primary focus:outline-none"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primary font-medium text-[14px] text-white py-1.5 px-4 rounded-full disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
