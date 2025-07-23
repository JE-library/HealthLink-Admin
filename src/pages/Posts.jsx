import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import dayjs from "dayjs";
import axios from "../services/axios";
import Modal from "../components/Modal";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/admin/posts");
        setPosts(res.data.posts);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`/admin/posts/${selectedPostId}`);
      setPosts((prev) => prev.filter((p) => p._id !== id));
      setShowModal(false);
    } catch (err) {
      console.error("Error deleting Post", err);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary-body">Posts</h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-sm bg-white rounded-lg shadow-md">
          <thead className="bg-black/10 text-gray-700">
            <tr>
              <th className="px-4 py-3">Title</th>
              <th className="px-4 py-3">Author</th>
              <th className="px-4 py-3">Tags</th>
              <th className="px-4 py-3">Categories</th>
              <th className="px-4 py-3">Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post._id}
                className="border-t hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/posts/${post._id}`)}
              >
                <td className="px-4 py-2 font-medium">{post.title}</td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <img
                    src={post.author.profilePhoto?.url}
                    alt={post.author.fullName}
                    className="w-8 h-8 rounded-full object-cover"
                    onClick={(e) => e.stopPropagation()}
                  />
                  <span>{post.author.fullName}</span>
                </td>
                <td className="px-4 py-2">
                  {post.tags?.length ? post.tags.join(", ") : "—"}
                </td>
                <td className="px-4 py-2 capitalize">
                  {post.categories?.length ? post.categories.join(", ") : "—"}
                </td>
                <td className="px-4 py-2 text-gray-500">
                  {dayjs(post.createdAt).format("YYYY-MM-DD")}
                </td>
                <td
                  className="px-4 py-2"
                  onClick={(e) => e.stopPropagation()} // prevent navigation
                >
                  <button
                    onClick={() => {
                      setSelectedPostId(post._id), setShowModal(true);
                    }}
                    className="bg-red-500 text-white px-3 py-1 text-xs rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
          title="Delete Provider"
          onConfirm={handleDelete}
          onClose={() => setShowModal(false)}
          message={"Are you sure you want to delete this provider?"}
        ></Modal>
      )}
    </div>
  );
};

export default Posts;
