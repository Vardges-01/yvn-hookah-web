import { Pencil, Trash2 } from "lucide-react";
// import { SortableCategoryProps } from "../types/Menu.types"
import { useTranslation } from "react-i18next";

export const PromoItem = ({ promo, onEdit, onDelete }: any) => {
    const { t } = useTranslation();
    return (
        <div
            className="bg-gray-800 p-4 rounded-lg flex items-center justify-between cursor-move"
        >
            <div>
                <h3 className="font-semibold">{promo.name}</h3>
                <p className="text-sm text-gray-400">{t(`promo.${promo.description}`)}</p>
            </div>
            <div className="flex gap-2">
                <button
                    onClick={() => onEdit(promo)}
                    className="text-blue-400 hover:text-blue-300"
                >
                    <Pencil className="w-5 h-5" />
                </button>
                <button
                    onClick={() => onDelete(promo.id)}
                    className="text-red-400 hover:text-red-300"
                >
                    <Trash2 className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
