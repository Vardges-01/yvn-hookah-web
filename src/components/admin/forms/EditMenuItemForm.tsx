// MenuItemEditor.tsx
import React, { useState, useEffect } from 'react';
import { Category, MenuItem } from '../types/Menu.types';


interface MenuItemEditorProps {
  item: MenuItem;
  categories: Category[];
  handleUpdateMenuItem: (id: string) => void;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>, itemId: string) => void;
  editingMenuItem,
  setEditingMenuItem,
  isUploading: boolean;
}

export const EditMenuItemForm: React.FC<MenuItemEditorProps> = ({
  item,
  categories,
  handleUpdateMenuItem,
  handleImageChange,
  editingMenuItem,
  setEditingMenuItem,
  isUploading
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    setEditingMenuItem(item);
  }, [item]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingMenuItem({
      ...editingMenuItem,
      [name]: name === 'price' || name === 'rating' ? parseFloat(value) : value,
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditingMenuItem({
      ...editingMenuItem,
      category_id: e.target.value,
    });
  };

  const handleCancel = () => {
    setEditingMenuItem(null);
    setImagePreview('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setImagePreview(URL.createObjectURL(file));
      handleImageChange(e, item.id);
    }
  };

  return (
    <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        type="text"
        name="name"
        value={editingMenuItem.name}
        onChange={handleInputChange}
        className="bg-gray-700 rounded px-3 py-2"
      />
      <input
        type="number"
        name="price"
        value={editingMenuItem.price}
        onChange={handleInputChange}
        className="bg-gray-700 rounded px-3 py-2"
      />
      <input
        type="number"
        name="rating"
        value={editingMenuItem.rating}
        onChange={handleInputChange}
        min="1"
        max="5"
        className="bg-gray-700 rounded px-3 py-2"
      />
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id={`image-upload-${item.id}`}
        />
        <label
          htmlFor={`image-upload-${item.id}`}
          className="flex items-center gap-2 bg-gray-700 rounded px-3 py-2 cursor-pointer hover:bg-gray-600 transition-colors"
        >
          <span className="w-4 h-4">📤</span> Change Image
        </label>
        {(imagePreview || item.image) && (
          <div className="mt-2">
            <img
              src={imagePreview || item.image || ''}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />
          </div>
        )}
      </div>
      <select
        value={editingMenuItem.category_id}
        onChange={handleCategoryChange}
        className="bg-gray-700 rounded px-3 py-2"
      >
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <div className="flex gap-2">
        <button
          onClick={() => handleUpdateMenuItem(item.id)}
          disabled={isUploading}
          className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? 'Uploading...' : 'Save'}
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded flex-1"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};