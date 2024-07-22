import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { CheckCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

interface CalendarProps {
    serviceId: number;
    shopId: number;
}

const Calendar: React.FC<CalendarProps> = ({ serviceId, shopId }) => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const [slots, setSlots] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (selectedDate) {
            const fetchSlots = async () => {
                try {
                    const response = await axios.get(
                        `https://api.discoun3ree.com/api/shops/${shopId}/services/${serviceId}/available-slots`,
                        { params: { date: format(selectedDate, 'yyyy-MM-dd') } }
                    );
                    setSlots(response.data);
                    setError(null);
                } catch (error) {
                    if (axios.isAxiosError(error) && error.response) {
                        setError(error.response.data.error || 'An unexpected error occurred');
                    } else {
                        setError('An unexpected error occurred');
                    }
                }
            };
            fetchSlots();
        }
    }, [selectedDate, serviceId, shopId]);

    const handleAppointment = async () => {
        if (selectedDate && selectedSlot) {
            const [startTime] = selectedSlot.split('-');
            const appointmentDateTime = `${format(selectedDate, 'yyyy-MM-dd')} ${startTime}:00`;

            try {
                const response = await axios.post(
                    'https://api.discoun3ree.com/api/appointments',
                    {
                        service_id: serviceId,
                        appointment_time: appointmentDateTime,
                    },
                    { headers: { Authorization: `Bearer ${localStorage.getItem('access_token')}` } }
                );
                navigate('/my-bookings');
                window.location.reload();               
            } catch (error) {
                console.error('Error creating appointment:', error);
                toast.error('Failed to book appointment. Please try again.');
            }
        }
    };

    return (
        <div className="relative">
            <h1 className="text-[20px] font-medium text-gray-700 mb-4 text-center border-b border-gray-200">Appointment Scheduler</h1>
            <p className="">Select a suitable date</p>
            <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                dateFormat="yyyy-MM-dd"
                minDate={new Date()}
                className="p-2 border rounded w-full z-index-20 mb-4"
                placeholderText="Select a date"
                portalId="datepicker-portal"
            />
            {error && (
                <p className="text-red-500 mb-4">{error}</p>
            )}
            {slots.length > 0 && !error ? (
                <div>
                    <h2 className="text-[17px] font-medium mb-2 text-gray-700 border-t border-gray-300 pt-4">Available Slots</h2>
                    <ul className="space-y-2">
                        {slots.map((slot, index) => (
                            <li
                                key={index}
                                onClick={() => setSelectedSlot(slot.slot)}
                                className={`flex items-center p-3 border rounded cursor-pointer hover:bg-gray-200 ${selectedSlot === slot.slot ? 'bg-gray-50 border-green-200' : ''}`}
                            >
                                <span className={`flex-1 ${selectedSlot === slot.slot ? 'font-semibold' : ''}`}>{slot.slot}</span>
                                {selectedSlot === slot.slot ? (
                                    <CheckCircleIcon className="w-6 h-6 text-green-600" />
                                ) : (
                                    <PlusCircleIcon className="w-6 h-6 text-gray-500" />
                                )}
                            </li>
                        ))}
                    </ul>
                    <button
                        onClick={handleAppointment}
                        className="w-full py-2 bg-primary rounded-md text-white capitalize text-[14px] flex items-center justify-center mb-2 mt-4">
                        Schedule Appointment
                    </button>
                </div>
            ) : !error ? (
                <p className="mt-4 text-gray-600 text-center">No available slots for the selected date.</p>
            ) : null}
        </div>
    );
};

export default Calendar;
