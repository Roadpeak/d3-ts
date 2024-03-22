import React, { useEffect, useState } from 'react';
import SellerLayout from '../../utils/layouts/SellerLayout';
import { CgProfile } from 'react-icons/cg';
import { FaChevronDown, FaRegHeart } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Discount {
    _id: string;
    name: string;
    initialPrice: number;
    discount: number;
    percentageDiscount: number;
    serviceTime: string;
    category: string;
    imageUrl: string;
    priceAfterDiscount: number;
    expiryDate: Date;
}

interface BookingSlot {
    date: Date;
    startTime: string;
    endTime: string;
    booked: boolean;
}

const DiscountDetails: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [discount, setDiscount] = useState<Discount | null>(null);
    const [bookingSlots, setBookingSlots] = useState<BookingSlot[]>([]);
    const [formData, setFormData] = useState({
        startDate: '',
        expiryDate: '',
        serviceTime: '',
        startTime: '',
        endTime: ''
    });
    const navigate = useNavigate();
    const { id } = useParams();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { startDate, expiryDate, serviceTime, startTime, endTime } = formData;

        if (startDate >= expiryDate) {
            alert('Start date must be less than expiry date.');
            return;
        }

        try {
            const response = await axios.post<{ bookingSlots: BookingSlot[] }>('http://localhost:4000/api/v1/discounts/generate-booking-slots', {
                discountId: id,
                startDate,
                expiryDate,
                serviceTime,
                startTime,
                endTime
            });
            setBookingSlots(response.data.bookingSlots);
        } catch (error) {
            console.error('Error generating booking slots:', error);
        }
    };

    useEffect(() => {
        const fetchDiscount = async () => {
            try {
                const response = await axios.get<{ discount: Discount }>(`http://localhost:4000/api/v1/discounts/${id}`);
                const fetchedDiscount = response.data.discount;
                if (fetchedDiscount && fetchedDiscount.expiryDate) {
                    setDiscount(fetchedDiscount);
                    setFormData(prevState => ({
                        ...prevState,
                        expiryDate: new Date(fetchedDiscount.expiryDate).toISOString().split('T')[0],
                        serviceTime: fetchedDiscount.serviceTime
                    }));
                } else {
                    console.error('Error: Discount or expiryDate is undefined.');
                }
            } catch (error) {
                console.error('Error fetching discount:', error);
            }
        };

        fetchDiscount();
    }, [id]);

    return (
        <SellerLayout>
            <div className="">
                <div className="w-full flex flex-col justify-between p-4 shadow-md border-b px-[3%]">
                    <div className=""></div>
                    <div className="flex items-center gap-2 text-gray-500 ">
                        <CgProfile size={26} />
                        <p className="text-gray-500 ">Salvato Luis</p>
                        <FaChevronDown />
                    </div>
                </div>
                {discount && (
                    <div className="flex flex-col md:flex-row">
                        <div className="flex flex-col w-full px-[3%] md:w-1/2">
                            <div className="border py-[2%] flex flex-col w-full">
                                <div className="flex flex-col md:flex-row flex-wrap overflow-x-auto w-full">
                                    <div className="w-full md:w-2/3 mt-4 md:mt-0">
                                        <img
                                            className='rounded-md'
                                            alt='image'
                                            src={discount.imageUrl}
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col w-full md:pr-4">
                                    <p className="font-medium text-[24px] ">{discount.name}</p>
                                    <div className="flex w-full items-center justify-between">
                                        <p className="">Percentage discount</p>
                                        <span className="text-primary font-medium text-[17px]">
                                            {discount.percentageDiscount}%
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between ">
                                        <span className='font-light text-gray-600'>Discount</span>
                                        <p className="text-[17px]">
                                            Ksh {discount.initialPrice.toLocaleString('KES')}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between ">
                                        <span className='font-light text-gray-600 '>Initial Price</span>
                                        <p className="text-[17px]">
                                            Ksh {discount.initialPrice.toLocaleString('KES')}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between ">
                                        <span className='font-light text-gray-600'>Current price</span>
                                        <p className="text-[17px]">
                                            Ksh {discount.priceAfterDiscount.toLocaleString('KES')}
                                        </p>
                                    </div>
                                    <div className="flex flex-co">
                                        <span className="font-medium text-[16px]">
                                            Save this for later
                                        </span>
                                        <button className='flex border rounded-md border-gray-300 px-2 py-1.5 w-fit items-center gap-2'>
                                            <FaRegHeart />
                                            Favorite
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <p className="">Booking Slots</p>
                            <button onClick={handleClickOpen}>Generate slots</button>
                        </div>
                    </div>
                )}
            </div>
            {open && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-xl">
                        <p className="">Booking slots</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Start Date</label>
                                <input type="date" id="startDate" name="startDate" value={formData.startDate} onChange={handleChange} className="mt-1 border focus:outline-none px-2 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2" />
                            </div>
                            <div>
                                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
                                <input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} className="mt-1 border focus:outline-none px-2 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2" />
                            </div>
                            <div>
                                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
                                <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} className="mt-1 border focus:outline-none px-2 focus:border-primary block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2" />
                            </div>
                                <button type="submit" className="bg-primary text-white px-6 py-3 rounded-md hover:bg-opacity-80">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </SellerLayout>
    );

}

export default DiscountDetails
