import React, { useState } from 'react'

const Topmenu:React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white w-full text-white px-[5%] h-[8vh] flex items-center tracking-wide">
      <div className="flex w-full justify-between items-center">
        <a href='/' className="text-black text-2xl font-bold">Discoun3</a>
        <div className="hidden text-black md:flex space-x-4">
          <a href="#" className=" px-3 py-2 rounded">Home</a>
          <a href="#" className=" px-3 py-2 rounded">Discounts</a>
          <a href="#" className=" px-3 py-2 rounded">FAQs</a>
          <a href="#" className=" px-3 py-2 rounded">About</a>
          <a href="#" className=" px-3 py-2 rounded">Contact</a>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <a href="#" className="block text-white hover:bg-blue-500 px-3 py-2 rounded">Home</a>
          <a href="#" className="block text-white hover:bg-blue-500 px-3 py-2 rounded">Products</a>
          <a href="#" className="block text-white hover:bg-blue-500 px-3 py-2 rounded">About</a>
          <a href="#" className="block text-white hover:bg-blue-500 px-3 py-2 rounded">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default Topmenu