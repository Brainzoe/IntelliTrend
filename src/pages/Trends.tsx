import React from 'react';

const Trends: React.FC = () => {
  const trendingTopics = [
    { title: 'Fashion Trends', description: 'What’s trending in fashion...', imageUrl: '/images/fashion.jpg' },
    { title: 'Tech Trends', description: 'Latest trends in technology...', imageUrl: '/images/tech-trends.jpg' },
    // Add more trends...
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Trends</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {trendingTopics.map((trend, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-lg">
            <img src={trend.imageUrl} alt={trend.title} className="h-40 w-full object-cover rounded-lg" />
            <h2 className="text-lg font-semibold mt-2">{trend.title}</h2>
            <p>{trend.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Trends;
