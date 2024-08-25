import React, { useEffect, useState } from 'react';
import { fetchAppointments } from '../../services/apiService';
import AdminLayout from '../../utils/layouts/AdminLayout';
import { format, parseISO } from 'date-fns';
import SideMenu from './SideMenu';

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

const Appointments: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const appointmentsData = await fetchAppointments();
        setAppointments(appointmentsData);
        console.log(appointmentsData);
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
    <AdminLayout>
      <div className="flex flex-col">
        <SideMenu />
        <div className="w-full gap-2 flex flex-col py-4">
        <div className="flex w-full justify-between items-center">
          <p className="font-medium text-[13px] text-dark tracking-wide">Appointments</p>
          <input type="text" placeholder='Search here' className='bg-light w-[220px] focus:border-secondary outline-none text-[11px] rounded-full py-2 px-3.5 ' />
        </div>
        <div className="w-full rounded-md mt-2 bg-white overflow-auto">
          <div className="w-full h-[80vh] overflow-y-auto rounded-lg">
            <table className="table-auto w-full rounded-md">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-200 text-[13px] text-[#002A4D] font-medium">
                  <th className="px-4 py-3 text-start">#</th>
                  <th className="px-4 py-3 text-start">Name</th>
                  <th className="px-4 py-3 text-start">Phone</th>
                  <th className="px-4 py-3 text-start">Date</th>
                  <th className="px-4 py-3 text-start">Time slot</th>
                  <th className="px-4 py-3 text-start">Discount</th>
                  <th className="px-4 py-3 text-start">Shop</th>
                  <th className="px-4 py-3 text-start">Fullfilled</th>
                </tr>
              </thead>
              <tbody className="text-[12.04px] text-[#646882]">
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
                  appointments.map((appointment, index) => (
                    <tr key={appointment.id} className="border-b border-gray-100 hover:bg-gray-100">
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3 capitalize">{appointment.user_first_name} {appointment.user_last_name}</td>          
                      <td className="px-4 py-3">{appointment.user_phone}</td>
                      <td className="px-4 py-3">{format(parseISO(appointment.time_slot_date), 'MMMM do, yyyy')}</td>
                      <td className="px-4 py-3">{format(parseISO(appointment.time_slot_start_time), 'HH:mm')} - {format(parseISO(appointment.time_slot_end_time), 'HH:mm')}</td>
                      <td className="px-4 py-3">{appointment.discount_name}</td>
                      <td className="px-4 py-3">{appointment.shop_name}</td>
                      <td className={`px-4 py-3 ${appointment.approved ? 'text-green-500' : 'text-red-500'}`}>
                        {appointment.approved ? 'Yes' : 'No'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </AdminLayout>
  );
};

export default Appointments;
