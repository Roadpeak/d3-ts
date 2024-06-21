import React, { useEffect, useState } from 'react';
import AdminLayout from '../../utils/layouts/AdminLayout';
import { fetchShops } from '../../services/apiService'; 
interface Shop {
  id: number;
  name: string;
  location: string;
}
const ManageStores: React.FC = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchShopsData = async () => {
      setLoading(true);
      try {
        const shopsData = await fetchShops();
        setShops(shopsData);
      } catch (error) {
        console.error('Error fetching shops:', error);
        // Handle error (e.g., show error message to the user)
      } finally {
        setLoading(false);
      }
    };

    fetchShopsData();
  }, []);

  return (
    <AdminLayout>
      <div>
        <div className="w-full rounded-md mt-2 bg-white overflow-x-auto">
          <div className="w-full rounded-lg">
            <table className="table-auto w-full rounded-md">
              <thead className="">
                <tr className="bg-gray-100 border-b-[2px] border-gray-200 text-[13px] bg-gray-100 text-[#002A4D] font-medium">
                  <th className="px-4 text-start font-normal pb-2 pt-4">Name</th>
                  <th className="px-4 text-start font-normal pb-2 pt-4">Location</th>
                  <th className="px-4 text-start font-normal pb-2 pt-4">Owner Id</th>
                  {/* Add more columns as needed */}
                </tr>
              </thead>
              <tbody className="text-gray-600 text-[12.04px] text-[#646882]">
                {shops.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-4">
                      No shops found.
                    </td>
                  </tr>
                ) : (
                  shops.map((shop) => (
                    <tr key={shop.id} className="border-b py-2 border-gray-100 hover:bg-gray-100">
                      <td className="px-4 py-3 cursor-pointer">{shop.name}</td>
                      <td className="px-4 py-3 cursor-pointer">{shop.location}</td>
                      <td className="px-4 py-3 cursor-pointer">{shop.location}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageStores;
