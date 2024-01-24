import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-white border-t  text-black">
      <div className="px-[5%] mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <p className="text-[20px] font-medium uppercase border-b">
                discoun3
            </p>
            <p className="text-black">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam facilisis lectus vel faucibus ultrices.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="list-none">
              <li className="mb-2"><a href="#">Home</a></li>
              <li className="mb-2"><a href="#">Shop</a></li>
              <li className="mb-2"><a href="#">Categories</a></li>
              <li className="mb-2"><a href="#">About Us</a></li>
              <li className="mb-2"><a href="#">Contact</a></li>
            </ul>
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
            <p className="mb-2">123 Street, City</p>
            <p className="mb-2">Email: info@discountstore.com</p>
            <p className="mb-2">Phone: +123 456 7890</p>
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
          <p>&copy; 2024 DISCOUN3. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
