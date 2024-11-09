import React, { useState } from 'react';

interface Comment {
  name: string;
  message: string;
}

const Comments: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name.trim() && message.trim()) {
      setComments([...comments, { name, message }]);
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
                {comment.name.charAt(0).toUpperCase()} {/* Display first letter of the name */}
              </div>
              <div>
                <strong className="text-gray-700">{comment.name}</strong>
                <span className="text-gray-500 text-sm ml-2">just now</span> {/* Placeholder for time */}
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