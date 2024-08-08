import React, { useEffect, useState } from 'react';
import AdminLayout from '../../utils/layouts/AdminLayout';
import { getUnverifiedDiscounts, verifyDiscount } from '../../services/apiService';
import PopupModal from '../../utils/elements/PopupModal';
import { toast } from 'react-toastify';
import SideMenu from './SideMenu';
import { getCookie } from '../../utils/cookiUtils';


const UnverifiedDiscounts:React.FC = () => {
  const [discounts, setDiscounts] = useState<any[]>([]);
  const [selectedDiscount, setSelectedDiscount] = useState<any | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

   useEffect(() => {
    const fetchUnverifiedDiscounts = async () => {
      try {
        const discounts = await getUnverifiedDiscounts();
        setDiscounts(discounts);
      } catch (error) {
        toast.error("An error occured.")
      }
    };

    fetchUnverifiedDiscounts();
  }, []);

 const handleVerify = async (id: number) => {
    try {
      await verifyDiscount({
        discountId: id,
        accessToken: getCookie('access_token') || '',
      });
      const updatedDiscounts = discounts.map(discount => {
        if (discount.id === id) {
          return { ...discount, verified: true }; 
        }
        return discount;
      });
      setDiscounts(updatedDiscounts);
      setShowDetailsModal(false);
      window.location.reload();
      toast("Discount verified!");
    } catch (error) {
      toast.error("An error occured!")
    }
  };

  const handleCloseModal = () => {
    setShowDetailsModal(false);
    setShowDeleteConfirmModal(false);
  };

  const handleRowClick = (discount: any) => {
    setSelectedDiscount(discount);
    setShowDetailsModal(true);
  };

  return (
    <AdminLayout>
      <div className="flex flex-col">
        <SideMenu />
        <div className="w-full gap-2 flex flex-col py-8">
          <div className="flex w-full justify-between items-center">
            <p className="font-medium text-[13px] text-dark tracking-wide">Latest</p>
            <input type="text" placeholder='Search here' className='bg-light w-[220px] focus:border-secondary outline-none text-[11px] rounded-full py-2 px-3.5 ' />
          </div>
          <div className="w-full rounded-md mt-2 bg-white overflow-x-auto">
            <div className="w-full rounded-lg">
              <table className="table-auto w-full rounded-md">
                <thead className=''>
                  <tr className=" border-b-[2px] border-gray-200 text-[13px] bg-gray-100 text-[#002A4D] font-medium">
                    <th className="px-4 text-start font-normal pb-2 pt-4">Name</th>
                    <th className="px-4 text-start font-normal pb-2 pt-4">Price</th>
                    <th className="px-4 text-start font-normal pb-2 pt-4">Discount</th>
                    <th className="px-4 text-start font-normal pb-2 pt-4">Expiry</th>
                    <th className="px-4 text-start font-normal pb-2 pt-4">Actions</th>
                  </tr>
                </thead>
                <tbody className='text-[12.04px] text-[#646882]'>
                  {discounts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="text-center py-4">
                        No pending verifications found.
                      </td>
                    </tr>
                  ) : (
                    discounts.map((discount) => (
                      <tr key={discount.id} className="border-b py-2 border-gray-100 hover:bg-gray-100">
                        <td className="px-4 py-3 cursor-pointer" onClick={() => handleRowClick(discount)}>{discount.name}</td>
                        <td className="px-4 py-3 cursor-pointer" onClick={() => handleRowClick(discount)}>{discount.initial_price}</td>
                        <td className="px-4 py-3 cursor-pointer" onClick={() => handleRowClick(discount)}>{discount.discount}</td>
                        <td className="px-4 py-3 cursor-pointer" onClick={() => handleRowClick(discount)}>{new Date(discount.expiry_date).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <button onClick={() => { setSelectedDiscount(discount); setShowDetailsModal(true); }} className="text-green-500 hover:text-green-700">Verify</button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {showDetailsModal && (
          <PopupModal
            discount={selectedDiscount}
            actionType="verify"
            onClose={handleCloseModal}
            onAction={() => handleVerify(selectedDiscount.id)}
          />
        )}
      </div>
    </AdminLayout>
  );
};

export default UnverifiedDiscounts