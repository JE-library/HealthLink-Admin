import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "../services/axios";
import Modal from "../components/Modal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get("/admin/users");
        setUsers(data.users);
      } catch (err) {
        console.error("Error fetching users", err);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`/users/${selectedUserId}`);
      setUsers((prev) => prev.filter((u) => u._id !== selectedUserId));
      setShowModal(false);
    } catch (err) {
      console.error("Error deleting user", err);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-semibold text-primary-body">Users</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border bg-white shadow-2xl rounded-xl overflow-hidden">
          <thead className="bg-black/10">
            <tr className="text-gray-700 text-g">
              <th className="px-4 py-3">Profile</th>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id}
                className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/users/${user._id}`)}
              >
                <td className="px-4 py-2">
                  <img
                    src={user.profilePhoto?.url}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-2">{user.fullName}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.phoneNumber}</td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td
                  className="px-4 py-2"
                  onClick={(e) => e.stopPropagation()} // prevent row navigation
                >
                  <button
                    onClick={() => {
                      setSelectedUserId(user._id);
                      setShowModal(true);
                    }}
                    className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <Modal
          onClose={() => setShowModal(false)}
          onConfirm={handleDelete}
          message="Are you sure you want to delete this user?"
        />
      )}
    </div>
  );
};

export default Users;
