import React, { useEffect, useState } from 'react';
import AdminLayout from '../../utils/layouts/AdminLayout';
import axios from 'axios';
import { deleteDiscount } from '../../services/apiService';
import PopupModal from '../../utils/elements/PopupModal';
import ConfirmModal from '../../utils/elements/ConfirmModal';
import SideMenu from './SideMenu';

const ManageDiscounts: React.FC = () => {
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [selectedDiscount, setSelectedDiscount] = useState<any | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVerifiedDiscounts = async () => {
      try {
        const response = await axios.get('https://api.discoun3ree.com/api/discounts', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
          },
        });
        setDiscounts(response.data);
      } catch (error) {
        console.error('Error fetching discounts:', error);
      }
    };

    fetchVerifiedDiscounts();
  }, []);

  const handleRowClick = (discount: any) => {
    setSelectedDiscount(discount);
    setShowDetailsModal(true);
  };

  const handleDelete = async () => {
    if (!selectedDiscount) return;

    try {
      setLoading(true);
      await deleteDiscount(selectedDiscount.id);
      setLoading(false);
      const updatedDiscounts = discounts.filter(discount => discount.id !== selectedDiscount.id);
      setDiscounts(updatedDiscounts);
      setShowDeleteConfirmModal(false);
    } catch (error) {
      setLoading(false);
      console.error('Error deleting discount:', error);
    }
  };

  const closeModal = () => {
    setSelectedDiscount(null);
    setShowDetailsModal(false);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col">
        <SideMenu />
        <div className="w-full gap-2 flex flex-col py-2 overflow-y-auto">
        <div className="flex w-full justify-between items-center">
          <p className="font-medium text-[13px] text-dark tracking-wide">Discounts</p>
          <input type="text" placeholder='Search here' className='bg-light w-[220px] focus:border-secondary outline-none text-[11px] rounded-full py-2 px-3.5 ' />
        </div>
        <div className="w-full rounded-md mt-2 bg-white overflow-auto">
          <div className="bg-light w-full rounded-lg">
            <table className="table-auto w-full rounded-md">
              <thead className=''>
                <tr className="bg-light border-b-[2px] border-gray-200 text-[13px] bg-gray-100 text-[#002A4D] font-medium">
                  <th className="px-4 text-start font-normal pb-2 pt-4">Id</th>
                  <th className="px-4 text-start font-normal pb-2 pt-4">Name</th>                  
                  <th className="px-4 text-start font-normal pb-2 pt-4">Price</th>
                  <th className="px-4 text-start font-normal pb-2 pt-4">Discount</th>
                  <th className="px-4 text-start font-normal pb-2 pt-4">Expiry</th>
                  <th className="px-4 text-start font-normal pb-2 pt-4">Actions</th>
                </tr>
              </thead>
              <tbody className='text-gray-600 text-[12.04px] text-[#646882]'>
                {discounts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-4">
                      No Verified discounts found.
                    </td>
                  </tr>
                ) : (
                  discounts.map((discount) => (
                    <tr key={discount.id} className="border-b py-2 border-gray-100 hover:bg-gray-100">
                      <td className="px-4 py-3 cursor-pointer" onClick={() => handleRowClick(discount)}>{discount.id}</td>
                      <td className="px-4 py-3 cursor-pointer" onClick={() => handleRowClick(discount)}>{discount.name}</td>
                      <td className="px-4 py-3 cursor-pointer" onClick={() => handleRowClick(discount)}>{discount.initial_price}</td>
                      <td className="px-4 py-3 cursor-pointer" onClick={() => handleRowClick(discount)}>{discount.discount}</td>
                      <td className="px-4 py-3 cursor-pointer" onClick={() => handleRowClick(discount)}>{new Date(discount.expiry_date).toLocaleDateString()}</td>
                      <td className="px-4 py-3">
                        <button className="text-red-500 hover:text-red-700">Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {showDetailsModal && selectedDiscount && (
         <PopupModal
          discount={selectedDiscount}
          actionType="delete"
          onClose={closeModal}
          onAction={handleDelete}
        />
      )}

      {showDeleteConfirmModal && selectedDiscount && (
        <ConfirmModal
          message={`Are you sure you want to delete "${selectedDiscount.name}"?`}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteConfirmModal(false)}
          isLoading={loading}
        />
      )}
      </div>
    </AdminLayout>
  );
};

export default ManageDiscounts;
