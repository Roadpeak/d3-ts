import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AdminLayout from '../utils/layouts/AdminLayout';
import { toast } from 'react-toastify';
import SellerLayout from '../elements/SellerLayout';

type Shop = {
  id: number;
  name: string;
  location: string;
  image_url: string;
  verified: number;
  seller_id: number;
  created_at: string;
  updated_at: string;
  store_type: string | null;
  seller_phone: string;
};

const ShopDetailsEdit: React.FC = () => {
  const [shop, setShop] = useState<Shop | null>(null);
  const [editedName, setEditedName] = useState('');
  const [editedLocation, setEditedLocation] = useState('');
  const [storeType, setStoreType] = useState('');
  const [editedImage, setEditedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    fetchShopInfo();
  }, []);

  const fetchShopInfo = async () => {
    try {
      const response = await axios.get<Shop>(`https://api.discoun3ree.com/api/shops/${id}`);
      setShop(response.data);
      setEditedName(response.data.name);
      setEditedLocation(response.data.location);
      setStoreType(response.data.store_type ?? '');
      setEditedImage(response.data.image_url);
    } catch (error) {
      console.error('Failed to fetch shop information:', error);
    }
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
        await axios.put(`https://api.discoun3ree.com/api/shops/${shop?.id}`, {
            name: editedName,
            location: editedLocation,
            image_url: editedImage,
            store_type: storeType,
        }, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        setLoading(false);
        toast('Shop information updated successfully!');
    } catch (error) {
        setLoading(false);
        console.error('Failed to update shop information:', error);
        toast.error('Failed to update shop information. Please try again.');
    }
};

  if (!shop) {
    return <div>Loading...</div>;
  }

  return (
    <SellerLayout>
        <div className="flex flex-col my-6 gap-4 w-full">
            <p className="">Editing <span className="font-medium">{shop.name}</span></p>
            <div className="w-full flex gap-5  flex-col md:flex-row">
                <div className="w-full bg-white h-full rounded-md p-4 md:w-1/2 mb-4">
                    <label htmlFor="image" className="block mb-1">Image:</label>
                    <input
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                    className="border rounded-md p-2 w-full"
                    />
                    {editedImage && (
                    <img src={editedImage} alt="Shop" className="mt-4 w-32 h-32 object-cover" />
                    )}
                </div>
                <div className="w-full bg-white rounded-md p-4 h-full md:w-1/2">                
                    <div className="mb-4">
                    <label htmlFor="name" className="block mb-1">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={editedName}
                            onChange={(e) => setEditedName(e.target.value)}
                            className="border rounded-md p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="location" className="block mb-1">Location:</label>
                        <input
                            type="text"
                            id="location"
                            value={editedLocation}
                            onChange={(e) => setEditedLocation(e.target.value)}
                            className="border rounded-md p-2 w-full"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="store_type" className="block mb-1">Store Type:</label>
                        <input
                        type="text"
                        id="store_type"
                        value={storeType}
                        onChange={(e) => setStoreType(e.target.value)}
                        className="border rounded-md p-2 w-full"
                        />
                    </div>
                </div>            
            </div>
            <button
                className={`bg-primary text-white px-4 mb-4 py-2 rounded-md ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleSubmit}
                disabled={loading}
            >
                {loading ? 'Submitting...' : 'Submit'}
            </button>
        </div>

    </SellerLayout>
  );
};

export default ShopDetailsEdit;
