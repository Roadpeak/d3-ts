import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SkeletonLoader from "../utils/elements/SkeletonLoader";
import { FaExternalLinkAlt } from "react-icons/fa";
import CategorySlider from "../utils/elements/CategorySlider";
import { fetchRandomDiscounts } from "../services/discountService";
import { Discount } from "../types";

interface Store {
  id: number;
  name: string;
  location: string;
  image_url: string;
  verified: boolean;
  seller_id: number;
  created_at: string;
  updated_at: string;
  store_type: string | null;
}

interface Category {
  name: string;
  image_url: string;
}

const Stores: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const placeholderImage = 'https://imgs.search.brave.com/1qOy-0Ymw2K6EdSAI4515c9T4mh-eoIQbDsp-koZkLw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc';

 const fetchStores = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<Store[]>('https://api.discoun3ree.com/api/shops', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStores(response.data); 
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching stores:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  useEffect(() => {
    const fetchDiscountData = async () => {
      try {
        const data = await fetchRandomDiscounts();
        setDiscounts(data);
      } catch (error) {
        console.error('Error fetching discounts:', error);
      }
    };

    fetchDiscountData();
  }, []);

   useEffect(() => {
    const fetchCategories = async () => {
      try {
        const storedCategories = localStorage.getItem('cachedCategories');
        if (storedCategories) {
          setCategories(JSON.parse(storedCategories));
        }

        const response = await axios.get<Category[]>('https://api.discoun3ree.com/api/random-categories');
        setCategories(response.data);
        localStorage.setItem('cachedCategories', JSON.stringify(response.data));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setLoading(false);
      }
    };

    fetchCategories();

    const interval = setInterval(fetchCategories, 180000); 

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='flex flex-col w-full bg-gray-100'>
      <Navbar />
      <div className="w-full flex flex-col px-[5%] py-[2%]">
        <div className="flex flex-col justify-center items-center text-center w-full ">
          <p className="text-[18px] md:text-[24px] text-center">
            Stores with cashbacks, Coupon Codes & Promo Codes
          </p>
          <p className="text-[16px] font-light text-gray-700">
            Get Extra 5% Bonus at over 100 stores
          </p>
        </div>
        <CategorySlider />
        <p className="text-gray-600 font-medium mb-2 text-[20px]">
          Double Cash Back Stores
        </p>
        <div className="grid grid-cols-2 md:grid-cols-6 w-full lg:grid-cols-7 gap-4">
          {loading ? (
            <>
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
              <SkeletonLoader />
            </>
          ) : (
            stores.map((store) => (
              <a href={`/stores/${store?.id}/view`} key={store?.id} className="bg-white flex flex-col items-center justify-between rounded-md px-4 py-2 hover:shadow-md cursor-pointer">
                <div className="flex flex-col justify-center mx-auto relative ">
                  <div className="bg-white mb-2  mx-auto  w-[40%]">
                    <img
                      src={store.image_url || placeholderImage}
                      alt={store.name}
                      className="w-full mx-auto rounded-sm object-cover"
                    />
                  </div>
                  <p className="text-center text-gray-600 text-[15px] font-medium">{store.name}</p>
                  <p className="text-center text-[12px] text-[#FF9021]">{store.store_type}</p>
                  <div className="text-[#FF9021] border border-[#FF9021] p-1 hover:border-primary hover:text-primary absolute top-0 right-0 rounded-md">
                    <FaExternalLinkAlt />
                  </div>
                </div>
              </a>
            ))
          )}
        </div>
        <div className="flex flex-col my-6 h-full w-full">
          <p className="text-black font-semibold text-[20px] mb-2">Top searched</p>
          <div className="w-full h-full grid grid-cols-2 md:grid-cols-7 w-full lg:grid-cols-6 gap-4">
            {categories.slice(0,6).map((category, index) => (
              <a href={`/search?query=${category.name.toLowerCase()}`} key={index} className='w-full'>
                  <div className='cursor-pointer flex items-center justify-center flex-col bg-gray-50 p-4 rounded-md'>
                    <div className='image-container'>
                      <img src={category.image_url} alt={category.name} className='w-full h-fit m-auto rounded-md mt-3 object-cover' />
                    </div>
                    <span className="text-black mx-auto w-full text-center text-[14px] text-gray-600 font-light mt-2">{category.name}</span>
                  </div>
                </a>
            ))}
          </div>
        </div>
        <div className="flex w-full bg-white p-4 rounded-md flex-col h-full mt-4 mb-6">
          <p className="text-black font-semibold text-[20px] mb-2">You may like</p>
          <div className="w-full grid grid-cols-2 h-full md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {discounts.map((discount, index) => (
              <a href={`/discount/${discount.id}/see-details`} key={index} className='w-full h-full mb-4 relative'>
                <div className="absolute top-4 right-4 rounded-full bg-[#FF9021] text-white text-[14px] font-light w-10 h-10 flex items-center justify-center">
                  -{Math.floor(discount.percentage_discount)}%
                </div>
                <div className='max-w-sm rounded overflow-hidden bg-white'>
                  <img src={discount.image_url} alt={discount.name} className='w-full p-2 object-cover' />
                  <div className='text-[14px] font-medium p-2 truncate-2-lines'>{discount.name}</div>
                  <div className='flex flex-col gap-2 justify-between w-full p-2'>
                    <span className='text-[13px] text-gray-600 font-light'>
                      in {discount.category}
                    </span>
                    <span className='text-primary font-medium text-[16px]'>
                      ksh. {discount.price_after_discount}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Stores;
