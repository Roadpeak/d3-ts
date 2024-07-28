import React, { useEffect, useState } from 'react';
import SideNav from './SideNav';
import { Link } from 'react-router-dom';
import { fetchFirstSixAppointments, fetchLatestShops, fetchWeekelyStats } from '../../services/apiService';
import SideMenu from './SideMenu';
import { Stat, WeeklyStats } from '../../types';

interface Appointment {
  id: number;
  user_first_name: string;
  user_last_name: string;
  user_phone: string;
  discount_name: string;
  shop_name: string;
  time_slot_date: string;
  time_slot_start_time: string;
  time_slot_end_time: string;
  approved: boolean;
}

interface Shop {
  id: number;
  name: string;
  location: string;
  seller_first_name: string;
  seller_last_name: string;
  seller_phone: string;
  verified: boolean;
}

const AdminDash: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shops, setShops] = useState<Shop[]>([]);
  const [stats, setStats] = useState<WeeklyStats | null>(null);

  useEffect(() => {
    const fetchShopsData = async () => {
      setLoading(true);
      try {
        const shopsData = await fetchLatestShops();
        setShops(shopsData);
      } catch (error) {
        console.error('Error fetching shops:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchShopsData();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const statsData = await fetchWeekelyStats();
        setStats(statsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const appointmentsData = await fetchFirstSixAppointments();
        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Error fetching appointments:', error);
        setError('Error fetching appointments. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='w-full flex h-[100vh] overflow-y-hidden'>
      <SideNav />
      <div className="w-full md:w-[80%] h-[100vh] overflow-y-auto p-4 md:p-8 bg-gray-100">
        <SideMenu />
        <div className="w-full flex flex-col border-b border-gray-200 pb-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats && (
              <>
                {Object.entries(stats).map(([key, value]) => (
                  <div key={key} className="bg-white p-4 gap-2 rounded-md flex flex-col">
                    <p className="font-medium text-[22px] text-gray-700">+{value.current_week}</p>
                    <hr className="" />
                    <div className="flex w-full justify-between items-center">
                      <p className="font-normal text-[15px] text-gray-600 capitalize">{key}</p>
                      <p className={`font-light text-[14px] font-light ${value.change_status === 'positive' ? 'text-green-500' : value.change_status === 'negative' ? 'text-red-500' : 'text-gray-500'}`}>
                        {value.percentage_change > 0 ? '+' : ''}{value.percentage_change.toFixed(0)}%
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
        <div className="pt-6 flex flex-col md:flex-row gap-4">
          <div className="bg-white p-6 flex flex-col rounded-md w-full md:w-[50%]">
            <div className="flex w-full items-center justify-between border-b border-gray-200">
              <p className="text-[15px] text-gray-700">Recent Appointments</p>
              <Link to={`/`} className='text-primary font-light text-[14px] underline'>View all</Link>
            </div>
            <div className="w-full h-auto overflow-x-auto rounded-lg">
              <table className="table-auto w-full rounded-md">
                <thead>
                  <tr className="border-b-2 border-gray-200 text-[13px] text-[#002A4D] font-medium">
                    <th className="px-4 py-3 text-start">Name</th>
                    <th className="px-4 py-3 text-start">Phone</th>
                    <th className="px-4 py-3 text-start">Discount</th>
                    <th className="px-4 py-3 text-start">Shop</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-[12.04px] text-[#646882]">
                  {loading ? (
                    <tr>
                      <td colSpan={9} className="text-center py-4">Loading, please wait...</td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={9} className="text-center py-4">{error}</td>
                    </tr>
                  ) : appointments.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="text-center py-4">No appointments found.</td>
                    </tr>
                  ) : (
                    appointments.map((appointment) => (
                      <tr key={appointment.id} className="border-b border-gray-100">
                        <td className="px-4 py-3 capitalize">{appointment.user_first_name} {appointment.user_last_name}</td>
                        <td className="px-4 py-3">{appointment.user_phone}</td>
                        <td className="px-4 py-3">{appointment.discount_name}</td>
                        <td className="px-4 py-3">{appointment.shop_name}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white p-6 flex flex-col rounded-md w-full md:w-[50%]">
            <div className="flex w-full items-center justify-between border-b border-gray-200">
              <p className="text-[15px] text-gray-700">Recent Stores</p>
              <Link to={`/`} className='text-primary font-light text-[14px] underline'>View all</Link>
            </div>
            <div className="w-full h-auto overflow-x-auto rounded-lg">
              <table className="table-auto w-full rounded-md">
                <thead>
                  <tr className="border-b-2 border-gray-200 text-[13px] text-[#002A4D] font-medium">
                    <th className="px-4 text-start pb-2 pt-4">Name</th>
                    <th className="px-4 text-start pb-2 pt-4">Owner</th>
                    <th className="px-4 text-start pb-2 pt-4">Phone</th>
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
                    shops.map((shop) => (
                      <tr
                        key={shop.id}
                        className="border-b py-2 border-gray-100"
                      >
                        <td className="px-4 py-3">{shop.name}</td>
                        <td className="px-4 py-3 capitalize">{shop.seller_first_name} {shop.seller_last_name}</td>
                        <td className="px-4 py-3">{shop.seller_phone}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDash;
