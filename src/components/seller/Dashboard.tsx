import React from 'react';
import { Link } from 'react-router-dom';
import SellerLayout from '../../utils/layouts/SellerLayout';
import { CgProfile } from "react-icons/cg";
import { FaChevronDown } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  return (
    <SellerLayout>
      <div className='flex flex-col'>
        <div className="w-full flex justify-between p-4 shadow-md border-b px-[3%]">
            <div className=""></div>
            <div className="flex items-center gap-2 text-gray-500 ">
                <CgProfile size={26} />
                <p className="text-gray-500 ">Salvato Luis</p>
                <FaChevronDown />
            </div>
        </div>
        <h1>Welcome to the Dashboard</h1>
        <Link to="/some-route">Go to Some Route</Link>
      </div>
    </SellerLayout>
  );
};

export default Dashboard;
