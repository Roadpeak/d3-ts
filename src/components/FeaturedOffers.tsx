import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Discount {
  id: number;
  name: string;
  initial_price: string;
  price_after_discount: string;
  percentage_discount: string; 
  expiry_date: string;
  slug: string;
  image_url: string;
  service_time_hours: number | null; 
  category: string;
  description: string | null;
  verified: boolean;
  shop_id: number;
}

const FeaturedOffers: React.FC = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const maxLength = 70;

  useEffect(() => {
    const fetchDiscountsByShop = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/discounts`);
        console.log(response.data)
        setDiscounts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching discounts:', error);
        setLoading(false);
      }
    };

    fetchDiscountsByShop();
  }, []);

  const formatExpiryDate = (expiryDate: string): string => {
    const expiry = new Date(expiryDate);
    const today = new Date();
    const differenceInDays = Math.ceil((expiry.getTime() - today.getTime()) / (1000 * 3600 * 24));

    if (expiry < today) {
      return 'Expired 😕';
    } else {
      return `Expires in: ${differenceInDays} days`;
    }
  };

  return (
    <div className='w-full px-[5%] flex flex-col bg-gray-100 mb-[2%]'>
      <p className="text-black font-medium mb-4 text-[24px]">
        Featured Services | 2024
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols5 gap-4">
        {discounts.map((item) => (
          <div key={item.id} className="bg-white rounded-md p-4">
            <p className="text-black mb-2">{item.name}</p>
            <div className="flex mt-2 items-center justify-between w-full">
              <div className="flex gap-1 items-center">
                <p className="text-gray-500 text-[14px] line-through">{`${item.initial_price}`}</p>
                <p className="text-primary font-semibold text-[14px] ml-2">
                  {`Ksh. ${item.price_after_discount}`}
                </p>
              </div>
              <p className="text-primary font-medium bg-secondary px-2 py-1 rounded-md">save {item.percentage_discount}%</p>
            </div>
            <p className=""><span className=''>{formatExpiryDate(item.expiry_date)}</span></p>
            <div className="flex w-full gap-[2%]">
              {new Date(item.expiry_date) > new Date() ? (
                <>
                  <button
                    className="w-full rounded-md border border-third text-third py-1"
                    onClick={() => {}}
                    title="Get offer"
                  >
                    Get offer
                  </button>
                  <button
                    className="w-full rounded-md bg-primary text-white py-1"
                    onClick={() => {}}
                    title="See Details"
                  >
                    See Details
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="w-full rounded-md border border-third text-third py-1"
                    disabled
                    title="Expired"
                  >
                    Get offer
                  </button>
                  <button
                    className="w-full rounded-md bg-primary text-white py-1"
                    disabled
                    title="Expired"
                  >
                    See Details
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedOffers;
