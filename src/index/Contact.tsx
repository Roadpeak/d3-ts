import React, { useState } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { FaRegEnvelope } from 'react-icons/fa';
import { MdAddCall } from "react-icons/md";
import { submitTicket } from '../services/apiService';
import { useAuth } from '../utils/context/AuthContext';

const ContactUsPage: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    body: '',
    priority: 'low'
  });
  const { user } = useAuth()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    if (!user) (
      setShowLoginModal(true)
    )
    e.preventDefault();
    await submitTicket(formData, () => setFormData({ title: '', body: '', priority: 'low' }));
  };

  return (
    <>    
      <Navbar />
      <div className="px-[5%] mx-auto bg-gray-100 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-bold mb-4">Contact Information</h2>
            <p>Reach out to us for any inquiries:</p>
            <p className="flex items-center gap-2">
              <FaRegEnvelope /> 
              <a href="mailto:info@dthree.com">info@dthree.com</a>
            </p>
            <a href='tel:+254743007000' className="flex items-center gap-2">
              <MdAddCall /> +254 743 007000
            </a>
          </div>
          <div className='bg-white p-4 rounded-md'>
          <h2 className="text-[18px] text-gray-800 font-medium mb-4">Ticket</h2>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="title" className="text-[15px] text-gray-600 font-light">Title</label>
              <input 
                type="text" 
                id="title" 
                name="title" 
                value={formData.title} 
                onChange={handleChange} 
                placeholder="Enter the ticket title" 
                className="w-full border rounded-md bg-white outline-none px-4 py-2 focus:border-primary" 
              />
            </div>
            <div>
              <label htmlFor="body" className="text-[15px] text-gray-600 font-light">Body</label>
              <textarea 
                id="body" 
                name="body" 
                value={formData.body} 
                onChange={handleChange} 
                rows={5} 
                placeholder="Describe your issue or request" 
                className="w-full border rounded-md bg-white outline-none px-4 py-2 focus:border-primary" 
              ></textarea>
            </div>
            <div>
              <label htmlFor="priority" className="text-[15px] text-gray-600 font-light">Priority</label>
              <select 
                id="priority" 
                name="priority" 
                value={formData.priority} 
                onChange={handleChange} 
                className="w-full border rounded-md bg-white outline-none px-4 py-2 focus:border-primary"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <button type="submit" className="bg-primary text-white px-6 py-2 rounded-md transition-colors hover:bg-red-800">
                Submit Ticket
              </button>
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
