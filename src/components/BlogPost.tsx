import React from 'react';
import { Link } from 'react-router-dom';
import Comments from './Comments';
import SocialShare from './SocialShare';
import Reactions from './Reactions';

interface BlogPostProps {
  title: string;
  content: string;
  author: string;
  date: string;
  id: number;
  category: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, content, author, date, id, category }) => {
  return (
    <article className="mb-8 border-b pb-4">
      <h2 className="text-2xl font-bold mb-2">
        <Link to={`/posts/${id}`} className="text-blue-600 hover:underline">{title}</Link>
      </h2>
      <p className="text-gray-600 mb-2">
        By {author} on {new Date(date).toLocaleDateString()}
      </p>
      <p>Category: {category}</p>
      <div className="prose mb-4" dangerouslySetInnerHTML={{ __html: content }} />

      {/* Render Reactions */}
      <Reactions postId={id} />

      {/* Render Comments */}
      <Comments postId={id.toString()} /> {/* Ensure id is passed as a string */}

      {/* Render Social Share */}
      <SocialShare />
    </article>
  );
};

export default BlogPost;
