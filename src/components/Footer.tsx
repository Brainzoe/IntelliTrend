// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 text-center">
      <div className="mb-2">
        <a href="#" className="text-blue-400 mx-2">Twitter</a>
        <a href="#" className="text-blue-400 mx-2">Facebook</a>
        <a href="#" className="text-blue-400 mx-2">Instagram</a>
      </div>
      <p>© 2024 IntelliTrend. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
