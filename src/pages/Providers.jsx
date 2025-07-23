import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "../services/axios";
import Modal from "../components/Modal";

const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await axios.get("/admin/providers");
        setProviders(res.data.providers);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProviders();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`/admin/providers/${selectedId}`);
      setProviders(providers.filter((p) => p._id !== selectedId));
      setShowModal(false);
    } catch (err) {
      console.error("Failed to delete provider", err);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary-body">
        Service Providers
      </h2>

      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm text-left bg-white shadow-md rounded-lg min-w-[700px]">
          <thead className="bg-black/10 text-gray-700">
            <tr>
              <th className="px-4 py-3 whitespace-nowrap">Profile</th>
              <th className="px-4 py-3 whitespace-nowrap">Name</th>
              <th className="px-4 py-3 whitespace-nowrap">Email</th>
              <th className="px-4 py-3 whitespace-nowrap">Phone</th>
              <th className="px-4 py-3 whitespace-nowrap">Specialization</th>
              <th className="px-4 py-3 whitespace-nowrap">Experience</th>
              <th className="px-4 py-3 whitespace-nowrap">Status</th>
              <th className="px-4 py-3 whitespace-nowrap">Actions</th>
            </tr>
          </thead>
          <tbody>
            {providers.map((provider) => (
              <tr
                key={provider._id}
                className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/providers/${provider._id}`)}
              >
                <td className="px-4 py-2">
                  <img
                    src={provider.profilePhoto?.url}
                    alt="Provider"
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-4 py-2">{provider.fullName}</td>
                <td className="px-4 py-2">{provider.email}</td>
                <td className="px-4 py-2">{provider.phoneNumber}</td>
                <td className="px-4 py-2 capitalize">
                  {provider.specialization}
                </td>
                <td className="px-4 py-2">{provider.experienceYears} yrs</td>
                <td className="px-4 py-2 capitalize">{provider.status}</td>
                <td className="px-4 py-2" onClick={(e) => e.stopPropagation()}>
                  <button
                    onClick={() => {
                      setSelectedId(provider._id);
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

export default Providers;
