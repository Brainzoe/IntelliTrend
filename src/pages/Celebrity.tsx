import React from 'react';

const Celebrity: React.FC = () => {
  const celebrityNews = [
    { title: 'Award Season', description: 'Highlights from this year’s awards...', imageUrl: '/images/awards.png' },
    { title: 'Celebrity Weddings', description: 'The most talked-about weddings...', imageUrl: '/images/weddings.webp' },
    // Add more celebrity news...
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Celebrity</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {celebrityNews.map((news, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-lg">
            <img src={news.imageUrl} alt={news.title} className="h-40 w-full object-cover rounded-lg" />
            <h2 className="text-lg font-semibold mt-2">{news.title}</h2>
            <p>{news.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Celebrity;
