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
  store_type: string;
}

interface Category {
  name: string;
  image_url: string;
}

const placeholderImage = 'https://imgs.search.brave.com/1qOy-0Ymw2K6EdSAI4515c9T4mh-eoIQbDsp-koZkLw/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA1Lzk3LzQ3Lzk1/LzM2MF9GXzU5NzQ3/OTU1Nl83YmJRN3Q0/WjhrM3hiQWxvSEZI/VmRaSWl6V0sxUGRP/by5qcGc';

const StoresSection = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
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
    <div className='w-full px-[5%] flex flex-col bg-gray-100 pb-[2%]'>
      <div className="flex items-center justify-between mt-4">
        <p className="text-black font-semibold text-[20px]">Top Stores | 2024</p>
        <Link className="text-primary items-center font-medium hover:border-b border-primary text-[15px] flex gap-2" to={'/stores'}>
          More Stores <FaExternalLinkAlt className="font-light" size={18} />
        </Link>
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
          stores.slice(0, 21).map((store) => (
            <a href={`/stores/${store?.id}/view`} key={store?.id} className="bg-white flex flex-col items-center justify-between rounded-md px-4 py-2 hover:shadow-md cursor-pointer">
              <div className="flex flex-col justify-center mx-auto relative ">
                <div className="bg-transparent mb-2 mx-auto w-[40%]">
                  <img
                    src={store.image_url || placeholderImage}
                    alt={store.name}
                    className="w-full mx-auto rounded-sm object-cover"
                  />
                </div>
                <p className="text-center text-[14px] text-gray-600 font-medium">{store.name}</p>
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
        <p className="text-black font-semibold text-[20px] mb-2">Trending Now</p>
        <div className="w-full h-full grid grid-cols-2 md:grid-cols-7 bg-gray-50 lg:grid-cols-6 gap-4">
          {categories.slice(0, 6).map((category, index) => (
            <a href={`/search?query=${category.name.toLowerCase()}`} key={index} className='w-full'>
              <div className='cursor-pointer flex items-center justify-center flex-col bg-gray-50 p-4 rounded-md'>
                <div className='image-container bg-gray-50'>
                  <img src={category.image_url || placeholderImage} alt={category.name} className='w-full h-fit m-auto rounded-md mt-3 object-cover' />
                </div>
                <span className="text-black mx-auto w-full text-center text-[14px] text-gray-600 font-light mt-2">{category.name}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoresSection;
