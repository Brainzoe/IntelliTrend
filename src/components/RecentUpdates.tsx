// src/components/RecentUpdates.tsx
import React from 'react';

interface Update {
  id: number;
  title: string;
  date: string;
}

interface RecentUpdatesProps {
  updates: Update[];
}

const RecentUpdates: React.FC<RecentUpdatesProps> = ({ updates }) => {
  return (
    <div className="bg-white p-4 shadow-md rounded-lg">
      <h2 className="text-xl font-bold mb-4">Recent Updates</h2>
      <ul>
        {updates.map(update => (
          <li key={update.id} className="border-b py-2">
            <a href="#" className="text-blue-600 hover:underline">{update.title}</a>
            <p className="text-gray-500 text-sm">{update.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentUpdates;
