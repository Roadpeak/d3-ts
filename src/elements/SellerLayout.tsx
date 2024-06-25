import React, { ReactNode } from 'react';
import Topmenu from './Topmenu';
import Sidenav from './Sidenav';

type SellerLayoutProps = {
  children: ReactNode;
};

const SellerLayout = ({ children }: SellerLayoutProps) => {
  return (
    <div>
      <Topmenu />
      <div className="flex">
        <Sidenav />
        <div className="flex p-4 md:py-8 md:pl-8 md:pr-[5%] h-[92vh] overflow-y-auto w-full ">
          {children}
        </div>
      </div>
    </div>
  );
};

export default SellerLayout;
