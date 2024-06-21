import React, { useEffect, useState } from 'react';
import SellerLayout from '../../elements/SellerLayout';
import { useParams } from 'react-router-dom';
import { getUnverifiedDiscountsByShop } from '../../services/apiService';
import { toast } from 'react-toastify';

interface Discount {
  id: number;
  name: string;
  initial_price: number;
  discount: number;
  expiry_date: string;
}

const OwnerUnverified: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [discounts, setDiscounts] = useState<Discount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        if (id) {
          const data = await getUnverifiedDiscountsByShop(Number(id));
          setDiscounts(data);
        } else {
          toast.error('Shop ID is missing.');
        }
      } catch (error) {
        toast.error('Failed to fetch unverified discounts.');
      } finally {
        setLoading(false);
      }
    };

    fetchDiscounts();
  }, [id]);

  const handleRowClick = (discount: Discount) => {
    console.log(discount);
  };

  return (
    <SellerLayout>
      <div className="w-full gap-2 flex flex-col">
        <div className="flex w-full justify-between items-center">
          <p className="font-medium text-[13px] text-dark tracking-wide">Unverified Discounts</p>
          <input
            type="text"
            placeholder="Search here"
            className="bg-light w-[220px] focus:border-secondary outline-none text-[11px] rounded-full py-2 px-3.5"
          />
        </div>
        <div className="w-full rounded-md mt-2 bg-white overflow-x-auto">
          <div className="bg-light w-full rounded-lg">
            <table className="table-auto w-full rounded-md">
              <thead className="">
                <tr className="bg-light border-b-[2px] border-gray-200 text-[13px] bg-gray-100 text-[#002A4D] font-medium">
                  <th className="px-4 text-start font-normal pb-2 pt-4">Name</th>
                  <th className="px-4 text-start font-normal pb-2 pt-4">Price</th>
                  <th className="px-4 text-start font-normal pb-2 pt-4">Discount</th>
                  <th className="px-4 text-start font-normal pb-2 pt-4">Expiry</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-[12.04px] text-[#646882]">
                {loading ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      Loading...
                    </td>
                  </tr>
                ) : discounts.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-center py-4">
                      No unverified discounts found.
                    </td>
                  </tr>
                ) : (
                  discounts.map((discount) => (
                    <tr
                      key={discount.id}
                      onClick={() => handleRowClick(discount)}
                      className="cursor-pointer border-b py-2 border-gray-100 hover:bg-gray-100"
                    >
                      <td className="px-4 py-3">{discount.name}</td>
                      <td className="px-4 py-3">{discount.initial_price}</td>
                      <td className="px-4 py-3">{discount.discount}</td>
                      <td className="px-4 py-3">{new Date(discount.expiry_date).toLocaleDateString()}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default OwnerUnverified;
