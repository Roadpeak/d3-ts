import React from 'react'
import Topmenu from './Topmenu'
import Sidenav from './Sidenav'
import Dashboard from './Dashboard'

const SellerLayout = () => {
  return (
    <div>
        <Topmenu />
        <div className="flex">
            <Sidenav />
            <div className="flex py-8 pl-8 pr-[5%] h-[92vh] overflow-y-auto w-full ">
                <Dashboard />
            </div>
        </div>
    </div>
  )
}

export default SellerLayout