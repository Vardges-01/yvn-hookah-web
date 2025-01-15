import { Plus } from 'lucide-react'

interface Category {
    id: string;
    name: string;
    type: 'Food' | 'Bar' | 'Hookah';
    position: number;
    created_at: string;
}

export const AddCategoryForm = ({ newCategory, setNewCategory, handleAddCategory }) => {
    return (
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
    )
}
