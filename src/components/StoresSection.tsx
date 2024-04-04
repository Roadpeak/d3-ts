import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SkeletonLoader from "../utils/elements/SkeletonLoader";

interface Store {
  _id: string;
  name: string;
  imageUrl: string;
  number: number;
}

const StoresSection = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div className='w-full px-[5%] flex flex-col bg-gray-50 pb-[2%]'>
      <p className="text-black font-semibold mb-[1%] text-[24px]">
        Top Stores | 2024
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
            <Link to={`/stores/${store?._id}/view`} key={store?._id} className="bg-white flex flex-col items-center justify-center rounded-md p-4 shadow-md hover:shadow-xl cursor-pointer">
              <img
                src={store.imageUrl}
                alt={store.name}
                className="w-[70%] rounded-md object-cover mb-2"
              />
              <p className="text-black font-semibold">{store.name}</p>
              <p className="text-gray-500"><span className='text-primary'>see deals</span></p>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default StoresSection;
