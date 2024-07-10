import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MiniCalendar from '../components/MiniCalendar';
import TimeSlotModal from '../components/TimeSlotModal';
import { useAuth } from '../utils/context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const BookingPage: React.FC = () => {
  const [timeSlots, setTimeSlots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<any | null>(null);
  const [showTimeSlotModal, setShowTimeSlotModal] = useState(false);
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

  const handleBooking = async (slotId: number) => {
    try {
      const accessToken = localStorage.getItem('access_token');
      if (!accessToken) {
        console.error('Access token not found in localStorage');
        return;
      }

      const requestBody = {
        time_slot_id: slotId,
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

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  // Function to handle selecting a time slot
  const handleSelectSlot = (slot: any) => {
    setSelectedSlot(slot);

    // Check if user has first discount (user?.first_discount !== 0 means user has first discount)
    if (user?.first_discount !== 0) {
      setShowTimeSlotModal(true); // Show time slot modal for users without first discount
    } else {
      handleBooking(slot.id); // Directly handle booking without showing modal for users with first discount
    }
  };

  return (
    <>
      <Navbar />
      <div className="py-8">
        <MiniCalendar timeSlots={timeSlots} onSelectSlot={handleSelectSlot} />

        {/* Conditionally render TimeSlotModal */}
        {showTimeSlotModal && selectedSlot && (
          <TimeSlotModal
            date={selectedSlot.date}
            timeSlots={timeSlots.filter(slot => slot.date === selectedSlot.date)} // Filter time slots by selected date
            onClose={() => setShowTimeSlotModal(false)}
            onSelectSlot={(slot) => handleBooking(slot.id)} // Handle booking without payment code
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default BookingPage;
