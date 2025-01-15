import { Pencil, Trash2, Upload } from "lucide-react";
import {
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableMenuItemProps } from "../types/Menu.types"


export const SortableMenuItem = ({
    item,
    onEdit,
    onDelete,
    categories,
}: SortableMenuItemProps) => {

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
