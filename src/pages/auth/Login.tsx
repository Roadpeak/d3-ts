import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import logo from '../../assets/icon.png';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    try {
      const endpoint = 'https://api.discoun3ree.com/api/user/login';
      const response = await axios.post(endpoint, { email, password });
      const token = response.data.access_token;
      localStorage.setItem('access_token', token);
      setError('');
      navigate('/');
      window.location.reload();
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.error);
      } else {
        setError('An error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex border bg-gray-100 items-center justify-center min-h-screen">
      <div className="w-fit bg-white h-fit rounded-md flex flex-col md:flex-row">
        <div className="bg-white p-8 rounded-lg w-full md:w-1/2 ">
          <div className="text-center mb-2">
            <a href="/">
              <img src={logo} className='w-[50px] -mb-4 mx-auto' alt="Logo" />
            </a>
            <h1 className="text-2xl font-semibold text-black">Sign In</h1>
          </div>
          <div className="flex w-full md:hidden justify-start gap-2 border-b border-gray-400 mb-4">
            <button
              className={`px-4 py-2 flex md:hidden items-center text-primary border-b-[2px] border-primary`}
            >
              User
            </button>
            <Link
              to='https://merchants.discoun3ree.com/accounts/login'
              target='_blank'
              className={`px-4 py-2 flex items-center md:hidden text-black`}
            >
              Merchant
            </Link>
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
            <div className="relative">
              <label htmlFor="password" className="block text-sm font-medium text-black">Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 block w-full rounded border border-gray-300 focus:border-primary outline-none"
                required
              />
              <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 top-6 flex items-center text-gray-500"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
            </div>
            <p className="text-sm text-gray-700 text-start mt-4 mb-1">Don't have an account? <Link to='/accounts/sign-up' className="text-primary">Sign Up</Link></p>
            <div className="mb-4">
              <button type="submit" className="w-full bg-primary text-white p-2 rounded hover:bg-primary">
                {loading ? <ClipLoader color="#fff" /> : 'Log in'}
              </button>
            </div>
          </form>
          <p className="text-sm text-gray-700 text-end -mt-2">Forgot your password? <Link to='/request-password-reset' className="text-primary">Reset it here</Link></p>
        </div>
        <div className="hidden md:flex justify-center items-center ">
          <img src="https://imgs.search.brave.com/VikpyiN7OTH_xj6mfR6zYxy8_mHlGuCGveLv7wIAg14/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzUzLzMyLzc2/LzM2MF9GXzQ1MzMy/NzYyMF9mbExTaFJD/VU50cW9WTUszTnlm/SmRLSTFVblEzRHhC/eS5qcGc" alt="Illustration" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
