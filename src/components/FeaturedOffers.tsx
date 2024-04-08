import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
  _id: string;
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
  percentageDiscount: number;
}

const FeaturedOffers: React.FC = () => {
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const maxLength = 70;

  useEffect(() => {
    const fetchDiscountsByShop = async () => {
      try {
        const response = await axios.get(`https://d3-api.onrender.com/api/v1/discounts`);
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
    <div className='w-full px-[5%] flex flex-col bg-gray-50 mb-[2%]'>
      <p className="text-black font-medium text-[24px]">
        Featured Products & Services | 2024
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {discounts.map((item) => (
          <Link to={`/discount/${item._id}/see-details`} key={item._id} className="bg-white rounded-md p-4 shadow-md">
            <div className="relative">
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-32 object-cover mb-2"
                style={{ filter: 'brightness(80%) blur(1px)' }}
              />
              <div className="absolute inset-0 flex items-center p-2">
                <img
                  src={item.store.imageUrl}
                  alt={`${item.name} Store`}
                  className="w-[25%] rounded-md shadow-md"
                />
              </div>
            </div>
            <p className="text-black font-semibold mb-2">{item.name}</p>
            <p className="text-[14px] text-gray-500">
              {item.description.length > maxLength ?
                `${item.description.substring(0, maxLength)}...` :
                item.description
              }
            </p>
            <div className="flex mt-2 items-center justify-between w-full">
              <div className="flex gap-1 iems-center">
                <p className="text-gray-500 text-[14px] line-through">{`Ksh. ${item.initialPrice.toLocaleString("KES")}`}</p>
                <p className="text-primary font-medium text-[14px] ml-2">
                  {`Ksh. ${item.priceAfterDiscount.toLocaleString("KES")}`}
                </p>
              </div>
              <p className="text-primary font-medium bg-secondary px-2 py-1 rounded-md">{item.percentageDiscount}% OFF</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FeaturedOffers;
