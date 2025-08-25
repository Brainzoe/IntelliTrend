// src/pages/Admin.tsx
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
import { useAuth } from "../context/AuthContext";

const Admin: React.FC = () => {
  const { posts, addPost, updatePost, deletePost } = useBlog();
  const { user, logout } = useAuth();
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

  const stats = useMemo(
    () => ({
      totalPosts: posts.length,
      totalCategories: new Set(posts.map((p) => p.category).filter(Boolean)).size,
      totalAuthors: new Set(posts.map((p) => p.author).filter(Boolean)).size,
    }),
    [posts]
  );

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
    if (url)
      editor?.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="w-full md:w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <main className="flex-1 p-4 md:p-6">
        {/* User info + Logout */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Dashboard</h2>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-4">
            <span className="text-gray-600 text-sm md:text-base">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {[
            { label: "Total Posts", value: stats.totalPosts },
            { label: "Categories", value: stats.totalCategories },
            { label: "Authors", value: stats.totalAuthors },
          ].map((stat) => (
            <div key={stat.label} className="p-4 bg-white shadow rounded-2xl text-center">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <h2 className="text-2xl font-bold">{stat.value}</h2>
            </div>
          ))}
        </div>

        {/* Post Editor */}
        <div className="bg-white shadow-lg rounded-2xl p-4 md:p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4">{editId ? "Edit Post" : "Add New Post"}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-4">
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

          <input
            list="category-options"
            placeholder="Select or type category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="border rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          />
          <datalist id="category-options">
            {[...new Set(posts.map((p) => p.category).filter(Boolean))].map((cat) => (
              <option key={cat} value={cat} />
            ))}
          </datalist>

          {/* Toolbar */}
          <div className="flex flex-wrap gap-2 mb-2 overflow-x-auto">
            {["toggleBold", "toggleItalic", "toggleUnderline", "toggleBulletList", "toggleOrderedList"].map(
              (cmd, i) => (
                <button
                  key={i}
                  onClick={() => (editor as any)?.chain().focus()[cmd]().run()}
                  className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 whitespace-nowrap"
                >
                  {cmd.replace("toggle", "")}
                </button>
              )
            )}
            {["Left", "Center", "Right", "Justify"].map((align) => (
              <button
                key={align}
                onClick={() => editor?.chain().focus().setTextAlign(align.toLowerCase()).run()}
                className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 whitespace-nowrap"
              >
                {align}
              </button>
            ))}
            <button
              onClick={addImage}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 whitespace-nowrap"
            >
              Image
            </button>
            <button
              onClick={setLink}
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 whitespace-nowrap"
            >
              Link
            </button>
            <input
              type="color"
              onChange={(e) => editor?.chain().focus().setColor(e.target.value).run()}
              className="w-10 h-8 p-0 border rounded"
              title="Text Color"
            />
          </div>

          <EditorContent editor={editor} className="border p-3 rounded min-h-[200px] bg-white mb-4" />
          <button
            onClick={handleSubmit}
            className="w-full md:w-auto mt-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
          >
            {editId ? "Update Post" : "Add Post"}
          </button>
        </div>

        {/* Posts Management */}
        <div className="bg-white shadow-lg rounded-2xl p-4 md:p-6">
          <h3 className="text-xl font-semibold mb-4">Manage Posts</h3>
          {posts.length === 0 ? (
            <p className="text-gray-500">No posts available.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                      className="mt-2 prose max-w-full overflow-x-auto"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(p.content) }}
                    />
                  </div>
                  <div className="mt-4 flex gap-2 flex-wrap">
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
