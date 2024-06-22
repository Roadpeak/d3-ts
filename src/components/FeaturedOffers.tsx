import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ShimmerLoader from '../utils/elements/ShimmerLoader';

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

  useEffect(() => {
    const fetchDiscountsByShop = async () => {
      try {
        const response = await axios.get(`https://api.discoun3ree.com/api/discounts`);
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

  const handleGetOffer = (discount: Discount) => {
    navigate(`/${discount.id}/checkout`);
    window.location.reload();
  };

  const handleSeeDetails = (discount: Discount) => {
    navigate(`/discount/${discount.id}/see-details`);
    window.location.reload();
  };

  return (
    <div className='w-full px-[5%] flex flex-col bg-gray-100 pb-4'>
      <p className="text-gray-600 font-medium mb-2 text-[20px]">
        Top Selling | 2024
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {loading ? (
          <ShimmerLoader count={4} />
        ) : (
          discounts.map((item) => (
            <div key={item.id} className="bg-white flex flex-col justify-between rounded-md p-4">
              <img src={item.image_url} className='rounded-md' alt="" />
              <div className="flex flex-col">
                <p className="text-black my-2 font-medium text-[16px]">{item.name}</p>
                <div className="flex mt-2 items-center justify-between w-full">
                  <div className="flex gap-1 items-center">
                    <p className="text-gray-500 text-[14px] line-through">{`${item.initial_price}`}</p>
                    <p className="text-primary font-semibold text-[14px] ml-2">
                      {`Ksh. ${item.price_after_discount}`}
                    </p>
                  </div>
                </div>
                <p className="text-[13px] text-gray-600 "><span className=''>{formatExpiryDate(item.expiry_date)}</span></p>
                <div className="flex w-full gap-[2%]">
                  {new Date(item.expiry_date) > new Date() ? (
                    <>
                      <a
                        href={`/${item.id}/checkout`}
                        className="w-full rounded-md text-center border text-[14px] border-third text-third px-2 items-center py-1"
                        onClick={() => handleGetOffer(item)}
                        title="Get offer"
                      >
                        Get offer
                      </a>
                      <a
                        href={`/discount/${item.id}/see-details`}
                        className="w-full rounded-md text-center text-[14px] bg-primary text-white px-2 items-center py-1"
                        onClick={() => handleSeeDetails(item)}
                        title="See Details"
                      >
                        See Details
                      </a>
                    </>
                  ) : (
                    <>
                      <button
                        className="w-full rounded-md border border-third text-third py-1"
                        disabled
                        title="Expired"
                      >
                        Expired
                      </button>
                      <button
                        className="w-full rounded-md bg-primary text-white py-1"
                        disabled
                        title="Expired"
                      >
                        Expired
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedOffers;
