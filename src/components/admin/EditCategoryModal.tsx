import React, { useState } from 'react';
import axios from 'axios';

interface EditCategoryModalProps {
  category: {
    id: number;
    name: string;
    image_url: string;
  };
  onClose: () => void;
  onRefresh: () => void;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({ category, onClose, onRefresh }) => {
  const [name, setName] = useState(category.name);
  const [imageUrl, setImageUrl] = useState(category.image_url);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
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
        setImageUrl(response.data.url);
      } catch (error) {
        console.error('Error uploading image:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.put(`https://api.discoun3ree.com/api/categories/${category.id}`, { name, image_url: imageUrl });
      onRefresh();
      onClose();
    } catch (error) {
      setError('Failed to update category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Edit Category</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              onChange={handleImageChange}
            />
            {loading ? <p>Loading...</p> : <img src={imageUrl} alt="Category" className="w-full h-40 object-cover rounded-md mt-4" />}
          </div>
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-red-700 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update Category'}
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-gray-500">Close</button>
      </div>
    </div>
  );
};

export default EditCategoryModal;
