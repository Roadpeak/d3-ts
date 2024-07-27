import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import SellerLayout from '../elements/SellerLayout';
import { Shop } from '../types';

const ShopDetailsEdit: React.FC = () => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedLocation, setEditedLocation] = useState('');
  const [storeType, setStoreType] = useState('');
  const [editedImage, setEditedImage] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [openTime, setOpenTime] = useState('09:00:00');
  const [closeTime, setCloseTime] = useState('17:00:00');
  const [workingDays, setWorkingDays] = useState<string[]>([]);
  const [availableDays] = useState<string[]>(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]);
  const [selectedDay, setSelectedDay] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const dayOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  useEffect(() => {
    fetchShopInfo();
  }, []);

  const fetchShopInfo = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');

      if (!accessToken) {
        throw new Error('No access token found');
      }

      const response = await axios.get<Shop>(`https://api.discoun3ree.com/api/shops/${id}/see`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      setShop(response.data);
      setEditedName(response.data.name);
      setEditedLocation(response.data.location);
      setStoreType(response.data.store_type ?? '');
      setEditedImage(response.data.image_url);
      setEditedDescription(response.data.description ?? '');
      setOpenTime(response.data.open_time || '09:00:00');
      setCloseTime(response.data.close_time || '17:00:00');
      setWorkingDays(sortWorkingDays(response.data.working_days));
    } catch (error) {
      console.error('Failed to fetch shop information:', error);
    }
  };

  const sortWorkingDays = (days: string[]) => {
    return days.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));
  };

  const handleImageChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setLoading(true);
      try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await axios.post('https://api.discoun3ree.com/api/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setEditedImage(response.data.url);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const accessToken = localStorage.getItem('access_token');

      const formattedOpenTime = formatTime(openTime);
      const formattedCloseTime = formatTime(closeTime);

      await axios.put(`https://api.discoun3ree.com/api/shops/${shop?.id}`, {
        name: editedName,
        location: editedLocation,
        image_url: editedImage,
        store_type: storeType,
        description: editedDescription,
        open_time: formattedOpenTime,
        close_time: formattedCloseTime,
        working_days: workingDays
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      setLoading(false);
      toast('Info updated.');
    } catch (error) {
      setLoading(false);
      console.error('Failed to update shop information:', error);
      toast.error('Failed to update shop information. Please try again.');
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}:00`;
  };

  const handleAddDay = () => {
    if (selectedDay && !workingDays.includes(selectedDay)) {
      const newWorkingDays = [...workingDays, selectedDay];
      setWorkingDays(sortWorkingDays(newWorkingDays));
      setSelectedDay('');
    }
  };

  const handleRemoveDay = (day: string) => {
    const newWorkingDays = workingDays.filter(d => d !== day);
    setWorkingDays(sortWorkingDays(newWorkingDays));
  };

  if (!shop) {
    return <div>Loading...</div>;
  }

  return (
    <SellerLayout>
      <div className="flex flex-col my-6 gap-4 w-full">
        <p className="w-full border-b border-gray-200 text-[18px]">Editing <span className="font-medium">{shop.name}</span></p>
        <div className="w-full flex gap-5  flex-col md:flex-row">
          <div className="w-full bg-white h-full rounded-md p-4 md:w-1/2 mb-4">
            <label htmlFor="image" className="block mb-1 text-gray-600 font-light text-[15px]">Image</label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="border rounded-md p-2 w-full text-gray-600 font-light text-[13px]"
            />
            {editedImage && (
              <img src={editedImage} alt="Shop" className="mt-4 w-32 h-32 object-cover" />
            )}
            <div className="mb-4 border-t w-full border-gray-300 pt-1  ">
              <label htmlFor="working_days" className="block mb-1 text-gray-600 font-light text-[15px]">Add Working Day</label>
              <div className="flex items-center gap-2">
                <select
                  id="working_days"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                  className="border rounded-md p-2 w-full text-gray-600 font-light outline-none bg-transparent focus:border-primary text-[13px]"
                >
                  <option value="">Select a day</option>
                  {availableDays.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <button
                  onClick={handleAddDay}
                  className="bg-primary text-white px-4 py-1 font-light text-[14px] rounded-md"
                >
                  Add
                </button>
              </div>
              <div className="mt-2">
                <p className="text-gray-600 mt-2 text-[15px]">Selected Working Days:</p>
                <ul className="list-disc pl-5 mt-2">
                  {workingDays.map(day => (
                    <li key={day} className="flex justify-between border-b mb-1 border-gray-200 items-center">
                      <span className="text-gray-600 font-normal text-[14px]">{day}</span>
                      <button
                        onClick={() => handleRemoveDay(day)}
                        className="text-primary text-[13px] font-light hover:text-red-700"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="w-full bg-white rounded-md p-4 h-full md:w-1/2">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-1 text-gray-600 font-light text-[15px]">Name</label>
              <input
                type="text"
                id="name"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                className="border rounded-md p-2 w-full text-gray-600 font-light outline-none focus:border-primary text-[13px]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block mb-1 text-gray-600 font-light text-[15px]">Location</label>
              <input
                type="text"
                id="location"
                value={editedLocation}
                onChange={(e) => setEditedLocation(e.target.value)}
                className="border rounded-md p-2 w-full text-gray-600 font-light outline-none focus:border-primary text-[13px]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="store_type" className="block mb-1 text-gray-600 font-light text-[15px]">Store Type</label>
              <input
                type="text"
                id="store_type"
                value={storeType}
                onChange={(e) => setStoreType(e.target.value)}
                className="border rounded-md p-2 w-full text-gray-600 font-light outline-none focus:border-primary text-[13px]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="description" className="block mb-1 text-gray-600 font-light text-[15px]">Description</label>
              <textarea
                id="description"
                value={editedDescription || ''}
                onChange={(e) => setEditedDescription(e.target.value)}
                className="border rounded-md p-2 w-full text-gray-600 font-light outline-none focus:border-primary text-[13px]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="open_time" className="block mb-1 text-gray-600 font-light text-[15px]">Open Time</label>
              <input
                type="time"
                id="open_time"
                value={openTime.substring(0, 5)}
                onChange={(e) => setOpenTime(formatTime(e.target.value))}
                className="border rounded-md p-2 w-full text-gray-600 font-light outline-none focus:border-primary text-[13px]"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="close_time" className="block mb-1 text-gray-600 font-light text-[15px]">Close Time</label>
              <input
                type="time"
                id="close_time"
                value={closeTime.substring(0, 5)}
                onChange={(e) => setCloseTime(formatTime(e.target.value))}
                className="border rounded-md p-2 w-full text-gray-600 font-light outline-none focus:border-primary text-[13px]"
              />
            </div>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleSubmit}
                className="bg-primary text-white px-4 py-2 font-light text-[14px] rounded-md"
              >
                Save Changes
              </button>
              <button
                onClick={() => window.location.reload()}
                className="bg-gray-300 text-gray-800 px-4 py-2 font-light text-[14px] rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </SellerLayout>
  );
};

export default ShopDetailsEdit;
