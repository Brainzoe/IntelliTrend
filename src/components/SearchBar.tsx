// src/components/SearchBar.tsx
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void; // Props definition
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(query); // Call the onSearch prop with the current query
  };

  return (
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search blog posts..."
        className="px-3 py-2 rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">Search</button>
    </form>
  );
};

export default SearchBar;
