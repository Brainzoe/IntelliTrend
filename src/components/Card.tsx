import React from 'react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transition transform duration-300">
      <img src={imageUrl} alt={title} className="h-48 w-full object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default Card;
