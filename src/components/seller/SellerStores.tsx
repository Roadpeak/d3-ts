import React, { useState } from 'react';
import SellerLayout from '../../utils/layouts/SellerLayout';
import { CgProfile } from 'react-icons/cg';
import { FaChevronDown } from 'react-icons/fa';
import { IoMdAdd } from "react-icons/io";

const fakeStoreData = [
  { id: 1, name: 'Store 1', location: 'New York', imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RvcmV8ZW58MHx8MHx8fDA%3D' },
  { id: 2, name: 'Store 2', location: 'Los Angeles', imageUrl: 'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c3RvcmV8ZW58MHx8MHx8fDA%3D' },
  { id: 3, name: 'Store 3', location: 'Chicago', imageUrl: 'https://images.unsplash.com/photo-1534723452862-4c874018d66d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c3RvcmV8ZW58MHx8MHx8fDA%3D' },
  { id: 4, name: 'Store 4', location: 'Houston', imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8c3RvcmV8ZW58MHx8MHx8fDA%3D' },
];

const SellerStores: React.FC = () => {
  const [isAddStoreOpen, setIsAddStoreOpen] = useState(false);

  const handleAddStoreClick = () => {
    setIsAddStoreOpen(true);
  };

  const handleCloseAddStore = () => {
    setIsAddStoreOpen(false);
  };

  return (
    <SellerLayout>
      <div className="">
        <div className="w-full flex justify-between p-4 shadow-md border-b px-[3%]">
          <div className=""></div>
          <div className="flex items-center gap-2 text-gray-500 ">
            <CgProfile size={26} />
            <p className="text-gray-500 ">Salvato Luis</p>
            <FaChevronDown />
          </div>
        </div>
        <div className="container mx-auto py-8">
          <div className="flex w-full justify-between items-center mb-2">
            <h1 className="text-3xl font-semibold mb-6">Your Stores</h1>
            <button className="flex bg-primary items-center gap-1 text-white px-4 py-2 rounded-md" onClick={handleAddStoreClick}><IoMdAdd />Add new store</button>
          </div>
          <table className="w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-2 text-start px-4">ID</th>
                <th className="py-2 text-start px-4">Name</th>
                <th className="py-2 text-start px-4">Location</th>
              </tr>
            </thead>
            <tbody>
              {fakeStoreData.map((store) => (
                <tr key={store.id} className="border-b">
                  <td className="py-2 px-4">{store.id}</td>
                  <td className="py-2 px-4">{store.name}</td>
                  <td className="py-2 px-4">{store.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {isAddStoreOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New Store</h2>
            <form className="space-y-4">
              <div>
                <label htmlFor="storeName" className="block text-sm font-medium text-gray-700">Store Name</label>
                <input
                  type="text"
                  id="storeName"
                  name="storeName"
                  placeholder='e.g. QBF Software Solutions'
                  className="mt-1 p-3 block w-full rounded border border-gray-300 focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  placeholder='e.g. Shiloh Residence, Kilimani'
                  className="mt-1 p-3 block w-full rounded border border-gray-300 focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="store_type" className="block text-sm font-medium text-gray-700">Store Type</label>
                <input
                  type="text"
                  id="store_type"
                  name="store_type"
                  placeholder='e.g. nail spa, make up. etc...'
                  className="mt-1 p-3 block w-full rounded border border-gray-300 focus:border-primary focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload Image</label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  className="mt-1 p-3 block w-full rounded border border-gray-300 focus:border-primary focus:outline-none"
                />
              </div>
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
                >
                  Add Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </SellerLayout>
  );
};

export default SellerStores;
