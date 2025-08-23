// src/components/SearchBar.tsx
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query);
  };

  return (
<form
  onSubmit={handleSearch}
  className="flex w-auto" // container adapts to content
>
  <input
    type="text"
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    placeholder="Search..."
    className="w-32 px-2 py-1 text-sm rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <button
    type="submit"
    className="w-16 px-2 py-1 text-sm bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
  >
    Go
  </button>
</form>


  );
};

export default SearchBar;
