import React from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const ContactUsPage: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="px-[5%] mx-auto bg-gray-100 py-8">
        <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>

        <div className="bg-white shadow-md p-8 rounded-lg">
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
                Email: <a href="mailto:info@dthree.com">info@dthree.com</a>
              </p>
              <p className="mb-2">Phone: +254 113 794219</p>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Send Us a Message</h2>
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block mb-2 font-semibold">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    className="w-full border rounded-md outline-none px-4 py-2"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-2 font-semibold">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className="w-full border rounded-md outline-none px-4 py-2"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block mb-2 font-semibold">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Type your message here"
                  className="w-full border rounded-md outline-none px-4 py-2"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="bg-[#ed4e50] text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Send Message
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
