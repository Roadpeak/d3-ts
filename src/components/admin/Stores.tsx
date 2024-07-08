import React, { useEffect, useState } from 'react';
import AdminLayout from '../../utils/layouts/AdminLayout';
import { fetchShops, verifyShop, unverifyShop } from '../../services/apiService';
import Modal from './Modal';

interface Shop {
  id: number;
  name: string;
  location: string;
  seller_first_name: string;
  seller_last_name: string;
  seller_phone: string;
  verified: boolean;
}

const ManageStores: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedShop, setSelectedShop] = useState<Shop | null>(null);

  useEffect(() => {
    const fetchShopsData = async () => {
      setLoading(true);
      try {
        const shopsData = await fetchShops();
        setShops(shopsData);
      } catch (error) {
        console.error('Error fetching shops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopsData();
  }, []);

  const handleRowClick = (shop: Shop) => {
    setSelectedShop(shop);
  };

  const handleVerify = async () => {
    if (selectedShop) {
      try {
        await verifyShop(selectedShop.id);
        setShops(shops.map(shop => shop.id === selectedShop.id ? { ...shop, verified: true } : shop));
        setSelectedShop({ ...selectedShop, verified: true });
      } catch (error) {
        console.error('Error verifying shop:', error);
      }
    }
  };

  const handleUnverify = async () => {
    if (selectedShop) {
      try {
        await unverifyShop(selectedShop.id);
        setShops(shops.map(shop => shop.id === selectedShop.id ? { ...shop, verified: false } : shop));
        setSelectedShop({ ...selectedShop, verified: false });
      } catch (error) {
        console.error('Error unverifying shop:', error);
      }
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="w-full rounded-md mt-2 bg-white overflow-x-auto">
          <div className="w-full rounded-lg">
            <table className="table-auto w-full rounded-md">
              <thead className="">
                <tr className="bg-gray-100 border-b-[2px] border-gray-200 text-[13px] bg-gray-100 text-[#002A4D] font-medium">
                  <th className="px-4 text-start font-normal pb-2 pt-4">#</th>
                  <th className="px-4 text-start font-normal pb-2 pt-4">Name</th>
                  <th className="px-4 text-start font-normal pb-2 pt-4">Owner</th>
                  <th className="px-4 text-start font-normal pb-2 pt-4">Location</th>
                  <th className="px-4 text-start font-normal pb-2 pt-4">Phone</th>
                  <th className="px-4 text-start font-normal pb-2 pt-4">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-[12.04px] text-[#646882]">
                {shops.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4">
                      No shops found.
                    </td>
                  </tr>
                ) : (
                  shops.map((shop, index) => (
                    <tr
                      key={shop.id}
                      className="border-b py-2 border-gray-100 hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleRowClick(shop)}
                    >
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{shop.name}</td>
                      <td className="px-4 py-3 uppercase">{shop.seller_first_name} {shop.seller_last_name}</td>
                      <td className="px-4 py-3">{shop.location}</td>
                      <td className="px-4 py-3">{shop.seller_phone}</td>
                      <td className="px-4 py-3">
                        {shop.verified ? (
                          <span className="text-green-500">Verified</span>
                        ) : (
                          <span className="text-red-500">Not Verified</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedShop && (
        <Modal onClose={() => setSelectedShop(null)}>
          <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Shop Details</h2>
            <div className="mb-4">
              <p className='flex w-full items-center justify-between border-b border-gray-200 mb-2 text-gray-800'>Name <span className="text-gray-600 font-light text-[14px]">{selectedShop.name}</span></p>
              <p className='flex w-full items-center justify-between border-b border-gray-200 mb-2 text-gray-800'>Owner <span className="text-gray-600 font-light text-[14px]">{selectedShop.seller_first_name} {selectedShop.seller_last_name}</span></p>
              <p className='flex w-full items-center justify-between border-b border-gray-200 mb-2 text-gray-800'>Location <span className="text-gray-600 font-light text-[14px]">{selectedShop.location}</span></p>
              <p className='flex w-full items-center justify-between border-b border-gray-200 mb-2 text-gray-800'>Phone <span className="text-gray-600 font-light text-[14px]">{selectedShop.seller_phone}</span></p>
              <p className='flex w-full items-center justify-between border-b border-gray-200 mb-2 text-gray-800'>
                Verified: 
                {selectedShop.verified ? (
                  <span className="text-green-500 ml-2">Verified</span>
                ) : (
                  <span className="text-red-500 ml-2">Not Verified</span>
                )}
              </p>
            </div>
            <div className="flex gap-4">
              {selectedShop.verified ? (
                <button
                  className="bg-red-500 text-white px-6 py-1 rounded"
                  onClick={handleUnverify}
                >
                  Suspend
                </button>
              ) : (
                <button
                  className="bg-green-500 text-white px-6 py-1 rounded"
                  onClick={handleVerify}
                >
                  Verify
                </button>
              )}
              <button
                className="bg-gray-200 text-gray-700 px-6 py-1 rounded"
                onClick={() => setSelectedShop(null)}
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </AdminLayout>
  );
};

export default ManageStores;
