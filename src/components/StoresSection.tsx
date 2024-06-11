import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SkeletonLoader from "../utils/elements/SkeletonLoader";
import { FaExternalLinkAlt } from "react-icons/fa";

interface Store {
  _id: string;
  name: string;
  imageUrl: string;
  number: number;
  storeType: String;
}

const StoresSection = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStores = async () => {
    try {
      const token = localStorage.getItem('access_token');
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
    <div className='w-full px-[5%] flex flex-col bg-gray-100 pb-[2%]'>
      <div className="flex items-center justify-between">
        <p className="text-black font-semibold mb-[1%] text-[24px]">
        Top Stores | 2024
      </p>
      <Link className="text-primary" to={'/stores'}>More Stores</Link>
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
            <a href={`/stores/${store?._id}/view`} key={store?._id} className="bg-white flex flex-col items-center justify-between rounded-md px-4 py-2 hover:shadow-md cursor-pointer">
              <div className="flex flex-col justify-center mx-auto relative ">
                <div className="bg-white shadow-xl mb-2  mx-auto  w-[30%]">
                  <img
                    src={store.imageUrl}
                    alt={store.name}
                    className="w-full mx-auto rounded-sm shadow-lg object-cover"
                  />
                </div>
                <p className="text-center text-black font-semibold">{store.name}</p>
                <p className="text-center text-[13px] text-[#FF9021]">{store.storeType}</p>
                <div className="text-[#FF9021] border border-[#FF9021] p-1 hover:border-primary hover:text-primary absolute top-0 right-0 rounded-md">
                  <FaExternalLinkAlt />
                </div>
              </div>
            </a>
          ))
        )}
      </div>
    </div>
  );
};

export default StoresSection;
