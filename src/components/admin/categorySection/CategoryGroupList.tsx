import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useTranslation } from "react-i18next";

export const CategoryGroupList = ({ type, subCategories, sensors, handleDragEndCategory, children }) => {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-800/50 p-4 rounded-lg">
      <h3 className="text-xl font-semibold mb-4">{t(`types.${type.toLowerCase()}`)}</h3>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEndCategory}
      >
        <SortableContext
          items={subCategories.map((cat) => cat.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="grid gap-4">
            {children}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};