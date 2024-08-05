import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MiniCalendar from '../components/MiniCalendar';
import TimeSlotModal from '../components/TimeSlotModal';
import PaymentCodeModal from '../components/PaymentCodeModal';
import { useAuth } from '../utils/context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Payment } from '../types';
import { getCookie } from '../utils/cookiUtils';

const BookingPage: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
  const [showTimeSlotModal, setShowTimeSlotModal] = useState(false);
  const [showPaymentCodeModal, setShowPaymentCodeModal] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const response = await axios.get(`https://api.discoun3ree.com/api/time-slots/discount/${id}`);
        setTimeSlots(response.data.time_slots);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch time slots');
        setLoading(false);
      }
    };

    fetchTimeSlots();
  }, [id]);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const accessToken = getCookie('access_token');;
        if (!accessToken) {
          console.error('Access token not found in localStorage');
          return;
        }

        const response = await axios.get(`https://api.discoun3ree.com/api/payments/user/${user?.id}/discount/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPayments(response.data);
      } catch (err) {
        console.error('Failed to fetch payments', err);
      }
    };

    if (user?.first_discount !== 0) {
      fetchPayments();
    }
  }, [user]);

  const handleBooking = async (slotId: number, paymentCode: string | null = null) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        console.error('Access token not found.');
        return;
      }

      const requestBody = {
        time_slot_id: slotId,
        code: paymentCode,
      };

      const apiUrl = `https://api.discoun3ree.com/api/discounts/${id}/bookings`;

      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      toast('Booking Successful!');
      navigate('/my-bookings');
    } catch (error) {
      toast.error('An error occurred.');
    }
  };

  const handleSelectSlot = (slot: any) => {
    setSelectedSlot(slot);

    if (user?.first_discount !== 0) {
      setShowPaymentCodeModal(true);
    } else {
      handleBooking(slot.id);
    }
  };

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  return (
    <>
      <Navbar />
      <div className="py-8">
        <MiniCalendar timeSlots={timeSlots} onSelectSlot={handleSelectSlot} />

        {showTimeSlotModal && selectedSlot && (
          <TimeSlotModal
            date={selectedSlot.date}
            timeSlots={timeSlots.filter(slot => slot.date === selectedSlot.date)}
            onClose={() => setShowTimeSlotModal(false)}
            onSelectSlot={(slot) => handleBooking(slot.id)}
          />
        )}

        {showPaymentCodeModal && (
          <PaymentCodeModal
            payments={payments}
            onClose={() => setShowPaymentCodeModal(false)}
            onBook={(paymentCode) => {
              if (selectedSlot) {
                handleBooking(selectedSlot.id, paymentCode);
              }
            }}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default BookingPage;
