const SubCategoryTabs = ({
  subCategories,
  tabValue,
  handleChange,
  hasFavorites,
}) => {
  console.log(hasFavorites);
  return (
    // Food Categories
    <div className="flex gap-3 md:gap-4 p-4 md:p-6 overflow-x-auto scrollbar-hide">
      {hasFavorites && (
        <button
          key="favorites"
          className={`px-4 md:px-6 py-2 rounded-full whitespace-nowrap transition-all transform hover:scale-105 ${
            tabValue === "favorite"
              ? "bg-blue-600 text-white"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
          onClick={() => handleChange("favorite")}
        >
          Favorites
        </button>
      )}
      {subCategories?.map((category, index) => (
        <button
          key={index}
          className={`px-4 md:px-6 py-2 rounded-full whitespace-nowrap transition-all transform hover:scale-105 ${
            tabValue === category.id
              ? "bg-blue-600 text-white"
              : "bg-gray-800 hover:bg-gray-700"
          }`}
          onClick={() => handleChange(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default SubCategoryTabs;
