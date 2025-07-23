import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "../services/axios";
import Modal from "../components/Modal";
import dayjs from "dayjs";

const UserDetails = () => {
  const { id } = useParams(); // expects route: /users/:id
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`/admin/users/${id}`);
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching user:", err);
      }
    };
    fetchUser();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/admin/users/${id}`);
      navigate("/users"); // redirect back after deletion
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  if (!user) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-primary-body">
          User Profile
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer"
        >
          Delete User
        </button>
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-wrap">
        {/* Profile photo and basic info */}
        <div className="md:col-span-1 flex flex-col items-center">
          <img
            src={user.profilePhoto?.url}
            alt={user.fullName}
            className="w-32 h-32 rounded-full object-cover shadow-md mb-4"
          />
          <h3 className="text-xl font-semibold text-main-font">
            {user.fullName}
          </h3>
          <p className="text-sm text-gray-500">{user.role}</p>
        </div>

        {/* Detailed info */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Info label="Email" value={user.email} />
          <Info label="Phone Number" value={user.phoneNumber} />
          <Info label="Gender" value={user.gender} />
          <Info
            label="Date of Birth"
            value={dayjs(user.dateOfBirth).format("YYYY-MM-DD")}
          />
          <Info label="Address" value={user.address} />
          <Info label="Role" value={user.role} />
          <Info
            label="Created At"
            value={dayjs(user.createdAt).format("YYYY-MM-DD HH:mm")}
          />
          <Info label="User ID" value={user._id} />
        </div>
      </div>

      {showModal && (
        <Modal
          message={`Are you sure you want to delete ${user.fullName}? This action cannot be undone.`}
          onClose={() => setShowModal(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

const Info = ({ label, value }) => (
  <div>
    <p className="text-sm text-gray-500">{label}</p>
    <p className="text-base font-medium text-main-font">{value || "—"}</p>
  </div>
);

export default UserDetails;
