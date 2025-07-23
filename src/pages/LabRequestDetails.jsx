import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import Modal from "../components/Modal";
import axios from "../services/axios";

const LabRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [labRequest, setLabRequest] = useState(null);
  const [statusUpdate, setStatusUpdate] = useState("pending");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  useEffect(() => {
    const fetchLabRequest = async () => {
      try {
        const res = await axios.get(`/admin/lab-services/${id}`);
        setLabRequest(res.data.labRequest);
        setStatusUpdate(res.data.labRequest.status);
      } catch (err) {
        console.error("Failed to fetch lab request:", err);
      }
    };
    fetchLabRequest();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/admin/lab-services/${id}`);
      navigate("/labRequests"); // Redirect after delete
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const handleStatusChange = async () => {
    try {
      await axios.patch(`/admin/lab-services/${id}/status`, {
        status: statusUpdate,
      });
      setLabRequest((prev) => ({ ...prev, status: statusUpdate }));
      setShowStatusModal(false);
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  if (!labRequest) return <div>Loading...</div>;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-main-font">
        Lab Request Details
      </h2>

      <div className="grid gap-6">
        {/* Patient Info */}
        <div className="bg-white rounded-md shadow p-5">
          <h3 className="text-lg font-semibold text-main-font mb-4 border-b pb-2">
            Patient Information
          </h3>
          <div
            onClick={() => navigate(`/users/${labRequest.user._id}`)}
            className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-3 rounded transition"
          >
            <img
              src={labRequest.user.profilePhoto.url}
              alt={labRequest.user.fullName}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-main-font">
                {labRequest.user.fullName}
              </p>
              <p className="text-sm text-gray-600">{labRequest.user.email}</p>
              <p className="text-sm text-gray-600">
                {labRequest.user.phoneNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Provider Info */}
        <div className="bg-white rounded-md shadow p-5">
          <h3 className="text-lg font-semibold text-main-font mb-4 border-b pb-2">
            Lab Technician
          </h3>
          <div
            onClick={() =>
              navigate(`/providers/${labRequest.serviceProvider._id}`)
            }
            className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-3 rounded transition"
          >
            <img
              src={labRequest.serviceProvider.profilePhoto.url}
              alt={labRequest.serviceProvider.fullName}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-main-font">
                {labRequest.serviceProvider.fullName}
              </p>
              <p className="text-sm text-gray-600">
                {labRequest.serviceProvider.specialization}
              </p>
              <p className="text-sm text-gray-600">
                {labRequest.serviceProvider.email}
              </p>
              <p className="text-sm text-gray-600">
                {labRequest.serviceProvider.phoneNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Lab Request Info */}
        <div className="bg-white rounded-md shadow p-5">
          <h3 className="text-lg font-semibold text-main-font mb-4 border-b pb-2">
            Request Information
          </h3>
          <div className="grid md:grid-cols-2 gap-y-4 text-sm text-gray-700">
            <div>
              <span className="font-medium text-main-font">Date:</span>{" "}
              {dayjs(labRequest.date).format("DD MMM YYYY")}
            </div>
            <div>
              <span className="font-medium text-main-font">Time Slot:</span>{" "}
              {labRequest.timeSlot}
            </div>
            <div className="md:col-span-2">
              <span className="font-medium text-main-font">
                Tests Requested:
              </span>
              <ul className="list-disc ml-5 mt-1 space-y-1">
                {labRequest.tests.map((test, i) => (
                  <li key={i}>{test}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-medium text-main-font">Status:</span>{" "}
              {labRequest.status}
            </div>
            <div>
              <span className="font-medium text-main-font">Notes:</span>{" "}
              {labRequest.notes || "N/A"}
            </div>
            <div className="text-xs text-gray-400 md:col-span-2">
              Created:{" "}
              {dayjs(labRequest.createdAt).format("DD MMM YYYY, hh:mm A")}
            </div>
          </div>
        </div>

        {/* Status Update */}
        <div className="bg-white rounded-md shadow p-5">
          <h3 className="text-lg font-semibold text-main-font mb-4 border-b pb-2">
            Update Request Status
          </h3>
          <div className="flex flex-col sm:flex-row items-center gap-4 max-w-md">
            <select
              value={statusUpdate}
              onChange={(e) => setStatusUpdate(e.target.value)}
              className="border px-3 py-2 rounded w-full focus:outline-none"
            >
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="cancelled">Cancelled</option>
              <option value="completed">Completed</option>
            </select>
            <button
              onClick={() => setShowStatusModal(true)}
              className="bg-main-body text-nowrap text-white px-4 py-2 rounded hover:bg-opacity-90 w-full sm:w-auto"
            >
              Confirm Change
            </button>
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
            Delete Lab Request
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <Modal
          message="Are you sure you want to delete this lab request?"
          onConfirm={handleDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}

      {/* Status Change Modal */}
      {showStatusModal && (
        <Modal
          message={`Change lab request status to "${statusUpdate}"?`}
          onConfirm={handleStatusChange}
          onClose={() => setShowStatusModal(false)}
        />
      )}
    </div>
  );
};

export default LabRequestDetails;
