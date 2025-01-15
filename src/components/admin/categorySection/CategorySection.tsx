const CategorySection = () => {
  return (
    //   {/* Categories Section */}
    //   <div className="mb-12 space-y-8">
    //     <div className="flex items-center justify-between mb-4">
    //       <h2 className="text-2xl font-semibold">Categories</h2>
    //       <button
    //         onClick={() => setIsCategoryListOpen(!isCategoryListOpen)}
    //         className="text-gray-400 hover:text-white"
    //       >
    //         {isCategoryListOpen ? (
    //           <ChevronUp className="w-6 h-6" />
    //         ) : (
    //           <ChevronDown className="w-6 h-6" />
    //         )}
    //       </button>
    //     </div>

    //     {/* Add Category Form */}
    //     <form
    //       onSubmit={handleAddCategory}
    //       className="mb-6 bg-gray-800 p-4 rounded-lg flex flex-col justify-between h-full"
    //     >
    //       <div className="flex gap-4 mb-1 flex-1">
    //         <input
    //           type="text"
    //           placeholder="Category Name"
    //           value={newCategory.name}
    //           onChange={(e) =>
    //             setNewCategory({ ...newCategory, name: e.target.value })
    //           }
    //           className="flex-1 bg-gray-700 rounded px-3 py-2"
    //           required
    //         />
    //         <select
    //           value={newCategory.type}
    //           onChange={(e) =>
    //             setNewCategory({
    //               ...newCategory,
    //               type: e.target.value as Category['type'],
    //             })
    //           }
    //           className="bg-gray-700 rounded px-3 py-2"
    //         >
    //           <option value="Food">Food</option>
    //           <option value="Bar">Bar</option>
    //           <option value="Hookah">Hookah</option>
    //         </select>
    //       </div>
    //       <button
    //         type="submit"
    //         className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded flex items-center gap-2 mx-auto mt-4 sm:mt-0 sm:ml-auto sm:mr-0"
    //       >
    //         <Plus className="w-4 h-4" /> Add
    //       </button>
    //     </form>

    //     {/* Category Search */}
    //     <div className="relative mb-4">
    //       <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
    //       <input
    //         type="text"
    //         placeholder="Search categories..."
    //         value={categorySearch}
    //         onChange={(e) => setCategorySearch(e.target.value)}
    //         className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500"
    //       />
    //     </div>

    //     {/* Categories List */}
    //     {isCategoryListOpen &&
    //       Object.entries(groupedCategoryItems).map(
    //         ([type, subCategories], index) => {
    //           // console.log(type, subCategories); // LOG CATEGORIES GROUP
    //           return (
    //             <div key={index} className="bg-gray-800/50 p-4 rounded-lg">
    //               <h3 className="text-xl font-semibold mb-4">{type}</h3>
    //               <DndContext
    //                 sensors={sensors}
    //                 collisionDetection={closestCenter}
    //                 onDragEnd={handleDragEndCategory}
    //               >
    //                 <SortableContext
    //                   items={subCategories.map(cat => cat.id)}
    //                   strategy={verticalListSortingStrategy}
    //                 >
    //                   <div className="grid gap-4">
    //                     {subCategories.map(category => (

    //                       <SortableCategory
    //                         key={category.id}
    //                         category={category}
    //                         onEdit={setEditingCategory}
    //                         onDelete={handleDeleteCategory}
    //                       />
    //                     ))}
    //                   </div>
    //                 </SortableContext>
    //               </DndContext>
    //             </div>
    //           );
    //         }
    //       )}
    //   </div>
    <div>Hello</div>
    )
}
export default CategorySection