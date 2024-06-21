// ManagePayments.tsx

import React, { useEffect, useState } from 'react';
import AdminLayout from '../../utils/layouts/AdminLayout';
import { fetchPayments, Payment } from '../../services/apiService'; // Adjust import path as needed

const ManagePayments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPaymentsData = async () => {
      setLoading(true);
      try {
        const paymentsData = await fetchPayments();
        setPayments(paymentsData);
      } catch (error) {
        console.error('Error fetching payments:', error);
        // Handle error (e.g., show error message to the user)
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentsData();
  }, []);

  return (
    <AdminLayout>
      <div className="w-full gap-2 flex flex-col py-4">
        <div className="flex w-full justify-between items-center">
          <p className="font-medium text-[13px] text-dark tracking-wide">Latest</p>
          <input type="text" placeholder='Search here' className='bg-light w-[220px] focus:border-secondary outline-none text-[11px] rounded-full py-2 px-3.5 ' />
        </div>
        <div className="w-full rounded-md mt-2 bg-white overflow-auto">
          <div className="w-full h-[80vh] overflow-y-auto rounded-lg">
            <table className="table-auto w-full rounded-md">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-200 text-[13px] text-[#002A4D] font-medium">
                  <th className="px-4 py-3 text-start">User ID</th>
                  <th className="px-4 py-3 text-start">Payment Date</th>
                  <th className="px-4 py-3 text-start">Amount</th>
                  <th className="px-4 py-3 text-start">Phone</th>
                  <th className="px-4 py-3 text-start">Status</th>
                  <th className="px-4 py-3 text-start">Gateway</th>
                  <th className="px-4 py-3 text-start">Code</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-[12.04px] text-[#646882]">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="text-center py-4">Loading...</td>
                  </tr>
                ) : payments.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="text-center py-4">No payments found.</td>
                  </tr>
                ) : (
                  payments.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-100">
                      <td className="px-4 py-3">{payment.user_id}</td>
                      <td className="px-4 py-3">{new Date(payment.payment_date).toLocaleString()}</td>
                      <td className="px-4 py-3">{payment.amount}</td>
                      <td className="px-4 py-3">+{payment.phone}</td>
                      <td className={`px-4 py-3 ${payment.status === 'complete' ? 'text-green-600' : 'text-red-600'}`}>
                        {payment.status}
                      </td>
                      <td className="px-4 py-3">{payment.gateway}</td>
                      <td className="px-4 py-3">{payment.code}</td>
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

export default ManagePayments;
