import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SkeletonLoader from "../utils/elements/SkeletonLoader";

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
      const response = await axios.get<Store[]>('http://127.0.0.1:8000/api/shops', {
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
    <div className='flex flex-col w-full'>
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
        <p className="font-medium text-[18px] md:text-[25px]">
          Double Cash Back Event Featured Stores | Mar 2024
        </p>
        <div className="grid grid-cols-2 md:grid-cols-6 w-full lg:grid-cols-7 gap-4 my-[2%]">
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
              <a href={`/stores/${store?.id}/view`} key={store?.id} className="bg-white flex flex-col items-center justify-center rounded-md p-4 shadow-md hover:shadow-xl cursor-pointer">
                <img
                  src={store.image_url}
                  alt={store.name}
                  className="w-[50%] rounded-md object-cover mb-2"
                />
                <p className="text-black font-semibold">{store.name}</p>
                <p className="text-gray-500"><span className='text-primary'>see deals</span></p>
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
