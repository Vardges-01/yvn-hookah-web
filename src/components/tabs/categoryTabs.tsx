import { useTranslation } from "react-i18next";

const CategoryTabs = ({ categories, tabValue, handleChange }) => {
  const { t } = useTranslation();

  return (
    <div className="flex justify-center gap-8 md:gap-12 p-4 md:p-6 border-b border-gray-800">
      {categories.map((tab) => (
        <button
          key={tab}
          className={`text-lg md:text-xl font-semibold transition-all ${
            tabValue === tab
              ? "text-blue-500 scale-110"
              : "text-white/80 hover:text-white"
          }`}
          onClick={() => handleChange(tab)}
        >
          {t(`types.${tab}`)}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
