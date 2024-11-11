import React, { useState, useEffect } from 'react';

interface Comment {
  name: string;
  message: string;
  timestamp: number;
}

interface CommentsProps {
  postId: string; // Unique identifier for each post
}

const Comments: React.FC<CommentsProps> = ({ postId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  // Load comments for the specific post from local storage
  useEffect(() => {
    const savedComments = localStorage.getItem(`comments_${postId}`);
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, [postId]); // Runs when the component mounts or postId changes

  // Save comments for the specific post to local storage
  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem(`comments_${postId}`, JSON.stringify(comments));
    }
  }, [comments, postId]);

  const timeAgo = (timestamp: number) => {
    const now = new Date().getTime();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    if (diffInMinutes < 60) return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name.trim() && message.trim()) {
      const newComment = { name, message, timestamp: new Date().getTime() };
      setComments((prevComments) => [...prevComments, newComment]);
      setName('');
      setMessage('');
    }
  };

  return (
    <div className="mt-6 p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
      <h3 className="font-bold mb-4 text-2xl text-gray-800">Comments</h3>
      <form onSubmit={handleSubmit} className="mb-6">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your Name"
          required
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Comment"
          required
          className="border border-gray-300 rounded-lg p-3 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows={4}
        />
        <button type="submit" className="bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 transition duration-200">
          Submit
        </button>
      </form>
      <ul className="space-y-4">
        {comments.map((comment, index) => (
          <li key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center mb-2">
              <div className="w-10 h-10 rounded-full bg-blue-300 flex items-center justify-center text-white font-bold mr-3">
                {comment.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <strong className="text-gray-700">{comment.name}</strong>
                <span className="text-gray-500 text-sm ml-2">{timeAgo(comment.timestamp)}</span>
              </div>
            </div>
            <p className="text-gray-600">{comment.message}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
