interface Category {
    id: string;
    name: string;
    type: 'Food' | 'Bar' | 'Hookah';
    position: number;
    created_at: string;
}

interface UpdateCategoryFormProps {
    category: Category;                // The category to update
    setCategory: (category: Category) => void;  // Function to update the category
    handleUpdateCategory: (event: React.FormEvent) => void;  // Function to handle form submission
}

export const EditCategoryForm = ({
    category,
    setCategory,
    handleUpdateCategory,
}: UpdateCategoryFormProps) => {
    return (
        <form
            onSubmit={handleUpdateCategory}
            className="mb-6 bg-gray-800 p-4 rounded-lg flex flex-col justify-between h-full"
        >
            <div className="flex gap-4 mb-1 flex-1">
                <input
                    type="text"
                    placeholder="Category Name"
                    value={category.name}
                    onChange={(e) =>
                        setCategory({ ...category, name: e.target.value })
                    }
                    className="flex-1 bg-gray-700 px-3 py-2 w-4/5"
                    required
                />
                <select
                    value={category.type}
                    onChange={(e) =>
                        setCategory({
                            ...category,
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
                Update
            </button>
        </form>
    )
}
