import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SkeletonLoader from "../utils/elements/SkeletonLoader";
import { FaExternalLinkAlt } from "react-icons/fa";
import CategorySlider from "../utils/elements/CategorySlider";

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


const Stores: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

 const fetchStores = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<Store[]>('https://api.discoun3ree.com/api/shops', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
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

  return (
    <div className='flex flex-col w-full bg-gray-100'>
      <Navbar />
      <div className="w-full flex flex-col px-[5%] py-[2%]">
        <div className="flex flex-col justify-center items-center text-center w-full ">
          <p className="text-[18px] md:text-[24px] font-medium text-center">
            Stores with cashbacks, Coupon Codes & Promo Codes
          </p>
          <p className="text-[16px] font-light text-gray-700">
            Get Extra 5% Bonus at over 1000 stores
          </p>
        </div>
        <CategorySlider />
        <p className="text-gray-600 font-medium mb-2 text-[20px]">
          Double Cash Back Event Featured Stores | Mar 2024
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
                  <div className="bg-white shadow-xl mb-2  mx-auto  w-[40%]">
                    <img
                      src={store.image_url}
                      alt={store.name}
                      className="w-full mx-auto rounded-sm object-cover"
                    />
                  </div>
                  <p className="text-center text-gray-600 font-medium">{store.name}</p>
                  <p className="text-center text-[13px] text-[#FF9021]">{store.store_type}</p>
                  <div className="text-[#FF9021] border border-[#FF9021] p-1 hover:border-primary hover:text-primary absolute top-0 right-0 rounded-md">
                    <FaExternalLinkAlt />
                  </div>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Stores;
