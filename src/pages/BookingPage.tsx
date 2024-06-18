import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import MiniCalendar from '../components/MiniCalendar';
import { useAuth } from '../utils/context/AuthContext';
import PaymentCodeModal from '../components/PaymentCodeModal';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BookingPage: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
  const [showPaymentCodeModal, setShowPaymentCodeModal] = useState(false);
  const { user } = useAuth();
  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTimeSlots = async () => {
      try {
        const response = await axios.get(`https://api.discoun3ree.com/api/discounts/${id}/time-slots`);
        setTimeSlots(response.data.time_slots);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch time slots');
        setLoading(false);
      }
    };

    const fetchPayments = async () => {
        try {
            const accessToken = localStorage.getItem('access_token');
            if (!accessToken) {
            console.error('Access token not found in localStorage');
            return;
            }

            const response = await axios.get(`https://api.discoun3ree.com/api/payments/user/${user?.id}/discount/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            });

            setPayments(response.data.payments);
        } catch (err) {
            console.error('Failed to fetch payments', err);
        }
        };

    fetchTimeSlots();
    fetchPayments();
  }, [id]);


  const handleBooking = async (paymentCode: string, slotId: number) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        console.error('Access token not found in localStorage');
        return;
      }

      const requestBody = {
        code: paymentCode,
        time_slot_id: slotId,
      };

      const apiUrl = `https://api.discoun3ree.com/api/discounts/${id}/bookings`;

      const response = await axios.post(apiUrl, requestBody, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      });

      toast('Booking Successfull!')
      navigate('/my-bookings')

    } catch (error) {
      console.error('Error making booking:', error);
      // Handle error (e.g., show error message)
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
        <MiniCalendar timeSlots={timeSlots} onSelectSlot={(slot) => { setSelectedSlot(slot); setShowPaymentCodeModal(true); }} />
        {showPaymentCodeModal && selectedSlot && (
            <PaymentCodeModal
            payments={payments}
            onClose={() => setShowPaymentCodeModal(false)}
            onBook={(paymentCode) => handleBooking(paymentCode, selectedSlot.id)}
            />
        )}
        </div>
        <Footer />
    </>
  );
};

export default BookingPage;
