import React, { useEffect, useState } from 'react';
import { Payment } from '../types';
import { fetchUserPayments } from '../services/apiService';
import { FiLoader } from 'react-icons/fi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Vouchers: React.FC = () => {
    const [payments, setPayments] = useState<Payment[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getPayments = async () => {
            setLoading(true);
            setError(null);
            try {
                const paymentsData = await fetchUserPayments();
                setPayments(paymentsData);
            } catch (error) {
                console.error('Error fetching payments:', error);
                setError('Error fetching Vouchers. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        getPayments();
    }, []);

    return (
        <div className="">
            <Navbar />
            <div className="w-full bg-gray-50 px-[5%] py-6 min-h-screen">
                <h1 className="text-[24px] font-medium capitalize text-gray-800 mb-4">cart</h1>
                {loading ? (
                    <div className="flex justify-center items-center">
                        <FiLoader className="animate-spin text-4xl text-gray-600" />
                    </div>
                ) : error ? (
                    <div className="flex justify-center items-center">
                        <p className="text-red-500 text-xl">{error}</p>
                    </div>
                ) : payments.length === 0 ? (
                    <div className="flex justify-center items-center">
                        <p className="text-gray-600 text-xl">No vouchers found. Browse to get some.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto bg-white rounded-lg">
                        <table className="min-w-full leading-normal">
                            <thead className='bg-gray-100'>
                                <tr className='bg-gray-100'>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        #
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        service
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        bought on
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Amount
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Phone
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Voucher
                                    </th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment, index) => (
                                    <tr
                                        key={payment.id}
                                        className={`hover:bg-gray-100 ${payment.used ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                        onClick={() => !payment.used && (window.location.href = `/discount/${payment.discount_id}/booking`)}
                                    >
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{index + 1}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{payment.discount_name}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{new Date(payment.payment_date).toLocaleDateString()}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{payment.amount}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{payment.phone}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className="text-gray-900 whitespace-no-wrap">{payment.code}</p>
                                        </td>
                                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            <p className={`text-${payment.used ? 'red' : 'green'}-500`}>
                                                {payment.used ? 'Used' : 'Book'}
                                            </p>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Vouchers;
