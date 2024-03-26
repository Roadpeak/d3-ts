import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Store {
  _id: string;
  name: string;
  imageUrl: string;
  number: number;
}

const Stores: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);

  const fetchStores = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<{ stores: Store[] }>('http://localhost:4000/api/v1/stores', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setStores(response.data.stores);
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
          <div className="w-full h-[120px] flex justify-center items-end text-white font-medium capitalize text-[20px] rounded-md bg-[url('https://images.unsplash.com/photo-1647221598270-e7a8716fef08?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTB8fGRpc2NvdW50fGVufDB8fDB8fHww')]">
            fashion & clothing
          </div>
          <div className="w-full h-[120px] flex justify-center items-end text-white font-medium capitalize text-[20px] rounded-md bg-[url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODR8fGRpc2NvdW50fGVufDB8fDB8fHww')]">
            Beauty
          </div>
          <div className="w-full h-[120px] flex justify-center items-end text-white font-medium capitalize text-[20px] rounded-md bg-[url('https://images.unsplash.com/photo-1423666523292-b458da343f6a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NzJ8fGRpc2NvdW50fGVufDB8fDB8fHww')]">
            Cleaning
          </div>
          <div className="w-full h-[120px] flex justify-center items-end text-white font-medium capitalize text-[20px] rounded-md bg-[url('https://images.unsplash.com/photo-1545535408-2b4d520cbd88?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fGRpc2NvdW50fGVufDB8fDB8fHww')]">
            photography
          </div>
          <div className="w-full h-[120px] flex justify-center items-end text-white font-medium capitalize text-[20px] rounded-md bg-[url('https://images.unsplash.com/photo-1566997560041-002fd549180b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGRpc2NvdW50fGVufDB8fDB8fHww')]">
            videography
          </div>
          <div className="w-full h-[120px] flex justify-center items-end text-white font-medium capitalize text-[20px] rounded-md bg-[url('https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fGRpc2NvdW50fGVufDB8fDB8fHww')]">
            Tech
          </div>
          <div className="w-full h-[120px] flex justify-center items-end text-white font-medium capitalize text-[20px] rounded-md bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGRpc2NvdW50fGVufDB8fDB8fHww')]">
            photo mount
          </div>
        </div>
        <p className="font-medium text-[18px] md:text-[25px]">
          Double Cash Back Event Featured Stores | Mar 2024
        </p>
        <div className="grid grid-cols-2 md:grid-cols-6 w-full lg:grid-cols-6 gap-4">
          {stores.map((store) => (
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

export default Stores
