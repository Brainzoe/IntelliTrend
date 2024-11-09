// src/components/CategoryFilter.tsx
import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  onSelect: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ categories, onSelect }) => {
  return (
    <div>
      <h3>Filter by Category:</h3>
      {categories.map((category) => (
        <button key={category} onClick={() => onSelect(category)}>
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
