import React, { ChangeEvent, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import { toast } from 'react-toastify';

interface Discount {
  id: number;
  name: string;
  initial_price: number;
  discount: number;
  price_after_discount: number;
  percentage_discount: number;
  amount: number;
  expiry_date: string;
  slug: string;
  image_url: string;
  service_time_hours: number;
  category: string;
  description: string;
  verified: boolean;
  shop_id: number;
  created_at: string;
  updated_at: string;
}

const EditableDiscountComponent: React.FC = () => {
  const [discount, setDiscount] = useState<Discount | null>(null);
  const [editedName, setEditedName] = useState<string>('');
  const [editedImage, setEditedImage] = useState<string>('');
  const [editedDescription, setEditedDescription] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  const discountId = id;

  useEffect(() => {
    const fetchDiscount = async () => {
      try {
        const response = await axios.get(`https://api.discoun3ree.com/api/discounts/${discountId}`);
        setDiscount(response.data);
        setEditedName(response.data.name);
        setEditedImage(response.data.image_url);
        setEditedDescription(response.data.description);
      } catch (error) {
        console.error('Error fetching discount:', error);
      }
    };
    fetchDiscount();
  }, [discountId]);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEditedName(event.target.value);
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

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedDescription(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      const accessToken = localStorage.getItem('access_token');

      const response = await axios.patch(`https://api.discoun3ree.com/api/discounts/${discountId}`, {
        name: editedName,
        image_url: editedImage,
        description: editedDescription,
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json', // Assuming JSON payload
        },
      });

      console.log(response.data); // Optionally handle response data

      toast('Discount updated successfully!');
    } catch (error) {
      console.error('Failed to update discount:', error);
      toast.error('Failed to update discount.');
    }
  };

  if (!discount) {
    return <div className="p-4">Loading...</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="w-full py-8 px-[5%] bg-gray-100 rounded-lg overflow-hidden">
        <div className="flex">
          <div className="w-1/3 p-4">
            <label className="flex text-gray-700 mb-2">Image</label>
            {loading ? (
              <p>Loading image...</p>
            ) : (
              <img src={editedImage} alt="Discount Image" className="rounded-md h-auto w-full mb-2" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border rounded-md mb-2 bg-white"
            />
          </div>
          <div className="w-2/3 p-4">
            <h2 className="text-2xl font-bold mb-4">Edit Discount</h2>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-md mb-2 bg-white"
                value={editedName}
                onChange={handleNameChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-bold mb-2">Description:</label>
              <textarea
                className="w-full px-3 py-2 h-[150px] border rounded-md mb-2 bg-white"
                value={editedDescription}
                onChange={handleDescriptionChange}
              />
            </div>
            <button
              className="bg-primary text-white px-4 py-2 rounded-md"
              disabled={loading}
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditableDiscountComponent;
