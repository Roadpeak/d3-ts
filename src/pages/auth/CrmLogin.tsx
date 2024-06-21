import axios from 'axios';
import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const CrmLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('https://api.discoun3ree.com/api/admin/login', { email, password });
      const token = response.data.access_token;
      localStorage.setItem('access_token', token);
      setError('');
      navigate('/manage'); 
      window.location.reload();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Invalid credentials'); 
    }
  };

  const isAuthenticated = () => {
    const token = localStorage.getItem('access_token');
    return !!token; 
  };

  if (isAuthenticated()) {
    return <Navigate to="/manage" />;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-fit md:border border-primary md:shadow-md h-fit rounded-md flex flex-col md:flex-row">
        <div className="bg-white p-8 rounded-lg w-full md:w-1/2 ">
          <div className="text-center mb-8">
            <Link to='/' className="text-primary text-[20px] font-medium lowercase">D-THREE</Link>
            <h1 className="text-2xl font-semibold text-black">Admin Sign In</h1>
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
            <div className="my-4">
              <button type="submit" className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">{loading ? <ClipLoader color="#fff" /> : 'Log in'}</button>
            </div>
          </form>
        </div>
        <div className="hidden md:flex justify-center items-center ">
          <img src="https://imgs.search.brave.com/VikpyiN7OTH_xj6mfR6zYxy8_mHlGuCGveLv7wIAg14/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzUzLzMyLzc2/LzM2MF9GXzQ1MzMy/NzYyMF9mbExTaFJD/VU50cW9WTUszTnlm/SmRLSTFVblEzRHhC/eS5qcGc" alt="" />
        </div>
      </div>
    </div>
  );
};

export default CrmLogin;
