import { Pencil, Trash2 } from "lucide-react";
import {
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { SortableCategoryProps } from "../types/Menu.types"
import { useTranslation } from "react-i18next";

export const SortableCategory = ({ category, onEdit, onDelete }: SortableCategoryProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: category.id });

    const { t } = useTranslation();

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
                <h3 className="font-semibold">{t(`categories.${category.name}`)}</h3>
                <p className="text-sm text-gray-400">{t(`types.${category.type.toLowerCase()}`)}</p>
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
