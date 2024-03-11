import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const Footer = () => {
  const handleMapClick = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=Britam+Towers+Upperhill+Nairobi', '_blank');
  };

  const handleEmailClick = () => {
    window.open('mailto:info@dthree.com', '_blank');
  };
  return (
    <footer className="bg-white border-t  text-black">
      <div className="px-[5%] mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <p className="text-[20px] font-medium uppercase border-b">
                d-three
            </p>
            <p className="text-gray-7007">
              Experience exclusive discounts on top brands. Elevate your shopping game with our unbeatable deals. Don't miss out, shop now and save big!  
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col">
              <Link to={`/`} className="mb-2 text-gray-500 hover:text-black">Home</Link>
              <Link to={`/about`} className="mb-2 text-gray-500 hover:text-black">About</Link>
              <Link to={`/terms-and-conditions`} className="mb-2 text-gray-500 hover:text-black">Terms & Conditions</Link>
              <Link to={`/privacy-policy`} className="mb-2 text-gray-500 hover:text-black">Privacy Policy</Link>
              <Link to={`/contact`} className="mb-2 text-gray-500 hover:text-black">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="list-none">
              <li className="mb-2"><a href="#">Electronics</a></li>
              <li className="mb-2"><a href="#">Fashion</a></li>
              <li className="mb-2"><a href="#">Home & Kitchen</a></li>
              <li className="mb-2"><a href="#">Beauty & Health</a></li>
              <li className="mb-2"><a href="#">Sports & Outdoors</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="mb-2 hover:underline" onClick={handleMapClick} style={{ cursor: 'pointer' }}>
              Britam Towers, Upperhill Nairobi
            </p>
            <p className="mb-2" onClick={handleEmailClick} style={{ cursor: 'pointer' }}>
              Email: info@dthree.com
            </p>
            <p className="mb-2">
              Phone: <a href="tel:+254113794219">+254 113 794219</a>
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <a href="#" className="mr-4 text-gray-500 hover:text-black">
            <FaFacebookF />
          </a>
          <a href="#" className="mr-4 text-gray-500 hover:text-black">
            <FaXTwitter />
          </a>
          <a href="#" className="mr-4 text-gray-500 hover:text-black">
            <FaInstagram />
          </a>
          <a href="#" className="text-gray-500 hover:text-black">
           <FaLinkedin />
          </a>
        </div>
      </div>

      <div className="bg-white border-t py-4">
        <div className="container mx-auto text-center text-gray-900">
          <p>&copy; 2024 D-THREE. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
