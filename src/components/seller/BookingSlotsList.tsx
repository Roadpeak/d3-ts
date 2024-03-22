import React from 'react';

interface BookingSlot {
    date: Date;
    startTime: string;
    endTime: string;
    booked: boolean;
}

interface Props {
    bookingSlots: BookingSlot[];
    handleClickOpen: () => void;
    handleBookSlot: (slot: BookingSlot) => void;
}

const BookingSlotsList: React.FC<Props> = ({ bookingSlots, handleClickOpen, handleBookSlot }) => {
    return (
        <div className="flex flex-col w-full px-[3%] md:w-1/2 py-[2%]">
            {bookingSlots ? (
                <>
                    <p className='text-[22px] font-medium'>Available Slots</p>
                    {Object.entries(
                        bookingSlots.reduce((acc: { [key: string]: BookingSlot[] }, slot) => {
                            const dateKey = new Date(slot.date).toLocaleDateString();
                            acc[dateKey] = acc[dateKey] || [];
                            acc[dateKey].push(slot);
                            return acc;
                        }, {})
                    ).map(([date, slots]) => (
                        <div key={date}>
                            <p className="text-lg mt-4 font-semibold">{date}</p>
                            <div className="flex flex-wrap gap-2">
                                {slots.map((slot, index) => (
                                    <div key={index} className={`flex ${slot.booked ? 'bg-red-300' : 'bg-green-200'} p-2 rounded-md items-start flex-col`}>
                                        <p>{slot.startTime} - {slot.endTime}</p>
                                        <button className={`${!slot.booked && 'bg-green-400 py-1 rounded-md text-white px-2 '}`} onClick={() => handleBookSlot(slot)}>{!slot.booked ? 'Reserve' : 'Booked'}</button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <button className='bg-primary text-white px-4 py-2 rounded-md' onClick={handleClickOpen}>Generate slots</button>
            )}
        </div>
    );
}

export default BookingSlotsList;
