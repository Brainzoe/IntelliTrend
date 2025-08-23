// src/components/Header.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from './SearchBar';
import { useAuth } from '../context/AuthContext';
import logo1 from '../assets/Heading.png';
import homeIcon from '../assets/home-icon.svg';
import aboutIcon from '../assets/about-icon.svg';
import contactIcon from '../assets/contact-icon.svg';

interface Category {
  label: string;
  icon: string;
}

interface HeaderProps {
  onSearch: (query: string) => void;
  categories: Category[];
  onCategorySelect: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onSearch, categories, onCategorySelect }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-gray-800 text-black p-4 flex flex-col md:flex-row md:justify-between md:items-center sticky top-0 left-0 right-0 z-50 shadow-lg">
      
      {/* Logo and mobile menu toggle */}
      <div className="flex justify-between items-center w-full md:w-auto">
        <img src={logo1} alt="IntelliTrend Logo" className="h-14 md:h-20 lg:h-24" />
        <button className="md:hidden text-white focus:outline-none" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? '✖' : '☰'}
        </button>
      </div>

      {/* Navigation links */}
      <nav className={`flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0 ${isMobileMenuOpen ? 'block' : 'hidden'} md:flex`}>
        <Link to="/" className="hover:text-gray-300 flex items-center py-2 md:py-0">
          <img src={homeIcon} alt="Home" className="h-5 mr-2" /> Home
        </Link>

        {categories.map((category) => (
          <Link
            key={category.label}
            to={`/${category.label.toLowerCase()}`}
            onClick={() => onCategorySelect(category.label)}
            className="hover:text-gray-300 flex items-center py-2 md:py-0"
          >
            <img src={category.icon} alt={category.label} className="h-5 mr-2" />
            {category.label}
          </Link>
        ))}

        <Link to="/about" className="hover:text-gray-300 flex items-center py-2 md:py-0">
          <img src={aboutIcon} alt="About" className="h-5 mr-2" /> About
        </Link>
        <Link to="/contact" className="hover:text-gray-300 flex items-center py-2 md:py-0">
          <img src={contactIcon} alt="Contact" className="h-5 mr-2" /> Contact
        </Link>
      </nav>

      {/* Search bar + Auth buttons */}
      <div className="mt-4 md:mt-0 flex flex-col md:flex-row md:items-center md:space-x-3 w-full md:w-auto">
        
        {/* Search bar */}
        <div className="w-full md:w-48 lg:w-56 mb-2 md:mb-0">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* Auth buttons */}
        {user ? (
          <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 w-full md:w-auto">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full md:w-auto"
              onClick={() => navigate(user.role === 'admin' ? '/admin' : '/dashboard')}
            >
              Dashboard
            </button>
            <button
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full md:w-auto"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col md:flex-row md:space-x-2 space-y-2 md:space-y-0 w-full md:w-auto">
            <Link
              to="/login"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full md:w-auto"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 w-full md:w-auto"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
