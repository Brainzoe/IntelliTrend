// // src/components/CardList.tsx
// import React from 'react';

// interface Item {
//   title: string;
//   description: string;
//   imageUrl: string;
// }

// interface CardListProps {
//   items: Item[];
// }

// const CardList: React.FC<CardListProps> = ({ items }) => (
//   <div>
//     {items.map((item, index) => (
//       <div key={index}>
//         <h3>{item.title}</h3>
//         <p>{item.description}</p>
//         <img src={item.imageUrl} alt={item.title} />
//       </div>
//     ))}
//   </div>
// );

// export default CardList;


// src/components/CardList.tsx
import React from 'react';

interface Item {
  title: string;
  description: string;
  imageUrl: string;
}

interface CardListProps {
  items: Item[];
}

const CardList: React.FC<CardListProps> = ({ items }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {items.map((item, index) => (
      <div key={index} className="bg-white shadow-lg rounded-lg overflow-hidden transform transition hover:scale-105">
        <img src={item.imageUrl} alt={item.title} className="h-48 w-full object-cover" />
        <div className="p-4">
          <h3 className="text-lg font-semibold">{item.title}</h3>
          <p className="text-gray-600">{item.description}</p>
        </div>
      </div>
    ))}
  </div>
);

export default CardList;
