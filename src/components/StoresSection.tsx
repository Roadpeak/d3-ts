import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SkeletonLoader from "../utils/elements/SkeletonLoader";
import { FaExternalLinkAlt } from "react-icons/fa";

interface Store {
  id: string;
  name: string;
  image_url: string;
  number: number;
  store_type: String;
}

const StoresSection = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStores = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get<Store[]>('https://api.discoun3ree.com/api/shops', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStores(response.data);
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
      <div className="flex items-center justify-between mt-4">
        <p className="text-gray-600 font-medium text-[20px]">
        Top Stores | 2024
      </p>
      <Link className="text-primary items-center font-medium hover:border-b border-primary text-[15px] flex gap-2" to={'/stores'}>More Stores <FaExternalLinkAlt className="font-light" size={18} /> </Link>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-5 w-full lg:grid-cols-7 gap-4 mb-4 mt-2">
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
                <div className="bg-transparent mb-2  mx-auto  w-[40%]">
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
  );
};

export default StoresSection;
