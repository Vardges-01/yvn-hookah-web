interface Category {
    id: string;
    name: string;
    type: 'Food' | 'Bar' | 'Hookah';
    position: number;
    created_at: string;
}

interface UpdateCategoryFormProps {
    editingCategory: Category;                // The category to update
    setEditingCategory: (category: Category) => void;  // Function to update the category
    handleUpdateCategory: (event: React.FormEvent) => void;  // Function to handle form submission
}

export const EditCategoryForm = ({
    editingCategory,
    setEditingCategory,
    handleUpdateCategory,
}: UpdateCategoryFormProps) => {

    const handleCancel = () => {
        setEditingCategory(null);
    };

    return (
        <form
            onSubmit={handleUpdateCategory}
            className="mb-6 bg-gray-800 p-4 rounded-lg flex flex-col justify-between h-full"
        >
            <div className="flex gap-4 mb-1 flex-1">
                <input
                    type="text"
                    placeholder="Category Name"
                    value={editingCategory.name}
                    onChange={(e) =>
                        setEditingCategory({ ...editingCategory, name: e.target.value })
                    }
                    className="flex-1 bg-gray-700 px-3 py-2 w-4/5"
                    required
                />
                <select
                    value={editingCategory.type}
                    onChange={(e) =>
                        setEditingCategory({
                            ...editingCategory,
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
            <div className="flex gap-2 justify-end mt-2">
                <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2 sm:mt-0 sm:mr-0"
                >
                    Update
                </button>
                <button
                    onClick={handleCancel}
                    className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded flex items-center gap-2 sm:mt-0 sm:mr-0"
                >
                    Cancel
                </button>
            </div>
        </form>
    )
}
