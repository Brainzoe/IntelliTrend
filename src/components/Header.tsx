import React, { useState } from 'react';
import SearchBar from './SearchBar';

// Import your logo and icons
import logo from '../assets/Heading.gif'; // Replace with your logo path
import homeIcon from '../assets/home-icon.svg';
import aboutIcon from '../assets/about-icon.svg';
import contactIcon from '../assets/contact-icon.svg';

interface Category {
  label: string;
  icon: string;
}

interface HeaderProps {
  onSearch: (query: string) => void;
  categories: Category[]; // Update to Category[] array to include icon paths
  onCategorySelect: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, categories, onCategorySelect }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-gray-800 pt-16 text-black p-4 flex flex-col md:flex-row md:justify-between md:items-center sticky top-0 left-0 right-0 z-50 shadow-lg">
      {/* Logo and mobile menu toggle */}
      <div className="flex justify-between items-center w-full md:w-auto">
        <img src={logo} alt="IntelliTrend Logo" className="h-14 md:h-20 lg:h-24" /> {/* Adjusted sizes for different screens */}
        <button 
          className="md:hidden text-white focus:outline-none" 
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Navigation links, including categories */}
      <nav className={`flex flex-col md:flex md:flex-row md:justify-start md:space-x-4 ${isMobileMenuOpen ? 'block' : 'hidden'} md:block`}>
        <a href="/" className="hover:text-gray-300 flex items-center py-2 md:py-0">
          <img src={homeIcon} alt="Home" className="h-5 mr-2" />
          Home
        </a>
        <a href="/about" className="hover:text-gray-300 flex items-center py-2 md:py-0">
          <img src={aboutIcon} alt="About" className="h-5 mr-2" />
          About
        </a>
        <a href="/contact" className="hover:text-gray-300 flex items-center py-2 md:py-0">
          <img src={contactIcon} alt="Contact" className="h-5 mr-2" />
          Contact
        </a>

        {/* Render categories with icons */}
        {categories.map((category) => (
          <a 
            key={category.label} 
            href={`/${category.label.toLowerCase()}`} // Adjusted route to match path (e.g., /technology, /adventure)
            onClick={() => onCategorySelect(category.label)} 
            className="hover:text-gray-300 flex items-center py-2 md:py-0"
          >
            <img src={category.icon} alt={category.label} className="h-5 mr-2" />
            {category.label}
          </a>
        ))}
      </nav>

      {/* Search bar */}
      <div className="mt-4 md:mt-0">
        <SearchBar onSearch={onSearch} />
      </div>
    </header>
  );
};

export default Header;







// // src/components/Header.tsx
// import React from 'react';
// import SearchBar from './SearchBar';

// interface HeaderProps {
//   onSearch: (query: string) => void; // Accept the onSearch prop
// }

// const Header: React.FC<HeaderProps> = ({ onSearch }) => {
//   return (
//     <header>
//       <h1>IntelliTrend</h1>
//       <SearchBar onSearch={onSearch} /> {/* Include the SearchBar within the header */}
//     </header>
//   );
// };

// export default Header;
