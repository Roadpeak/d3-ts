import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SkeletonLoader from "../utils/elements/SkeletonLoader";

interface Store {
  _id: string;
  name: string;
  imageUrl: string;
  number: number;
}

const Stores: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [stores, setStores] = useState<Store[]>([]);

  const fetchStores = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<{ stores: Store[] }>('https://d3-api.onrender.com/api/v1/stores', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStores(response.data.stores);
      setLoading(false); 
    } catch (error) {
      console.error('Error fetching stores:', error);
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
              <Link to={`/stores/${store?._id}/view`} key={store?._id} className="bg-white flex flex-col items-center justify-center rounded-md p-4 shadow-md hover:shadow-xl cursor-pointer">
                <img
                  src={store.imageUrl}
                  alt={store.name}
                  className="w-[50%] rounded-md object-cover mb-2"
                />
                <p className="text-black font-semibold">{store.name}</p>
                <p className="text-gray-500"><span className='text-primary'>see deals</span></p>
              </Link>
            ))
          )}
        </div>
        <p className="font-medium text-[18px] md:text-[25px]">
          Double Cash Back Event Featured Stores | Mar 2024
        </p>
        <div className="grid grid-cols-2 md:grid-cols-6 w-full lg:grid-cols-6 gap-4">
          {!loading && stores.map((store) => (
            <Link to={`/stores/${store?._id}/view`} key={store?._id} className="bg-white flex flex-col items-center justify-center rounded-md p-4 shadow-md hover:shadow-xl cursor-pointer">
              <img
                src={store.imageUrl}
                alt={store.name}
                className="w-[50%] rounded-md object-cover mb-2"
              />
              <p className="text-black font-semibold">{store.name}</p>
              <p className="text-gray-500"><span className='text-primary'>see deals</span></p>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Stores;
