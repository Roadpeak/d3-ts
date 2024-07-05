import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditCategoryModal from './EditCategoryModal';
import CreateCategoryModal from './CreateCategoryModal';
import AdminLayout from '../../utils/layouts/AdminLayout';

interface Category {
  id: number;
  name: string;
  image_url: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('https://api.discoun3ree.com/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (category: Category) => {
    setEditCategory(category);
  };

  const handleCreate = () => {
    setShowCreateModal(true);
  };

  return (
    <AdminLayout>
        <div className="min-h-screen flex flex-col items-center bg-gray-100 py-6">
            <h1 className="text-2xl font-bold mb-4">Categories</h1>
            <button 
                className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600" 
                onClick={handleCreate}
            >
                Create New Category
            </button>
            <div className="w-full overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead>
                    <tr>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Image</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Name</th>
                    <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-gray-600 tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                    <tr key={category.id}>
                        <td className="px-6 py-4 border-b border-gray-300">
                        <img src={category.image_url} alt={category.name} className="w-20 h-20 object-cover rounded-md" />
                        </td>
                        <td className="px-6 py-4 border-b border-gray-300">{category.name}</td>
                        <td className="px-6 py-4 border-b border-gray-300">
                        <button 
                            className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600" 
                            onClick={() => handleEdit(category)}
                        >
                            Edit
                        </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            {editCategory && (
                <EditCategoryModal 
                category={editCategory} 
                onClose={() => setEditCategory(null)} 
                onRefresh={fetchCategories} 
                />
            )}
            {showCreateModal && (
                <CreateCategoryModal 
                onClose={() => setShowCreateModal(false)} 
                onRefresh={fetchCategories} 
                />
            )}
        </div>
    </AdminLayout>
  );
};

export default CategoryList;
