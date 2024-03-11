import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import fintechLogo from './fintech-logo.png'; // Placeholder for fintech logo

const SignUpPage: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you can handle the form submission logic
    console.log('Form submitted with:', { firstName, lastName, email, phoneNumber, password });
  };

  return (
    <div className="bg-gradient-to-r from-black to-white min-h-screen flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="text-center mb-8">
          {/* <img src={fintechLogo} alt="Fintech Logo" className="mx-auto h-16 mb-4" /> */}
          <p className="">D-THREE</p>
          <h1 className="text-3xl font-bold text-black">Sign Up</h1>
          <p className="text-gray-700">Join us and experience crazy discounts!</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1">
              <label htmlFor="firstName" className="block text-sm font-medium text-black">First Name</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 p-2 block w-full rounded border border-gray-300 outline-none"
                placeholder='John'
                required
              />
            </div>
            <div className="col-span-1">
              <label htmlFor="lastName" className="block text-sm font-medium text-black">Last Name</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 p-2 block w-full rounded border border-gray-300 outline-none"
                placeholder='Doe'
                required
              />
            </div>
          </div>
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
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-black">Phone Number</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="mt-1 p-2 block w-full rounded border border-gray-300 outline-none"
              placeholder='+254XXXXXXXX'
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
              placeholder='********'
              required
            />
          </div>
          <div className="mb-4">
            <button type="submit" className="w-full bg-red-500 text-white p-2 rounded hover:bg-red-600">Sign Up</button>
          </div>
        </form>
        <p className="text-sm text-gray-700 text-center">Already have an account? <Link to='/accounts/sign-in' className="text-red-500">Sign in</Link></p>
      </div>
    </div>
  );
};

export default SignUpPage;
