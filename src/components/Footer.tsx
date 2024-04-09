import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const handleMapClick = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=Britam+Towers+Upperhill+Nairobi', '_blank');
  };

  const handleEmailClick = () => {
    window.open('mailto:info@dthree.com', '_blank');
  };
  const handleCategoryClick = (category: string) => {
    navigate(`/search?q=${category}`);
  };

  return (
    <footer className="bg-white border-t  text-black">
      <div className="px-[5%] mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
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
              <Link to={`/accounts/sign-up`} className="mb-2 text-gray-500 hover:text-black capitalize">Sign up as service provider</Link>
              <Link to={`/accounts/sign-in`} className="mb-2 text-gray-500 hover:text-black">Sign In</Link>
              <Link to={`/deals`} className="mb-2 text-gray-500 hover:text-black capitalize">Start getting discounts</Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Categories</h4>
            <ul className="list-none">
              <li className="mb-2 text-gray-500 hover:text-black" onClick={() => handleCategoryClick('Photography')}>
                <span className="cursor-pointer">Photography</span>
              </li>
              <li className="mb-2 text-gray-500 hover:text-black" onClick={() => handleCategoryClick('Beauty')}>
                <span className="cursor-pointer">Beauty</span>
              </li>
              <li className="mb-2 text-gray-500 hover:text-black" onClick={() => handleCategoryClick('Cleaning')}>
                <span className="cursor-pointer">Cleaning</span>
              </li>
              <li className="mb-2 text-gray-500 hover:text-black" onClick={() => handleCategoryClick('Videography')}>
                <span className="cursor-pointer">Videography</span>
              </li>
              <li className="mb-2 text-gray-500 hover:text-black" onClick={() => handleCategoryClick('Events')}>
                <span className="cursor-pointer">Events</span>
              </li>
              <li className="mb-2 text-gray-500 hover:text-black" onClick={() => handleCategoryClick('Hair and salon')}>
                <span className="cursor-pointer">Hair and salon</span>
              </li>
              <li className="mb-2 text-gray-500 hover:text-black" onClick={() => handleCategoryClick('Spa')}>
                <span className="cursor-pointer">Spa</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <div className="flex flex-col">
              <Link to={`/`} className="mb-2 text-gray-500 hover:text-black">Careers</Link>
              <Link to={`/`} className="mb-2 text-gray-500 hover:text-black">Press</Link>
              <Link to={`/`} className="mb-2 text-gray-500 hover:text-black">Blog</Link>
              <Link to={`/`} className="mb-2 text-gray-500 hover:text-black">Brand Guidelines</Link>
              <Link to={`/`} className="mb-2 text-gray-500 hover:text-black">Vision & Projection</Link>
              <Link to={`/`} className="mb-2 text-gray-500 hover:text-black">Fund</Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="mb-2 hover:underline" onClick={handleMapClick} style={{ cursor: 'pointer' }}>
              Britam Towers, Upperhill Nairobi
            </p>
            <p className="mb-2" onClick={handleEmailClick} style={{ cursor: 'pointer' }}>
              info@dthree.com
            </p>
            <p className="mb-2">
              <a href="tel:+254113794219">+254 743 007000</a>
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
        <div className="px-[5%] flex items-center justify-between text-gray-900">
          <p>&copy; 2024 D-THREE. All rights reserved.</p>
          <div className="flex items-center gap-4 text-gray-600 text-[16px] ">
            <p className='hover:text-black cursor-pointer'>Services</p>
            <p className='hover:text-black cursor-pointer'>Security</p>
            <p className='hover:text-black cursor-pointer'>Cookies</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
