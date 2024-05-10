import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners'

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://d3-api.onrender.com/api/v1/users/login', { email, password });
      const token = response.data.token;
      localStorage.setItem('token', token);
      setError('');
      navigate('/')
      window.location.reload();
      setLoading(false);
    } catch (error) {
      console.error('Error logging in:', error);
      setLoading(false);
      setError('An error occurred');
    }
  };

  return (
    <div className="flex flex border items-center justify-center min-h-screen bg-white">
      <div className="w-fit md:border border-primary md:shadow-md rounded-md flex flex-col md:flex-row">
         <div className="bg-white p-8 rounded-lg w-full md:w-1/2 ">
        <div className="text-center mb-8">
          <Link to='/' className="text-primary text-[20px] font-medium lowercase">D-THREE</Link>
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
              placeholder='Enter email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 block w-full rounded border border-gray-300 focus:border-primary outline-none"
              required
            />
          </div>
          <div className="">
            <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 block w-full rounded border border-gray-300 focus:border-primary outline-none"
              required
            />
          </div>
          <p className="text-sm text-gray-700 text-start mt-4 mb-1">Don't have an account? <Link to='/accounts/sign-up' className="text-red-500">Sign Up</Link></p>
          <div className="mb-4">
            <button type="submit" className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">{loading ? <ClipLoader color="#fff" /> : 'Log in'}</button>
          </div>
        </form>
        <p className="text-sm text-gray-700 text-center">Forgot your password? <Link to='/accounts/forgot-password' className="text-red-500">Reset it here</Link></p>
      </div>
      <div className="hidden md:flex justify-center items-center ">
        <img src="https://imgs.search.brave.com/VikpyiN7OTH_xj6mfR6zYxy8_mHlGuCGveLv7wIAg14/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzUzLzMyLzc2/LzM2MF9GXzQ1MzMy/NzYyMF9mbExTaFJD/VU50cW9WTUszTnlm/SmRLSTFVblEzRHhC/eS5qcGc" alt="" />
      </div>
      </div>      
    </div>
  );
};

export default LoginPage;
