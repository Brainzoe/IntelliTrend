// src/pages/Admin.tsx
// src/pages/Admin.tsx
import React, { useState } from "react";
import { useBlog } from "../context/BlogContext";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import DOMPurify from "dompurify";

const Admin: React.FC = () => {
  const { posts, addPost, updatePost, deletePost } = useBlog();
  const [form, setForm] = useState({ title: "", author: "", category: "" });
  const [editId, setEditId] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Color.configure({ types: ["textStyle"] }),
      TextStyle,
      Link,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  });

  const handleSubmit = async () => {
    const contentHTML = editor?.getHTML() || "";
    const postData = { ...form, content: contentHTML };

    try {
      if (editId) {
        await updatePost(editId, postData);
        setEditId(null);
      } else {
        await addPost(postData);
      }

      setForm({ title: "", author: "", category: "" });
      editor?.commands.setContent("");
    } catch (err) {
      console.error(err);
      alert("Failed to save post");
    }
  };

  const handleEdit = (post: any) => {
    setEditId(post._id);
    setForm({ title: post.title, author: post.author, category: post.category });
    editor?.commands.setContent(post.content || "");
  };

  const addImage = () => {
    const url = prompt("Enter image URL");
    if (url) editor?.chain().focus().setImage({ src: url }).run();
  };

  const setLink = () => {
    const url = prompt("Enter link URL");
    if (url) editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>

        {/* Form Section */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">{editId ? "Edit Post" : "Add New Post"}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              placeholder="Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              placeholder="Author"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className="mb-4 relative">
            <input
              list="category-options"
              placeholder="Select or type category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <datalist id="category-options">
              {[...new Set(posts.map((p) => p.category).filter(Boolean))].map((cat) => (
                <option key={cat} value={cat} />
              ))}
            </datalist>
          </div>

          {/* Toolbar */}
          <div className="flex gap-2 flex-wrap mb-2">
            <button onClick={() => editor?.chain().focus().toggleBold().run()} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">B</button>
            <button onClick={() => editor?.chain().focus().toggleItalic().run()} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">I</button>
            <button onClick={() => editor?.chain().focus().toggleUnderline().run()} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">U</button>
            <button onClick={() => editor?.chain().focus().toggleBulletList().run()} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">• List</button>
            <button onClick={() => editor?.chain().focus().toggleOrderedList().run()} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">1. List</button>
            <button onClick={() => editor?.chain().focus().setTextAlign("left").run()} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Left</button>
            <button onClick={() => editor?.chain().focus().setTextAlign("center").run()} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Center</button>
            <button onClick={() => editor?.chain().focus().setTextAlign("right").run()} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Right</button>
            <button onClick={() => editor?.chain().focus().setTextAlign("justify").run()} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Justify</button>
            <button onClick={addImage} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Image</button>
            <button onClick={setLink} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">Link</button>
            <input type="color" onChange={(e) => editor?.chain().focus().setColor(e.target.value).run()} className="w-10 h-8 p-0 border rounded" title="Text Color" />
          </div>

          <EditorContent editor={editor} className="border p-3 rounded min-h-[200px] bg-white" />

          <button onClick={handleSubmit} className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200">
            {editId ? "Update Post" : "Add Post"}
          </button>
        </div>

        {/* Posts */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Manage Posts</h3>
          {posts.length === 0 ? (
            <p className="text-gray-500">No posts available.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((p) => (
                <div key={p._id} className="border rounded-xl p-4 shadow-sm bg-gray-50 flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-semibold">{p.title}</h4>
                    <p className="text-gray-500 text-sm">By {p.author}</p>
                    <p className="text-gray-600 mt-2">{p.category}</p>
                    <div className="mt-2 prose max-w-full" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(p.content) }} />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button onClick={() => handleEdit(p)} className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500">Edit</button>
                    <button onClick={() => deletePost(p._id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;









// // src/pages/Admin.tsx
// import React, { useState } from "react";
// import { useBlog } from "../context/BlogContext";

// const Admin: React.FC = () => {
//   const { posts, addPost, deletePost, updatePost } = useBlog();
//   const [form, setForm] = useState({ title: "", content: "", author: "", category: "" });
//   const [editId, setEditId] = useState<number | null>(null);

//   const handleSubmit = () => {
//     if (editId) {
//       updatePost({ id: editId, ...form, date: new Date().toLocaleDateString() });
//       setEditId(null);
//     } else {
//       const newPost = {
//         id: Date.now(),
//         ...form,
//         date: new Date().toLocaleDateString(),
//       };
//       addPost(newPost);
//     }
//     setForm({ title: "", content: "", author: "", category: "" });
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-6">
//       <div className="max-w-6xl mx-auto">
//         <h2 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h2>

//         {/* Form Section */}
//         <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
//           <h3 className="text-xl font-semibold mb-4">
//             {editId ? "Edit Post" : "Add New Post"}
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <input
//               className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Title"
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//             />
//             <input
//               className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Author"
//               value={form.author}
//               onChange={(e) => setForm({ ...form, author: e.target.value })}
//             />
//             <input
//               className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
//               placeholder="Category"
//               value={form.category}
//               onChange={(e) => setForm({ ...form, category: e.target.value })}
//             />
//             <textarea
//               className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 md:col-span-2"
//               placeholder="Content"
//               rows={4}
//               value={form.content}
//               onChange={(e) => setForm({ ...form, content: e.target.value })}
//             />
//           </div>
//           <button
//             onClick={handleSubmit}
//             className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
//           >
//             {editId ? "Update Post" : "Add Post"}
//           </button>
//         </div>

//         {/* Posts Section */}
//         <div className="bg-white shadow-lg rounded-2xl p-6">
//           <h3 className="text-xl font-semibold mb-4">Manage Posts</h3>
//           {posts.length === 0 ? (
//             <p className="text-gray-500">No posts available. Add some!</p>
//           ) : (
//             <div className="grid md:grid-cols-2 gap-6">
//               {posts.map((p) => (
//                 <div
//                   key={p.id}
//                   className="border rounded-xl p-4 shadow-sm bg-gray-50 flex flex-col justify-between"
//                 >
//                   <div>
//                     <h4 className="text-lg font-bold text-gray-800">{p.title}</h4>
//                     <p className="text-sm text-gray-500 mb-2">
//                       by {p.author} | {p.category} | {p.date}
//                     </p>
//                     <p className="text-gray-700 text-sm">{p.content}</p>
//                   </div>
//                   <div className="mt-4 flex gap-2">
//                     <button
//                       onClick={() => {
//                         setForm({
//                           title: p.title,
//                           content: p.content,
//                           author: p.author,
//                           category: p.category,
//                         });
//                         setEditId(p.id);
//                       }}
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => deletePost(p.id)}
//                       className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm"
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Admin;






// import React, { useState, useEffect } from "react";
// import postsData from "../data/posts";

// interface Post {
//   id: number;
//   title: string;
//   content: string;
//   author: string;
//   date: string;
//   category: string;
// }

// const Admin: React.FC = () => {
//   const [posts, setPosts] = useState<Post[]>([]);
//   const [newPost, setNewPost] = useState({
//     title: "",
//     content: "",
//     author: "",
//     category: "",
//   });

//   // Load posts from localStorage or fallback to static posts.ts
//   useEffect(() => {
//     const storedPosts = localStorage.getItem("posts");
//     if (storedPosts) {
//       setPosts(JSON.parse(storedPosts));
//     } else {
//       setPosts(postsData); // fallback to your manual posts.ts data
//     }
//   }, []);

//   // Save posts to localStorage whenever they change
//   useEffect(() => {
//     localStorage.setItem("posts", JSON.stringify(posts));
//   }, [posts]);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     setNewPost({ ...newPost, [e.target.name]: e.target.value });
//   };

//   const handleAddPost = () => {
//     if (!newPost.title || !newPost.content || !newPost.author || !newPost.category) {
//       alert("All fields are required!");
//       return;
//     }

//     const newEntry: Post = {
//       id: posts.length ? posts[posts.length - 1].id + 1 : 1,
//       title: newPost.title,
//       content: newPost.content,
//       author: newPost.author,
//       date: new Date().toISOString().split("T")[0], // YYYY-MM-DD
//       category: newPost.category,
//     };

//     setPosts([...posts, newEntry]);
//     setNewPost({ title: "", content: "", author: "", category: "" });
//   };

//   const handleDeletePost = (id: number) => {
//     if (window.confirm("Are you sure you want to delete this post?")) {
//       setPosts(posts.filter((post) => post.id !== id));
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Admin Dashboard</h2>

//       {/* Create Post Form */}
//       <div className="mb-8 p-4 border rounded-lg shadow-sm bg-gray-50">
//         <h3 className="text-xl font-semibold mb-4">Create a New Post</h3>
//         <input
//           type="text"
//           name="title"
//           placeholder="Post Title"
//           value={newPost.title}
//           onChange={handleInputChange}
//           className="w-full mb-3 p-2 border rounded"
//         />
//         <textarea
//           name="content"
//           placeholder="Post Content (HTML allowed)"
//           value={newPost.content}
//           onChange={handleInputChange}
//           className="w-full mb-3 p-2 border rounded h-32"
//         />
//         <input
//           type="text"
//           name="author"
//           placeholder="Author"
//           value={newPost.author}
//           onChange={handleInputChange}
//           className="w-full mb-3 p-2 border rounded"
//         />
//         <input
//           type="text"
//           name="category"
//           placeholder="Category (e.g. Tech, Social Media)"
//           value={newPost.category}
//           onChange={handleInputChange}
//           className="w-full mb-3 p-2 border rounded"
//         />
//         <button
//           onClick={handleAddPost}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add Post
//         </button>
//       </div>

//       {/* Manage Posts */}
//       <h3 className="text-xl font-semibold mb-4">Manage Posts</h3>
//       <div className="space-y-4">
//         {posts.length > 0 ? (
//           posts.map((post) => (
//             <div
//               key={post.id}
//               className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center"
//             >
//               <div>
//                 <h4 className="font-bold">{post.title}</h4>
//                 <p className="text-sm text-gray-600">
//                   {post.author} | {post.date} | {post.category}
//                 </p>
//               </div>
//               <button
//                 onClick={() => handleDeletePost(post.id)}
//                 className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
//               >
//                 Delete
//               </button>
//             </div>
//           ))
//         ) : (
//           <p>No posts available.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Admin;
