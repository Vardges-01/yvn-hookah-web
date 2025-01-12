import React, { useState, useEffect } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  Upload,
  ChevronUp,
  ChevronDown,
  Search,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { supabase } from '../../lib/supabase';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface Category {
  id: string;
  name: string;
  type: 'Food' | 'Bar' | 'Hookah';
  position: number;
  created_at: string;
}

interface MenuItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  image: string;
  category_id: string;
  position: number;
  created_at: string;
  categories?: Category;
}

interface SortableCategoryProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

interface SortableMenuItemProps {
  item: MenuItem;
  categories: Category[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
}

function SortableCategory({ category, onEdit, onDelete }: SortableCategoryProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: category.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-800 p-4 rounded-lg flex items-center justify-between cursor-move"
      {...attributes}
      {...listeners}
    >
      <div>
        <h3 className="font-semibold">{category.name}</h3>
        <p className="text-sm text-gray-400">{category.type}</p>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(category)}
          className="text-blue-400 hover:text-blue-300"
        >
          <Pencil className="w-5 h-5" />
        </button>
        <button
          onClick={() => onDelete(category.id)}
          className="text-red-400 hover:text-red-300"
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function SortableMenuItem({
  item,
  onEdit,
  onDelete,
  categories,
}: SortableMenuItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-800 p-4 rounded-lg cursor-move"
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 object-cover rounded"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-700 rounded flex items-center justify-center">
              <Upload className="w-6 h-6 text-gray-400" />
            </div>
          )}
          <div>
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-400">
              {categories.find((c) => c.id === item.category_id)?.name} -{' '}
              {item.price}₸
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(item)}
            className="text-blue-400 hover:text-blue-300"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Остановить конфликт событий
              onDelete(item.id); // Вызвать обработчик
            }}
            // onClick={() => onDelete(item.id)}
            className="text-red-400 hover:text-red-300"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [newCategory, setNewCategory] = useState<
    Omit<Category, 'id' | 'created_at' | 'position'>
  >({
    name: '',
    type: 'Food',
  });
  const [newMenuItem, setNewMenuItem] = useState<
    Omit<MenuItem, 'id' | 'created_at' | 'categories' | 'position'>
  >({
    name: '',
    price: 0,
    rating: 5,
    image: '🍕',
    category_id: '',
  });

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] =
    useState<string>('all');

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState('');
  const [itemSearch, setItemSearch] = useState('');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200, // Задержка в миллисекундах
        tolerance: 5, // Движение курсора до начала перетаскивания
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchCategories();
    fetchMenuItems();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase.from('categories').select('*')
      .order('type', { ascending: true })
      .order('position', { ascending: true }); // Then order by position


    if (error) {
      toast.error('Error fetching categories');
      return;
    }

    setCategories(data);
  };

  const fetchMenuItems = async () => {
    const { data, error } = await supabase
      .from('menu_items')
      .select('*, categories(*)')
      .order('category_id', { ascending: false })
      .order('position', { ascending: true });

    if (error) {
      toast.error('Error fetching menu items');
      return;
    }
    setMenuItems(data);
  };

  const handleDragEndCategory = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = categories.findIndex(cat => cat.id === active.id);
    const newIndex = categories.findIndex(cat => cat.id === over.id);

    if (categories[oldIndex].type != categories[newIndex].type) return;


    const updatedCategories = arrayMove(categories, oldIndex, newIndex);

    const filData = updatedCategories.filter((el) => el.type == categories[oldIndex].type)

    setCategories(updatedCategories);

    // Update positions in database
    const updates = filData.map((cat, index) => ({
      id: cat.id,
      ...cat,
      position: index + 1,
    }));

    const { error } = await supabase
      .from('categories')
      .upsert(updates);

    if (error) {
      toast.error('Error updating positions');
      console.log(error)
      fetchCategories(); // Revert to original order
    }

    toast.success('Position is update.');

  };

  const handleDragEndMenuItem = async (event: DragEndEvent, categoryId: string) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const categoryItems = menuItems.filter(item => item.category_id === categoryId);
    
    const oldIndex = categoryItems.findIndex(item => item.id === active.id);
    const newIndex = categoryItems.findIndex(item => item.id === over.id);
    const updatedItems = arrayMove(categoryItems, oldIndex, newIndex);

    // Update positions in database
    const updates = updatedItems.map((item, index) => {
      const updateData = {
        id: item.id,
        ...item,
        position: index + 1,
      }

      delete updateData.categories

      return updateData
    });

    const { error } = await supabase
      .from('menu_items')
      .upsert(updates);

    if (error) {
      toast.error('Error updating positions');
      fetchMenuItems(); // Revert to original order
      return;
    }

    fetchMenuItems(); // Revert to original order
    toast.success('Position is update.');

  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const maxPosition = Math.max(0, ...categories.map((c) => c.position));
    const { error } = await supabase
      .from('categories')
      .insert([{ ...newCategory, position: maxPosition + 1 }]);

    if (error) {
      toast.error('Error adding category');
      return;
    }

    toast.success('Category added successfully');
    setNewCategory({ name: '', type: 'Food' });
    fetchCategories();
  };

  const uploadImage = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `menu-items/${fileName}`;

    setIsUploading(true);
    try {
      const { error: uploadError } = await supabase.storage
        .from('menu-images')
        .upload(filePath, file);

      if (uploadError) {
        console.log(uploadError);
        throw uploadError;
      }

      const {
        data: { publicUrl },
      } = supabase.storage.from('menu-images').getPublicUrl(filePath);

      return publicUrl;
    } catch (error: any) {
      if (error.error == 'Bucket not found') {
        // await createBucket();
      }
      console.error('Error uploading image:', error);
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  };

  const handleAddMenuItem = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const categoryItems = menuItems.filter(
        (item) => item.category_id === newMenuItem.category_id
      );
      const maxPosition = Math.max(
        0,
        ...categoryItems.map((item) => item.position)
      );

      const { error } = await supabase.from('menu_items').insert([
        {
          ...newMenuItem,
          image: imageUrl,
          position: maxPosition + 1,
        },
      ]);

      if (error) {
        throw error;
      }

      toast.success('Menu item added successfully');
      setNewMenuItem({
        name: '',
        price: 0,
        rating: 5,
        image: '',
        category_id: '',
      });
      setImageFile(null);
      setImagePreview('');
      fetchMenuItems();
    } catch (error) {
      toast.error('Error adding menu item');
      console.error('Error:', error);
    }
  };

  // const handleUpdateCategory = async (id: string) => {
  //   if (!editingCategory) return;

  //   const { error } = await supabase
  //     .from('categories')
  //     .update(editingCategory)
  //     .eq('id', id);

  //   if (error) {
  //     toast.error('Error updating category');
  //     return;
  //   }

  //   toast.success('Category updated successfully');
  //   setEditingCategory(null);
  //   fetchCategories();
  // };

  const handleUpdateMenuItem = async (id: string) => {
    if (!editingMenuItem) return;

    delete editingMenuItem.categories;

    try {
      let imageUrl = editingMenuItem.image;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const { error } = await supabase
        .from('menu_items')
        .update({ ...editingMenuItem, image: imageUrl })
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast.success('Menu item updated successfully');
      setEditingMenuItem(null);
      setImageFile(null);
      setImagePreview('');
      fetchMenuItems();
    } catch (error) {
      toast.error('Error updating menu item');
      console.error('Error:', error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const { error } = await supabase.from('categories').delete().eq('id', id);

    if (error) {
      toast.error('Error deleting category');
      return;
    }

    toast.success('Category deleted successfully');
    fetchCategories();
    fetchMenuItems();
  };

  const handleDeleteMenuItem = async (id: string) => {
    const { error } = await supabase.from('menu_items').delete().eq('id', id);
    console.log(editingCategory)
    if (error) {
      toast.error('Error deleting menu item');
      return;
    }

    toast.success('Menu item deleted successfully');
    fetchMenuItems();
  };

  const filteredCategories = categories.filter(
    (category) =>
      category.name.toLowerCase().includes(categorySearch.toLowerCase()) ||
      category.type.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const groupedCategoryItems = filteredCategories.reduce((acc, item) => {
    const type = item.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(item);
    return acc;
  }, {} as Record<string, Category[]>);

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(itemSearch.toLowerCase());
    const matchesCategory =
      selectedCategoryFilter === 'all' ||
      item.category_id === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  // const groupedMenuItems = filteredMenuItems.reduce((acc, item) => {
  //   const categoryId = item.category_id;
  //   if (!acc[categoryId]) {
  //     acc[categoryId] = [];
  //   }
  //   acc[categoryId].push(item);
  //   return acc;
  // }, {} as Record<string, MenuItem[]>);


  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Categories Section */}
      <div className="mb-12 space-y-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Categories</h2>
          <button
            onClick={() => setIsCategoryListOpen(!isCategoryListOpen)}
            className="text-gray-400 hover:text-white"
          >
            {isCategoryListOpen ? (
              <ChevronUp className="w-6 h-6" />
            ) : (
              <ChevronDown className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Add Category Form */}
        <form
          onSubmit={handleAddCategory}
          className="mb-6 bg-gray-800 p-4 rounded-lg flex flex-col justify-between h-full"
        >
          <div className="flex gap-4 mb-1 flex-1">
            <input
              type="text"
              placeholder="Category Name"
              value={newCategory.name}
              onChange={(e) =>
                setNewCategory({ ...newCategory, name: e.target.value })
              }
              className="flex-1 bg-gray-700 rounded px-3 py-2"
              required
            />
            <select
              value={newCategory.type}
              onChange={(e) =>
                setNewCategory({
                  ...newCategory,
                  type: e.target.value as Category['type'],
                })
              }
              className="bg-gray-700 rounded px-3 py-2"
            >
              <option value="Food">Food</option>
              <option value="Bar">Bar</option>
              <option value="Hookah">Hookah</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2 mx-auto mt-4 sm:mt-0 sm:ml-auto sm:mr-0"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </form>

        {/* Category Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search categories..."
            value={categorySearch}
            onChange={(e) => setCategorySearch(e.target.value)}
            className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories List */}
        {isCategoryListOpen &&
          Object.entries(groupedCategoryItems).map(
            ([type, subCategories], index) => {
              // console.log(type, subCategories); // LOG CATEGORIES GROUP
              return (
                <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">{type}</h3>
                  <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEndCategory}
                  >
                    <SortableContext
                      items={subCategories.map(cat => cat.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      <div className="grid gap-4">
                        {subCategories.map(category => (

                          <SortableCategory
                            key={category.id}
                            category={category}
                            onEdit={setEditingCategory}
                            onDelete={handleDeleteCategory}
                          />
                        ))}
                      </div>
                    </SortableContext>
                  </DndContext>
                </div>
              );
            }
          )}
      </div>

      {/* Menu Items Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Menu Items</h2>

        {/* Add Menu Item Form */}
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

        {/* Menu Item Search and Filter */}
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={itemSearch}
              onChange={(e) => setItemSearch(e.target.value)}
              className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Menu Items List */}
        <div className="space-y-8">
          {Object.entries(
            filteredMenuItems.reduce((acc, item) => {
              const categoryId = item.category_id;
              if (!acc[categoryId]) {
                acc[categoryId] = [];
              }
              acc[categoryId].push(item);
              return acc;
            }, {} as Record<string, MenuItem[]>)
          ).map(([categoryId, items]) => {
            const category = categories.find((c) => c.id === categoryId);
            if (!category) return null;

            return (
              <div key={categoryId} className="bg-gray-800/50 p-4 rounded-lg">
                <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(event) => handleDragEndMenuItem(event, categoryId)}
                >
                  <SortableContext
                    items={items.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="grid gap-4">
                      {items
                        .sort((a, b) => a.position - b.position)
                        .map((item) => (
                          editingMenuItem?.id == item.id ?
                          <div key={item.id} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              value={editingMenuItem.name}
                              onChange={(e) =>
                                setEditingMenuItem({
                                  ...editingMenuItem,
                                  name: e.target.value,
                                })
                              }
                              className="bg-gray-700 rounded px-3 py-2"
                            />
                            <input
                              type="number"
                              value={editingMenuItem.price}
                              onChange={(e) =>
                                setEditingMenuItem({
                                  ...editingMenuItem,
                                  price: parseFloat(e.target.value),
                                })
                              }
                              className="bg-gray-700 rounded px-3 py-2"
                            />
                            <input
                              type="number"
                              value={editingMenuItem.rating}
                              onChange={(e) =>
                                setEditingMenuItem({
                                  ...editingMenuItem,
                                  rating: parseInt(e.target.value),
                                })
                              }
                              min="1"
                              max="5"
                              className="bg-gray-700 rounded px-3 py-2"
                            />
                            <div className="relative">
                              <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                                id={`image-upload-${item.id}`}
                              />
                              <label
                                htmlFor={`image-upload-${item.id}`}
                                className="flex items-center gap-2 bg-gray-700 rounded px-3 py-2 cursor-pointer hover:bg-gray-600 transition-colors"
                              >
                                <Upload className="w-4 h-4" />
                                Change Image
                              </label>
                              {(imagePreview || item.image) && (
                                <div className="mt-2">
                                  <img
                                    src={imagePreview || item.image}
                                    alt={item.name}
                                    className="w-20 h-20 object-cover rounded"
                                  />
                                </div>
                              )}
                            </div>
                            <select
                              value={editingMenuItem.category_id}
                              onChange={(e) =>
                                setEditingMenuItem({
                                  ...editingMenuItem,
                                  category_id: e.target.value,
                                })
                              }
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
                                onClick={() => {
                                  setEditingMenuItem(null);
                                  setImageFile(null);
                                  setImagePreview('');
                                }}
                                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded flex-1"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                          : <SortableMenuItem
                          key={item.id}
                          item={item}
                          categories={categories}
                          onEdit={setEditingMenuItem}
                          onDelete={handleDeleteMenuItem}
                        />
                        ))}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            );
          })}
        </div>
      </div>
    </div >
  );
}
