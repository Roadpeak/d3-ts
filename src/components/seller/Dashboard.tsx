import React from 'react';
import { Link } from 'react-router-dom';
import SellerLayout from '../../utils/layouts/SellerLayout';

const Dashboard: React.FC = () => {
  return (
    <SellerLayout>
      <div className='p-[3%] flex flex-col'>
        <div className="w-full flex justify-between p-4 shadow-md border rounded-md "></div>
        <h1>Welcome to the Dashboard</h1>
        <Link to="/some-route">Go to Some Route</Link>
      </div>
    </SellerLayout>
  );
};

export default Dashboard;
