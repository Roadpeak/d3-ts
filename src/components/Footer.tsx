import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

const Footer:React.FC = () => {
  const handleMapClick = () => {
    window.open('https://www.google.com/maps/search/?api=1&query=Le\'Mac', '_blank');
  };
    const currentYear = new Date().getFullYear();

  const handleEmailClick = () => {
    window.open('mailto:info@discoun3ree.com', '_blank');
  };
  const handleCategoryClick = (category: string) => {
    const searchUrl = `/search?query=${category}`;
    
    window.location.href = searchUrl;
};

  return (
    <footer className="bg-white text-black">
      <div className="px-[5%] mx-auto py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8"> 
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <p className="text-[20px] font-medium uppercase border-b">
              discoun3
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <div className="flex flex-col">
              <a href={`/`} className="mb-2 text-gray-500 hover:text-black">Home</a>
              <a href={`/about`} className="mb-2 text-gray-500 hover:text-black">About</a>
              <a href={`/terms-and-conditions`} className="mb-2 text-gray-500 hover:text-black">Terms & Conditions</a>
              <a href={`/privacy-policy`} className="mb-2 text-gray-500 hover:text-black">Privacy Policy</a>
              <a href={`/contact`} className="mb-2 text-gray-500 hover:text-black">Contact</a>
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
              <li className="mb-2 text-gray-500 hover:text-black" onClick={() => handleCategoryClick('Event')}>
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
              <a href={`/company/careers`} className="mb-2 text-gray-500 hover:text-black">Careers</a>
              <a href={`/company/press`} className="mb-2 text-gray-500 hover:text-black">Press</a>
              <a href={`/company/brand-guidelines`} className="mb-2 text-gray-500 hover:text-black">Brand Guidelines</a>
              <a href={`/company/vision`} className="mb-2 text-gray-500 hover:text-black">Vision & Projection</a>
              <a href={`/company/fund`} className="mb-2 text-gray-500 hover:text-black">Fund</a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <p className="mb-2 hover:underline" onClick={handleMapClick} style={{ cursor: 'pointer' }}>
              Le'Mac, Nairobi
            </p>
            <p className="mb-2" onClick={handleEmailClick} style={{ cursor: 'pointer' }}>
              info@discoun3ree.com
            </p>
            <p className="mb-2">
              <a href="tel:+1 929-460-9580">+1 929-460-9580</a>
            </p>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <a href="https://www.facebook.com/davtec.co?mibextid=ZbWKwL" target='_blank' className="mr-4 text-gray-500 hover:text-black">
            <FaFacebookF />
          </a>
          <a href="https://x.com/discoun3_" target='_blank' className="mr-4 text-gray-500 hover:text-black">
            <FaXTwitter />
          </a>
          <a href="https://www.instagram.com/discoun3_official" target='_blank' className="mr-4 text-gray-500 hover:text-black">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/company/discoun3-limited/" target='_blank' className="text-gray-500 hover:text-black">
            <FaLinkedin />
          </a>
        </div>
      </div>

      <div className="bg-white border-t py-4">
        <div className="px-[5%] flex items-center justify-between text-gray-900">
          <p>&copy; {currentYear} discoun3. All rights reserved.</p>
          <div className="flex items-center gap-4 text-gray-600 text-[16px] ">
            <a href='/contact' className='hover:text-black cursor-pointer'>Support</a>
            <p className='hidden md:block hover:text-black cursor-pointer'>Security</p>
            <p className='hidden md:block hover:text-black cursor-pointer'>Cookies</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
