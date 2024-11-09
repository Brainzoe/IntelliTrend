
// src/components/Categories.tsx
import React from 'react';
import techLogo from '../assets/tech.svg'; // Path to tech logo SVG
import adventureLogo from '../assets/adventure.svg'; // Path to adventure logo SVG
import socialLogo from '../assets/social.svg'; // Path to social trends logo SVG
import celebrityLogo from '../assets/celebrity.svg'; // Path to celebrity trends logo SVG
import allLogo from '../assets/all.svg'; // Path to 'all' logo SVG

interface Category {
  label: string;
  logo: string;
}

interface CategoriesProps {
  onSelectCategory: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ onSelectCategory }) => {
  const categories: Category[] = [
    { label: 'All', logo: allLogo },
    { label: 'Tech', logo: techLogo },
    { label: 'Adventure', logo: adventureLogo },
    { label: 'Social Trends', logo: socialLogo },
    { label: 'Celebrity Trends', logo: celebrityLogo },
  ];

  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold mb-2">Categories</h3>
      <ul className="flex space-x-4 items-center">
        {categories.map(({ label, logo }) => (
          <li key={label} className="flex items-center space-x-2">
            <button 
              className="text-blue-500 hover:underline flex items-center space-x-1"
              onClick={() => onSelectCategory(label)}>
              <img src={logo} alt={`${label} logo`} className="h-6 w-6" />
              <span>{label}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Categories;












































// // src/components/Categories.tsx
// import React from 'react';

// interface CategoriesProps {
//   onSelectCategory: (category: string) => void;
// }

// const Categories: React.FC<CategoriesProps> = ({ onSelectCategory }) => {
//   const categories = ['All', 'Tech', 'Adventure', 'Social Trends', 'Celebrity Trends'];

//   return (
//     <div className="mb-4">
//       <h3 className="text-lg font-bold">Categories</h3>
//       <ul className="flex space-x-4">
//         {categories.map((category) => (
//           <li key={category}>
//             <button 
//               className="text-blue-500 hover:underline"
//               onClick={() => onSelectCategory(category)}>
//               {category}
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Categories;
