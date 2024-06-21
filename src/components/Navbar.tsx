import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { FaRegHeart, FaRegUser, FaSearch } from "react-icons/fa";
import { FiUser } from 'react-icons/fi';
import { CiBookmarkPlus } from "react-icons/ci";
import { BiSolidDiscount } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/context/AuthContext';
import { MdOutlineAddShoppingCart, MdOutlineDiscount } from 'react-icons/md';
import logo from '../assets/logo1.png'
import { IoIosMenu, IoMdAdd } from 'react-icons/io';
import addStore from '../services/addStore';
import handleImageChange from '../services/handleImageChange';
import fetchOwnerStores from '../services/fetchownerStores';
import { Spinner } from '@material-tailwind/react';
import { LuLayoutDashboard } from "react-icons/lu";
import { toast } from 'react-toastify';

interface Shop {
  id: string;
  name: string,
  location: string,
  store_type: string,
}

interface StoreData {
  name: string;
  location: string;
  store_type: string;
  image_url: string; 
}

const Navbar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [stores, setStores] = useState<Shop[]>([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [openForm, setOpenForm] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [storeData, setStoreData] = useState<StoreData>({
    name: '',
    location: '',
    store_type: '',
    image_url: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStoreData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCloseAddStore = () => {
    setOpenForm(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        const imageUrl = await handleImageChange(file);
        setStoreData(prevState => ({
          ...prevState,
          image_url: imageUrl
        }));
        console.log("image: ", imageUrl);
      } catch (error) {
        toast.error("Error uploading Image");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await addStore(storeData, setLoading, handleCloseAddStore);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate(`/search?query=${searchQuery}`);
  };
  const token = localStorage.getItem('access_token');

  useEffect(() => {
    if (token) {
      fetchOwnerStores(token, setStores);
    }
  }, [token]);

  const logoutUser = () => {
    localStorage.removeItem('access_token');
    window.location.reload();
  };

  return (
    <>
      <div className='flex w-full py-2 px-[5%] items-center justify-between items-center bg-gray-50 '>
        <img className='w-[150px] hidden md:flex pb-[10px]' src={logo} alt="" />
        <p className="text-[18px] flex md:hidden font-medium italic">D3</p>
        <div className="flex items-center gap-[30px] w-fit px-4">
          <form onSubmit={handleSearch} className="active:border-primary md:hidden flex items-center bg-transparent rounded-full border border-gray-300 w-fit gap-2 pl-2 md:pl-10 pr-2 md:pr-4">
            <input
              type="text"
              placeholder='Search'
              className='outline-none py-1 w-fit bg-transparent'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="outline-none" type='submit'>
              <FaSearch size={20} className='text-gray-600 font-light text-[15px]' />
            </button>
          </form>
        </div>
          <div className="flex items-center gap-[30px] md:pr-[13%] ">
            <form onSubmit={handleSearch} className="hidden active:border-primary md:flex items-center bg-transparent rounded-full border border-gray-300  w-[450px] gap-2 pl-10 pr-4">
              <input
                type="text"
                placeholder='Search'
                className='outline-none py-2 w-full bg-transparent'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="outline-none" type='submit'>
                <FaSearch size={20} className='text-gray-500' />
              </button>
            </form>
          </div>
        <div className="relative">
          <>
            {user ? (
              <button onClick={() => setOpen(!open)} className="flex items-center gap-2 hover:text-primary cursor-pointer">
                <p className="hidden md:flex">Hi, {user?.firstName}</p> <FiUser size={24} className='text-gray-500 border rounded-full border-gray-400 p-1' />
              </button>
            ) : (
              <>
                <div className="flex flex-col items-center relative text-white">
                  <div className="flex relative w-full">
                    <a href='/accounts/sign-in' className="flex text-black md:hidden">
                      <IoIosMenu size={24} />
                    </a>
                    <a href={`/accounts/sign-in`} className='px-4 py-1 text-gray-500 mr-2 bg-transparent border hidden md:flex border-gray-300 rounded-full hover:text-primary hover:border-primary'>Login</a>
                    <a href={`/accounts/sign-up`} className='px-4 py-1 text-gray-500 ml-2 bg-transparent border hidden md:flex border-gray-300 rounded-full hover:text-primary hover:border-primary'>Register</a>
                  </div>
                </div>
              </>
            )}
            {open && (
              <div className="absolute z-20 top-[100%] mt-4 right-0 w-[150px] bg-white shadow-md rounded-md flex flex-col p-4 gap-2">
                <a href='/accounts/profile' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><FaRegUser /> Account</a>
                <a href='/my-bookings' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><CiBookmarkPlus />Bookings</a>
                <a href='/' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><MdOutlineAddShoppingCart /> Cart</a>
                <a href='/' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><FaRegHeart /> Saved</a>
                <a href='/' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><MdOutlineDiscount /> Coupons</a>
                <a href='/' className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2 "><BiSolidDiscount /> Vouchers</a>
                {user && user.user_type === 'admin' ? (
                  <>
                  <a href={`/manage`} className=''>
                    <button
                      className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2"
                    >
                      <LuLayoutDashboard />
                      Dashboard
                    </button>
                  </a>
                  </>
                ) : (
                  <></>
                )}
                {user && user.user_type === 'seller' && stores.length !== 0 ? (
                  <a href={stores.length > 0 ? `/store/${stores[0]?.id}/home` : '#'} className=''>
                    <button
                      className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2"
                    >
                      <LuLayoutDashboard />
                      Dashboard
                    </button>
                  </a>
                ) : (
                  <div>
                    {user?.user_type === 'seller' && (
                      <button
                        onClick={() => setOpenForm(true)}
                        className="text-[16px] text-gray-600 hover:text-primary flex items-center gap-2"
                      >
                        <IoMdAdd />
                        Add Store
                      </button>
                    )}
                  </div>
                )}
                <button className="bg-primary text-white rounded-md py-1.5" onClick={logoutUser}>
                  Log Out
                </button>
              </div>
            )}
          </>
        </div>
      </div>
      <div className="bg-primary flex items-center justify-center gap-2 py-2 ">
        <Link to={`/`} className='text-gray-50 px-4 hover:text-white cursor-pointer  '>Home</Link>
        <Link to={`/stores`} className='text-gray-50 px-4 hover:text-white cursor-pointer  '>Stores</Link>
        <Link to={`/deals`} className='text-gray-50 px-4 hover:text-whitw cursor-pointer  '>Deals</Link>
      </div>
      {openForm && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white max-h-[90vh] overflow-auto rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Add New Store</h2>
            <p className="text-center mb-6 text-gray-600">To proceed to your dashboard, you need to create at least one store.</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Store Name</label>
                <input  
                  type="text"
                  id="name"
                  name="name"
                  value={storeData.name}
                  placeholder='e.g. QBF Software Solutions'
                  className="mt-1 p-3 block w-full rounded border border-gray-300 focus:border-primary focus:outline-none"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={storeData.location}
                  placeholder='e.g. Shiloh Residence, Kilimani'
                  className="mt-1 p-3 block w-full rounded border border-gray-300 focus:border-primary focus:outline-none"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="store_type" className="block text-sm font-medium text-gray-700">Store Type</label>
                <input
                  type="text"
                  id="store_type"
                  name="store_type"
                  value={storeData.store_type}
                  placeholder='e.g. nail spa, make up. etc...'
                  className="mt-1 p-3 block w-full rounded border border-gray-300 focus:border-primary focus:outline-none"
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  className="mt-1 p-3 block w-full rounded border border-gray-300 focus:border-primary focus:outline-none"
                  onChange={handleImageUpload}
                />
              </div>
              {isLoading && (
                <div className="flex items-center justify-center mt-2">
                  <Spinner />
                  <span className="ml-2">Uploading...</span>
                </div>
              )}
              {imageUrl && (
                <div>
                  <img src={imageUrl} alt="Uploaded" className="mt-4 w-full rounded" />
                </div>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-gray-600 mr-4"
                  onClick={handleCloseAddStore}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-white px-6 py-3 rounded-md hover:bg-opacity-80"
                  disabled={isLoading}
                >
                  {isLoading ? 'Adding...' : 'Add Store'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}

export default Navbar;
