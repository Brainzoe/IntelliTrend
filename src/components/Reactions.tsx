// src/components/Reactions.tsx
import React, { useState, useEffect } from 'react';

interface ReactionsProps {
  postId: number; // For unique identification
}

const Reactions: React.FC<ReactionsProps> = ({ postId }) => {
  // Initialize the reaction state from localStorage or default to null
  const [reaction, setReaction] = useState<string | null>(null);

  // Load the reaction from localStorage when the component mounts
  useEffect(() => {
    const savedReaction = localStorage.getItem(`reaction-${postId}`);
    if (savedReaction) {
      setReaction(savedReaction);
    }
  }, [postId]);

  const handleReaction = (reactionType: string) => {
    // Set the selected reaction in the state
    setReaction(reactionType);
    // Save the reaction to localStorage
    localStorage.setItem(`reaction-${postId}`, reactionType);
    console.log(`Post ${postId} reaction: ${reactionType}`);
  };

  return (
    <div className="flex space-x-4">
      <button
        onClick={() => handleReaction('like')}
        className={`px-4 py-2 border rounded-lg ${reaction === 'like' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
      >
        👍 Like
      </button>
      <button
        onClick={() => handleReaction('love')}
        className={`px-4 py-2 border rounded-lg ${reaction === 'love' ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
      >
        ❤️ Love
      </button>
      <button
        onClick={() => handleReaction('wow')}
        className={`px-4 py-2 border rounded-lg ${reaction === 'wow' ? 'bg-yellow-500 text-white' : 'bg-gray-200'}`}
      >
        😲 Wow
      </button>
      <button
        onClick={() => handleReaction('sad')}
        className={`px-4 py-2 border rounded-lg ${reaction === 'sad' ? 'bg-blue-300 text-white' : 'bg-gray-200'}`}
      >
        😢 Sad
      </button>
    </div>
  );
};

export default Reactions;
