import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditCategoryModal from './EditCategoryModal';
import CreateCategoryModal from './CreateCategoryModal';

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
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <button 
        className="mb-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600" 
        onClick={handleCreate}
      >
        Create New Category
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
        {categories.map((category) => (
          <div key={category.id} className="bg-white p-4 rounded-lg shadow-lg">
            <img src={category.image_url} alt={category.name} className="w-full h-40 object-cover rounded-md mb-4" />
            <h2 className="text-xl font-bold mb-2">{category.name}</h2>
            <button 
              className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600" 
              onClick={() => handleEdit(category)}
            >
              Edit
            </button>
          </div>
        ))}
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
  );
};

export default CategoryList;
