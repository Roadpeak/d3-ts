import React, { useEffect, useState } from 'react'
import FeaturedOffers from '../components/FeaturedOffers'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom';
import axios from 'axios';
import CategorySlider from '../utils/elements/CategorySlider';
import AllDeals from './AllDeals';
import { useAuth } from '../utils/context/AuthContext';

interface Store {
  _id: string;
  name: string;
  owner: {
    username: string;
  };
  followers: string[];
  imageUrl: string;
  location: string;
}

interface Discount {
  id: string;
  name: string;
  initialPrice: number;
  discount: number;
  expiryDate: string;
  category: string;
  store: Store;
  serviceTime: string;
  description: string;
  imageUrl: string;
  priceAfterDiscount: number;
}

const Deals: React.FC = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDiscountsByShop = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/discounts`);
        setDiscounts(response.data.discounts);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching discounts:', error);
        setLoading(false);
      }
    };

    fetchDiscountsByShop();
  }, []);

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
