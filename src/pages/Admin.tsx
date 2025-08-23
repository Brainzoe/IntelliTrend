import React, { useState, useMemo } from "react";
import { useBlog } from "../context/BlogContext";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Color from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import DOMPurify from "dompurify";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";  // ✅ import auth

const Admin: React.FC = () => {
  const { posts, addPost, updatePost, deletePost } = useBlog();
  const { user, logout } = useAuth(); // ✅ get user + logout
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

  // Quick dashboard stats
  const stats = useMemo(() => {
    return {
      totalPosts: posts.length,
      totalCategories: new Set(posts.map((p) => p.category).filter(Boolean)).size,
      totalAuthors: new Set(posts.map((p) => p.author).filter(Boolean)).size,
    };
  }, [posts]);

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
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <main className="flex-1 p-6">
        {/* ✅ User + Logout */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">Admin Dashboard</h2>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">
              Logged in as <strong>{user?.username}</strong>
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="p-6 bg-white shadow rounded-2xl">
            <p className="text-sm text-gray-500">Total Posts</p>
            <h2 className="text-2xl font-bold">{stats.totalPosts}</h2>
          </div>
          <div className="p-6 bg-white shadow rounded-2xl">
            <p className="text-sm text-gray-500">Categories</p>
            <h2 className="text-2xl font-bold">{stats.totalCategories}</h2>
          </div>
          <div className="p-6 bg-white shadow rounded-2xl">
            <p className="text-sm text-gray-500">Authors</p>
            <h2 className="text-2xl font-bold">{stats.totalAuthors}</h2>
          </div>
        </div>

        {/* Post Editor */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-8">
          <h3 className="text-xl font-semibold mb-4">
            {editId ? "Edit Post" : "Add New Post"}
          </h3>

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
              {[...new Set(posts.map((p) => p.category).filter(Boolean))].map(
                (cat) => (
                  <option key={cat} value={cat} />
                )
              )}
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

        {/* Posts Management */}
        <div className="bg-white shadow-lg rounded-2xl p-6">
          <h3 className="text-xl font-semibold mb-4">Manage Posts</h3>
          {posts.length === 0 ? (
            <p className="text-gray-500">No posts available.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {posts.map((p) => (
                <div
                  key={p._id}
                  className="border rounded-xl p-4 shadow-sm bg-gray-50 flex flex-col justify-between"
                >
                  <div>
                    <h4 className="text-lg font-semibold">{p.title}</h4>
                    <p className="text-gray-500 text-sm">By {p.author}</p>
                    <p className="text-gray-600 mt-2">{p.category}</p>
                    <div
                      className="mt-2 prose max-w-full"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(p.content),
                      }}
                    />
                  </div>
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => handleEdit(p)}
                      className="px-3 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deletePost(p._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
