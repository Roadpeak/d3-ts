import { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    role: 'user',
    password: '',
    password_confirmation: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signupType, setSignupType] = useState('user');
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
      const endpoint = signupType === 'user' ? 'https://api.discoun3ree.com/api/user/register' : 'https://api.discoun3ree.com/api/seller/register';
      const response = await axios.post(endpoint, formData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      setError('');
      navigate('/');
      setLoading(false);
    } catch (error) {
      console.error('Error signing up:', error);
      setLoading(false);
      setError('An error occurred');
    }
  };

  return (
    <div className="flex flex border items-center justify-center min-h-screen bg-white">
      <div className="w-fit md:border border-primary md:shadow-md rounded-md p-4 flex flex-col md:flex-row ">
        <div className="bg-white p-8 rounded-lg w-full md:w-1/2 ">
          <div className="text-center mb-8">
            <Link to='/' className="text-primary lowercase font-medium text-[20px]">D-TREE</Link>
            <h1 className="text-2xl font-semibold text-black">Sign Up</h1>
          </div>
          <div className="flex w-full justify-start gap-2 border-b border-gray-400 mb-4">
            <button
              className={`px-4 py-2 ${signupType === 'user' ? 'text-primary border-b-[2px] border-primary' : 'text-black'}`}
              onClick={() => setSignupType('user')}
            >
              User
            </button>
            <button
              className={`px-4 py-2 ${signupType === 'seller' ? 'text-primary border-b-[2px] border-primary' : 'text-black'}`}
              onClick={() => setSignupType('seller')}
            >
              Seller
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <p className="text-sm text-red-500 mb-4">{error}</p>}
            <div className="flex w-full gap-[2%] items-center">
              <div className="mb-4">
                <label htmlFor="first_name" className="block text-sm font-medium text-black">First Name <span className='text-primary '>*</span></label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  placeholder='Enter first name'
                  value={formData.first_name}
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded border border-gray-300 focus:border-primary outline-none"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="last_name" className="block text-sm font-medium text-black">Last name <span className='text-primary '>*</span></label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  value={formData.last_name}
                  placeholder='Enter last name'
                  onChange={handleChange}
                  className="mt-1 p-2 block w-full rounded border border-gray-300 focus:border-primary outline-none"
                  required
                />
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-black">Email <span className='text-primary '>*</span></label>
              <input
                type="email"
                id="email"
                placeholder='Enter email address'
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 p-2 block w-full rounded border border-gray-300 focus:border-primary outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-sm font-medium text-black">Phone <span className='text-primary '>*</span></label>
              <input
                type="number"
                id="phone"
                name="phone"
                placeholder='Enter phone number'
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 p-2 block w-full rounded border border-gray-300 focus:border-primary outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-black">Password <span className='text-primary '>*</span></label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                placeholder='Type your password'
                onChange={handleChange}
                className="mt-1 p-2 block w-full rounded border border-gray-300 focus:border-primary outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password_confirmation" className="block text-sm font-medium text-black">Confirm Password <span className='text-primary '>*</span></label>
              <input
                type="password"
                id="confirm_passwpassword_confirmationord"
                name="password_confirmation"
                value={formData.password_confirmation}
                placeholder='Confirm your password'
                onChange={handleChange}
                className="mt-1 p-2 block w-full rounded border border-gray-300 focus:border-primary outline-none"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-primary w-full text-white py-2 px-4 rounded-md hover:bg-red-500 transition duration-300"
            >
              {loading ? <ClipLoader color="#fff" /> : 'Sign Up'}
            </button>
            <p className="text-sm text-gray-700 text-end text-start mt-4 mb-1">Already have an account? <Link to='/accounts/sign-in' className="text-red-500">Sign In</Link></p>
          </form>
        </div>
        <div className="w-1/2 hidden md:flex items-center justify-center">
          <img src="https://imgs.search.brave.com/VikpyiN7OTH_xj6mfR6zYxy8_mHlGuCGveLv7wIAg14/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzUzLzMyLzc2/LzM2MF9GXzQ1MzMy/NzYyMF9mbExTaFJD/VU50cW9WTUszTnlm/SmRLSTFVblEzRHhC/eS5qcGc" alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
