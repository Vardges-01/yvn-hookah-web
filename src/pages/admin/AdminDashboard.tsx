import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { supabase, useSupabaseStorage } from "../../lib/supabase";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Category, MenuItem, Promos } from "../../components/admin/types/Menu.types";
import { SortableCategory } from "../../components/admin/categorySection/SortableCategory";
import { SortableMenuItem } from "../../components/admin/menuItemsSection/SortableMenuItem";
import { SearchAndFilter, ShowHideList } from "../../components/admin/more";
import {
  AddCategoryForm,
  AddMenuItemForm,
  EditCategoryForm,
  EditMenuItemForm,
} from "../../components/admin/forms";
import { CategoryGroupList } from "../../components/admin/categorySection/CategoryGroupList";
import { useTranslation } from "react-i18next";
import { AddPromoForm } from "../../components/admin/forms/AddPromoForm";
import { PromoList } from "../../components/admin/promo/PromoList";

export default function AdminDashboard() {
  const { t } = useTranslation();

  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [promos, setPromos] = useState<Promos[]>([]);
  const [newCategory, setNewCategory] = useState<
    Omit<Category, "id" | "created_at" | "position">
  >({
    name: "",
    type: "Food",
  });
  const [newMenuItem, setNewMenuItem] = useState<
    Omit<MenuItem, "id" | "created_at" | "categories" | "position">
  >({
    name: "",
    price: 0,
    rating: 5,
    image: "🍕",
    category_id: "",
  });

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [editingMenuItem, setEditingMenuItem] = useState<MenuItem | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] =
    useState<string>("all");

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isUploading, setIsUploading] = useState(false);

  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [isMenuItemsOpen, setIsMenuItemsOpen] = useState(false);
  const [isPromosListOpen, setIsPromosListOpen] = useState(false);
  const [categorySearch, setCategorySearch] = useState("");
  const [itemSearch, setItemSearch] = useState("");

  const { uploadFile, deleteFile } = useSupabaseStorage({ bucketName: 'menu-images' }); // Initialize

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 200,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchCategories();
    fetchMenuItems();
    fetchPromos();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .order("type", { ascending: true })
      .order("position", { ascending: true }); // Then order by position

    if (error) {
      toast.error("Error fetching categories");
      return;
    }

    setCategories(data);
  };

  const fetchMenuItems = async () => {
    const { data, error } = await supabase
      .from("menu_items")
      .select("*, categories(*)")
      .order("category_id", { ascending: false })
      .order("position", { ascending: true });

    if (error) {
      toast.error("Error fetching menu items");
      return;
    }
    setMenuItems(data);
  };

  const fetchPromos = async () => {
    const { data, error } = await supabase
      .from("promos").select('*')
    if (error) {
      toast.error("Error fetching Promos");
      return;
    }
    console.log("DATA: ", data)
    setPromos(data);
  };

  const handleDragEndCategory = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = categories.findIndex((cat) => cat.id === active.id);
    const newIndex = categories.findIndex((cat) => cat.id === over.id);

    if (categories[oldIndex].type != categories[newIndex].type) return;

    const updatedCategories = arrayMove(categories, oldIndex, newIndex);

    const filData = updatedCategories.filter(
      (el) => el.type == categories[oldIndex].type
    );

    setCategories(updatedCategories);

    // Update positions in database
    const updates = filData.map((cat, index) => ({
      id: cat.id,
      ...cat,
      position: index + 1,
    }));

    const { error } = await supabase.from("categories").upsert(updates);

    if (error) {
      toast.error("Error updating positions");
      console.log(error);
      fetchCategories(); // Revert to original order
    }

    toast.success("Position is update.");
  };

  const handleDragEndMenuItem = async (
    event: DragEndEvent,
    categoryId: string
  ) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const categoryItems = menuItems.filter(
      (item) => item.category_id === categoryId
    );

    const oldIndex = categoryItems.findIndex((item) => item.id === active.id);
    const newIndex = categoryItems.findIndex((item) => item.id === over.id);
    const updatedItems = arrayMove(categoryItems, oldIndex, newIndex);

    // Update positions in database
    const updates = updatedItems.map((item, index) => {
      const updateData = {
        id: item.id,
        ...item,
        position: index + 1,
      };

      delete updateData.categories;

      return updateData;
    });

    const { error } = await supabase.from("menu_items").upsert(updates);

    if (error) {
      toast.error("Error updating positions");
      fetchMenuItems(); // Revert to original order
      return;
    }

    fetchMenuItems(); // Revert to original order
    toast.success("Position is update.");
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    const maxPosition = Math.max(0, ...categories.map((c) => c.position));
    const { error } = await supabase
      .from("categories")
      .insert([{ ...newCategory, position: maxPosition + 1 }]);

    if (error) {
      toast.error("Error adding category");
      return;
    }

    toast.success("Category added successfully");
    setNewCategory({ name: "", type: "Food" });
    fetchCategories();
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
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await uploadFile(imageFile, setIsUploading);
      }

      const categoryItems = menuItems.filter(
        (item) => item.category_id === newMenuItem.category_id
      );
      const maxPosition = Math.max(
        0,
        ...categoryItems.map((item) => item.position)
      );

      const { error } = await supabase.from("menu_items").insert([
        {
          ...newMenuItem,
          image: imageUrl,
          position: maxPosition + 1,
        },
      ]);

      if (error) {
        throw error;
      }

      toast.success("Menu item added successfully");
      setNewMenuItem({
        name: "",
        price: 0,
        rating: 5,
        image: "",
        category_id: "",
      });
      setImageFile(null);
      setImagePreview("");
      fetchMenuItems();
    } catch (error) {
      toast.error("Error adding menu item");
      console.error("Error:", error);
    }
  };

  const handleUpdateCategory = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!editingCategory) return;

    const { error } = await supabase
      .from("categories")
      .update(editingCategory)
      .eq("id", editingCategory.id);

    if (error) {
      toast.error("Error updating category");
      return;
    }

    toast.success("Category updated successfully");
    setEditingCategory(null);
    fetchCategories();
  };

  const handleUpdateMenuItem = async (id: string) => {
    if (!editingMenuItem) return;

    delete editingMenuItem.categories;

    try {
      let imageUrl = editingMenuItem.image;
      if (imageFile) {
        const oldIetem = menuItems.find(el => el.id == id);
        imageUrl = await uploadFile(imageFile, setIsUploading);

        if (oldIetem.image && !oldIetem.image.includes('default')) {
          deleteFile(oldIetem.image)
          console.log('IMAGE DELETE')
        }
      }

      const { error } = await supabase
        .from("menu_items")
        .update({ ...editingMenuItem, image: imageUrl })
        .eq("id", id);

      if (error) {
        throw error;
      }

      toast.success("Menu item updated successfully");
      setEditingMenuItem(null);
      setImageFile(null);
      setImagePreview("");
      fetchMenuItems();
    } catch (error) {
      toast.error("Error updating menu item");
      console.error("Error:", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) {
      toast.error("Error deleting category");
      return;
    }

    toast.success("Category deleted successfully");
    fetchCategories();
    fetchMenuItems();
  };

  const handleDeleteMenuItem = async (id: string) => {
    const { error } = await supabase.from("menu_items").delete().eq("id", id);
    const oldIetem = menuItems.find(el=>el.id == id);

    if (oldIetem.image && !oldIetem.image.includes('default')) {
      deleteFile(oldIetem.image)
      console.log('IMAGE DELETE')
    }

    if (error) {
      toast.error("Error deleting menu item");
      return;
    }

    toast.success("Menu item deleted successfully");
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
      selectedCategoryFilter === "all" ||
      item.category_id === selectedCategoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <ShowHideList
        title={"Promos"}
        isOpen={isPromosListOpen}
        handleClick={setIsPromosListOpen}
      />
      {/* Promo Section */}
      {isPromosListOpen && <div className="mb-12 space-y-8">
        {/* Add Promo Form */}
        <AddPromoForm isOpen={isPromosListOpen} fetchPromos={fetchPromos} />

        {/* Promo List */}
        <PromoList isOpen={isPromosListOpen} promos={promos} />
      </div>}

      <ShowHideList
        title={"Categories"}
        isOpen={isCategoryListOpen}
        handleClick={setIsCategoryListOpen}
      />

      {/* Categories Section */}
      {isCategoryListOpen && <div className="mb-12 space-y-8">

        {/* Add Category Form */}
        <AddCategoryForm
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          handleAddCategory={handleAddCategory}
        />

        {/* Category Search */}
        <SearchAndFilter
          searchValue={categorySearch}
          handleSearch={setCategorySearch}
          showFilter={false}
        />

        {/* Categories List */}
        {Object.entries(groupedCategoryItems).map(
          ([type, subCategories], index) => (
            <CategoryGroupList
              key={index}
              type={type}
              subCategories={subCategories}
              sensors={sensors}
              handleDragEndCategory={handleDragEndCategory}
            >
              {subCategories.map((category) =>
                editingCategory?.id == category.id ? (
                  <EditCategoryForm
                    editingCategory={editingCategory}
                    setEditingCategory={setEditingCategory}
                    handleUpdateCategory={handleUpdateCategory}
                  />
                ) : (
                  <SortableCategory
                    key={category.id}
                    category={category}
                    onEdit={setEditingCategory}
                    onDelete={handleDeleteCategory}
                  />
                )
              )}
            </CategoryGroupList>
          )
        )}
      </div>}

      <ShowHideList
        title={"Menu Items"}
        isOpen={isMenuItemsOpen}
        handleClick={setIsMenuItemsOpen}
      />
      {/* Menu Items Section */}
      {isMenuItemsOpen && <div className="mb-12 space-y-8">
        {/* Add Menu Item Form */}
        <AddMenuItemForm
          newMenuItem={newMenuItem}
          setNewMenuItem={setNewMenuItem}
          handleAddMenuItem={handleAddMenuItem}
          handleImageChange={handleImageChange}
          imageFile={imageFile}
          imagePreview={imagePreview}
          categories={categories}
          isUploading={isUploading}
        />

        {/* Menu Item Search and Filter */}
        <SearchAndFilter
          searchValue={itemSearch}
          handleSearch={setItemSearch}
          options={categories}
          filterValue={selectedCategoryFilter}
          handleSelect={setSelectedCategoryFilter}
        />

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
                <h3 className="text-xl font-semibold mb-4">
                  {t(`categories.${category.name}`)}
                </h3>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={(event) =>
                    handleDragEndMenuItem(event, categoryId)
                  }
                >
                  <SortableContext
                    items={items.map((item) => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="grid gap-4">
                      {items
                        .sort((a, b) => a.position - b.position)
                        .map((item) =>
                          editingMenuItem?.id == item.id ? (
                            <EditMenuItemForm
                              key={item.id}
                              item={item}
                              categories={categories}
                              handleUpdateMenuItem={handleUpdateMenuItem}
                              handleImageChange={handleImageChange}
                              setEditingMenuItem={setEditingMenuItem}
                              editingMenuItem={editingMenuItem}
                              isUploading={isUploading}
                            />
                          ) : (
                            <SortableMenuItem
                              key={item.id}
                              item={item}
                              categories={categories}
                              onEdit={setEditingMenuItem}
                              onDelete={handleDeleteMenuItem}
                            />
                          )
                        )}
                    </div>
                  </SortableContext>
                </DndContext>
              </div>
            );
          })}
        </div>
      </div>}
    </div>
  );
}
