import {
  Search as SearchUi,
} from 'lucide-react';

export const SearchAndFilter = ({ searchValue, handleSearch, showFilter = true, options = null, filterValue = null, handleSelect = null }) => {
  return (
    <div className="flex gap-4 mb-4">

      <div className="relative flex-1">
        <SearchUi className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search menu items..."
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full bg-gray-800 rounded-lg pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {showFilter && <select
        value={filterValue}
        onChange={(e) => handleSelect(e.target.value)}
        className="bg-gray-800 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500"
      >
        <option value="all">All Categories</option>
        {options.map((option) => (
          <option key={option?.id} value={option?.id}>
            {option?.name}
          </option>
        ))}
      </select>}
    </div>
  )
}
