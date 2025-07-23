import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import dayjs from "dayjs";
import axios from "../services/axios";
import Modal from "../components/Modal";

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  const [statusUpdate, setStatusUpdate] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  // Fetch appointment details
  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const { data } = await axios.get(`/admin/appointments/${id}`);
        setAppointment(data.appointment);
        setStatusUpdate(data.appointment.status);
      } catch (err) {
        setFetchError("Failed to load appointment details.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointment();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/admin/appointments/${id}`);
      navigate("/admin/appointments");
    } catch (err) {
      console.error("Error deleting appointment", err);
    }
  };

  const handleStatusChange = async () => {
    try {
      await axios.patch(`/admin/appointments/${id}/status`, {
        status: statusUpdate,
      });
      setAppointment((prev) => ({ ...prev, status: statusUpdate }));
      setShowStatusModal(false);
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  if (loading) return <p>Loading appointment...</p>;
  if (fetchError) return <p className="text-red-500">{fetchError}</p>;

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-main-font">
        Appointment Details
      </h2>

      <div className="grid gap-6">
        {/* Patient Info */}
        <div className="bg-white rounded-md shadow p-5">
          <h3 className="text-lg font-semibold text-main-font mb-4 border-b pb-2">
            Patient Information
          </h3>
          <div
            onClick={() => navigate(`/users/${appointment.user._id}`)}
            className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-3 rounded transition"
          >
            <img
              src={appointment.user.profilePhoto.url}
              alt={appointment.user.fullName}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-main-font">
                {appointment.user.fullName}
              </p>
              <p className="text-sm text-gray-600">{appointment.user.email}</p>
              <p className="text-sm text-gray-600">
                {appointment.user.phoneNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Service Provider */}
        <div className="bg-white rounded-md shadow p-5">
          <h3 className="text-lg font-semibold text-main-font mb-4 border-b pb-2">
            Service Provider
          </h3>
          <div
            onClick={() =>
              navigate(`/providers/${appointment.serviceProvider._id}`)
            }
            className="flex items-center gap-4 cursor-pointer hover:bg-gray-50 p-3 rounded transition"
          >
            <img
              src={appointment.serviceProvider.profilePhoto.url}
              alt={appointment.serviceProvider.fullName}
              className="w-14 h-14 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-main-font">
                {appointment.serviceProvider.fullName}
              </p>
              <p className="text-sm text-gray-600">
                {appointment.serviceProvider.specialization}
              </p>
              <p className="text-sm text-gray-600">
                {appointment.serviceProvider.email}
              </p>
              <p className="text-sm text-gray-600">
                {appointment.serviceProvider.phoneNumber}
              </p>
            </div>
          </div>
        </div>

        {/* Appointment Info */}
        <div className="bg-white rounded-md shadow p-5">
          <h3 className="text-lg font-semibold text-main-font mb-4 border-b pb-2">
            Appointment Information
          </h3>
          <div className="grid md:grid-cols-2 gap-y-4 text-sm text-gray-700">
            <div>
              <span className="font-medium text-main-font">Date: </span>
              {dayjs(appointment.date).format("DD MMM YYYY")}
            </div>
            <div>
              <span className="font-medium text-main-font">Time Slot: </span>
              {appointment.timeSlot}
            </div>
            <div>
              <span className="font-medium text-main-font">Mode: </span>
              {appointment.mode}
            </div>
            <div>
              <span className="font-medium text-main-font">Status: </span>
              {appointment.status}
            </div>
            <div className="md:col-span-2">
              <span className="font-medium text-main-font">Notes: </span>
              {appointment.notes || "N/A"}
            </div>
            <div className="md:col-span-2 text-xs text-gray-400">
              Created:{" "}
              {dayjs(appointment.createdAt).format("DD MMM YYYY, hh:mm A")}
            </div>
          </div>
        </div>

        {/* Status Update */}
        <div className="bg-white rounded-md shadow p-5">
          <h3 className="text-lg font-semibold text-main-font mb-4 border-b pb-2">
            Update Appointment Status
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
              className="bg-main-color text-white px-4 py-2 rounded hover:bg-opacity-90 w-full sm:w-auto"
            >
              Confirm Change
            </button>
          </div>
        </div>

        {/* Delete Appointment */}
        <div className="bg-white rounded-md shadow p-5">
          <h3 className="text-lg font-semibold text-main-font mb-4 border-b pb-2">
            Danger Zone
          </h3>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="text-red-600 hover:underline text-sm"
          >
            Delete Appointment
          </button>
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <Modal
          message="Are you sure you want to delete this appointment?"
          onConfirm={handleDelete}
          onClose={() => setShowDeleteModal(false)}
        />
      )}

      {/* Status Change Modal */}
      {showStatusModal && (
        <Modal
          message={`Change appointment status to "${statusUpdate}"?`}
          onConfirm={handleStatusChange}
          onClose={() => setShowStatusModal(false)}
        />
      )}
    </div>
  );
};

export default AppointmentDetails;
