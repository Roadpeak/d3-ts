import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { FaRegEnvelope } from 'react-icons/fa';
import { MdAddCall } from "react-icons/md";
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactUsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('https://d3-api.onrender.com/api/v1/tickets/submit', formData);
      toast("Ticket submitted!")
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting ticket:', error);
      toast.error('Error submitting ticket');
    }
  };

  return (
    <>
      <Navbar />
      <div className="px-[5%] mx-auto bg-gray-100 py-8">
        <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>
        <div className="">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4">Visit Us</h2>
              <p className="mb-2">Experience our services in person:</p>
              <p className="mb-2">Britam Towers, Upperhill, Nairobi</p>
              <p className="mb-2">Nairobi, Kenya</p>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-4">Contact Information</h2>
              <p className="mb-2">Reach out to us for any inquiries:</p>
              <p className="mb-2">
                <a className='flex items-center gap-2' href="mailto:info@dthree.com"><FaRegEnvelope /> info@dthree.com</a>
              </p>
              <p className="mb-2 flex items-center gap-2"><MdAddCall /> +254 113 794219</p>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Send Us a Message</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row items-center justify-between w-full gap-4">
                <div className='w-full'>
                  <label htmlFor="name" className="block mb-2 font-semibold">Your Name</label>
                  <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" className="w-full border rounded-md bg-transparent outline-none px-4 py-2 focus:border-primary" />
                </div>
                <div className='w-full'>
                  <label htmlFor="phone" className="block mb-2 font-semibold">Phone number</label>
                  <input type="number" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" className="w-full border rounded-md bg-transparent outline-none px-4 py-2 focus:border-primary" />
                </div>
                <div className='w-full'>
                  <label htmlFor="email" className="block mb-2 font-semibold">Your Email</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" className="w-full border rounded-md bg-transparent outline-none px-4 py-2 focus:border-primary" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 font-semibold">Your Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} rows={5} placeholder="Type your message here" className="w-full border rounded-md bg-transparent outline-none px-4 py-2 focus:border-primary"></textarea>
              </div>
              <div>
                <button type="submit" className="bg-[#ed4e50] text-white px-6 py-2 rounded-md transition-colors">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUsPage;
