import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import SellerLayout from '../elements/SellerLayout';

const localizer = momentLocalizer(moment);

interface AppointmentData {
    date: string;
    appointments_count: number;
    appointment_times: string[];
}

interface ShopCalendarProps { }

const ShopCalendar: React.FC<ShopCalendarProps> = () => {
    const [appointments, setAppointments] = useState<AppointmentData[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewDate, setViewDate] = useState<Date>(new Date());
    const [events, setEvents] = useState<any[]>([]);
    const { id } = useParams();
    const shopId = id;

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await axios.get(`https://api.discoun3ree.com/api/shops/${shopId}/appointments/calendar`);
                setAppointments(response.data);
                updateEvents(response.data);
            } catch (error) {
                console.error('Error fetching calendar appointments:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchAppointments();
    }, [shopId]);

    const updateEvents = (data: AppointmentData[]) => {
        const events = data
            .filter(app => app.appointments_count > 0) 
            .map(app => ({
                title: app.appointments_count > 1 ? `${app.appointments_count} appointments` : '1 appointment',
                start: new Date(app.date),
                end: new Date(app.date),
                busyLevel: app.appointments_count,
                appointmentTimes: app.appointment_times,
            }));
        setEvents(events);
    };

    const eventStyleGetter = (event: any) => {
        return {
            style: {
                color: '#D97706',
                backgroundColor: 'transparent',
                border: 'none',
                height: '100%',
            },
        };
    };

    return (
        <SellerLayout>
            <div className="w-full flex flex-col">
                <div className="mb-6">
                    <p className="text-gray-600">View and manage your appointments.</p>
                </div>
                <div className="bg-white shadow-lg rounded-lg p-4">
                    <BigCalendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        views={['month']}
                        onView={(view) => {
                            if (view === 'month') {
                                setViewDate(new Date());
                            }
                        }}
                        onNavigate={(date) => setViewDate(date)}
                        style={{ height: '80vh' }}
                        eventPropGetter={eventStyleGetter}
                    />
                </div>
            </div>
        </SellerLayout>
    );
};

export default ShopCalendar;
