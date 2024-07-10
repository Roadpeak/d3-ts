import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CategorySlider from '../utils/elements/CategorySlider';
import AllDeals from './AllDeals';
import { useAuth } from '../utils/context/AuthContext';


const Deals: React.FC = () => {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      {user && user.first_discount === 0 && (
        <div className="bg-yellow-200">
          <p className="text-yellow-800 px-4 text-center py-3 text-sm">
            You have one free voucher. You will use it to access any discount and book an appointment.
          </p>
        </div>
      )}
      <div className="bg-gray-100 flex flex-col px-[5%] py-4">
        <p className="text-center"></p>
        <CategorySlider />
        
      </div>
      <AllDeals />
      <Footer />
    </div>
  )
}

export default Deals
