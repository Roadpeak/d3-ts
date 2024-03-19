import React, { ReactNode } from 'react';
import Sidebar from '../../components/seller/Sidebar';

interface SellerLayoutProps {
  children: ReactNode;
}

const SellerLayout: React.FC<SellerLayoutProps> = ({ children }) => {
  return (
    <div className='flex w-full'>
      <Sidebar />
      <div className="w-[85%]">{children}</div>
    </div>
  );
};

export default SellerLayout;
