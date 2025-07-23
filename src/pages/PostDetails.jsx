import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "../services/axios";
import dayjs from "dayjs";
import Modal from "../components/Modal";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/admin/posts/${id}`);
        setPost(res.data.post);
      } catch (err) {
        console.error("Failed to fetch post:", err);
      }
    };

    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/admin/posts/${id}/delete`);
      navigate("/posts");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-main-font">Post Details</h2>

      <div className="grid gap-6">
        {/* Author Info */}
        <div className="bg-white rounded-md shadow p-5">
          <h3 className="text-lg font-semibold text-main-font mb-4 border-b pb-2">
            Author
          </h3>
          <div
            onClick={() => navigate(`/providers/${post.author._id}`)}
            className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-3 rounded transition"
          >
            <img
              src={post.author.profilePhoto.url}
              alt={post.author.fullName}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-main-font">
                {post.author.fullName}
              </p>
              <p className="text-sm text-gray-600">
                {post.author.specialization}
              </p>
              <p className="text-sm text-gray-600">{post.author.email}</p>
              <p className="text-sm text-gray-600">{post.author.phoneNumber}</p>
            </div>
          </div>
        </div>

        {/* Post Info */}
        <div className="bg-white rounded-md shadow p-5">
          <h3 className="text-lg font-semibold text-main-font mb-4 border-b pb-2">
            Post Information
          </h3>
          <div className="space-y-4 text-sm text-gray-700">
            <p>
              <span className="font-medium text-main-font">Title:</span>{" "}
              {post.title}
            </p>
            <p>
              <span className="font-medium text-main-font">Description:</span>{" "}
              {post.description}
            </p>

            {post.postImage?.url && (
              <div>
                <span className="font-medium text-main-font block mb-2">
                  Image:
                </span>
                <img
                  src={post.postImage.url}
                  alt="Post"
                  className="rounded max-w-full h-auto"
                />
              </div>
            )}

            <div>
              <span className="font-medium text-main-font">Categories:</span>
              <ul className="list-disc ml-6 mt-1 space-y-1">
                {post.categories.map((cat, i) => (
                  <li key={i}>{cat}</li>
                ))}
              </ul>
            </div>

            <div>
              <span className="font-medium text-main-font">Tags:</span>
              <ul className="flex flex-wrap gap-2 mt-1">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-xs px-3 py-1 rounded-full text-gray-700"
                  >
                    #{tag}
                  </span>
                ))}
              </ul>
            </div>

            <p className="text-xs text-gray-400">
              Created: {dayjs(post.createdAt).format("DD MMM YYYY, hh:mm A")}
            </p>
          </div>
        </div>

        {/* Delete Button */}
        <div className="bg-white rounded-md shadow p-5">
          <h3 className="text-lg font-semibold text-main-font mb-4 border-b pb-2">
            Danger Zone
          </h3>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="text-red-600 hover:underline text-sm"
          >
            Delete Post
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <Modal
          message="Are you sure you want to delete this post?"
          onConfirm={handleDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default PostDetails;
