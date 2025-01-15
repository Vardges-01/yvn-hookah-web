import { Plus, Upload } from "lucide-react";

export const AddMenuItemForm = ({
    newMenuItem,
    setNewMenuItem,
    handleAddMenuItem,
    handleImageChange,
    imageFile,
    imagePreview,
    categories,
    isUploading
  }) => {
    return (
      <form
        onSubmit={handleAddMenuItem}
        className="mb-6 bg-gray-800 p-4 rounded-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Item Name"
            value={newMenuItem.name}
            onChange={(e) =>
              setNewMenuItem({ ...newMenuItem, name: e.target.value })
            }
            className="bg-gray-700 rounded px-3 py-2"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={newMenuItem.price || ''}
            onChange={(e) =>
              setNewMenuItem({
                ...newMenuItem,
                price: parseFloat(e.target.value),
              })
            }
            className="bg-gray-700 rounded px-3 py-2"
            required
          />
          <input
            type="number"
            placeholder="Rating (1-5)"
            value={newMenuItem.rating}
            onChange={(e) =>
              setNewMenuItem({
                ...newMenuItem,
                rating: parseInt(e.target.value),
              })
            }
            min="1"
            max="5"
            className="bg-gray-700 rounded px-3 py-2"
            required
          />
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="image-upload"
              required
            />
            <label
              htmlFor="image-upload"
              className="flex items-center gap-2 bg-gray-700 rounded px-3 py-2 cursor-pointer hover:bg-gray-600 transition-colors"
            >
              <Upload className="w-4 h-4" />
              {imageFile ? 'Change Image' : 'Upload Image'}
            </label>
            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded"
                />
              </div>
            )}
          </div>
          <select
            value={newMenuItem.category_id}
            onChange={(e) =>
              setNewMenuItem({ ...newMenuItem, category_id: e.target.value })
            }
            className="bg-gray-700 rounded px-3 py-2"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <button
            type="submit"
            disabled={isUploading}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />{' '}
            {isUploading ? 'Uploading...' : 'Add Item'}
          </button>
        </div>
      </form>
    );
  };
