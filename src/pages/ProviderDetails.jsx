import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import { useParams, useNavigate } from "react-router";
import Modal from "../components/Modal";
import dayjs from "dayjs";

const ServiceProviderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [provider, setProvider] = useState(null);
  const [statusInput, setStatusInput] = useState("");
  const [noteInput, setNoteInput] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const res = await axios.get(`/admin/providers/${id}`);
        setProvider(res.data.provider);
      } catch (err) {
        console.error("Fetch error", err);
      }
    };
    fetchProvider();
  }, [id]);

  const handleDelete = async () => {
    try {
      await axios.delete(`/admin/providers/${id}`);
      navigate("/providers");
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleStatusUpdate = async () => {
    try {
      await axios.put(`/admin/providers/${id}/status`, {
        status: statusInput,
        message: noteInput,
      });
      window.location.reload();
    } catch (err) {
      console.error("Status update failed", err);
    }
  };

  if (!provider) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-primary-body">
          Provider Profile
        </h2>
        <button
          onClick={() => setShowDeleteModal(true)}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Delete Provider
        </button>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-lg shadow-md p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="flex flex-col items-center">
          <img
            src={provider.profilePhoto?.url}
            alt={provider.fullName}
            className="w-32 h-32 rounded-full object-cover shadow mb-3"
          />
          <h3 className="text-lg font-bold text-main-font">
            {provider.fullName}
          </h3>
          <p className="text-sm text-gray-500">{provider.specialization}</p>
        </div>

        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Info label="Email" value={provider.email} />
          <Info label="Phone" value={provider.phoneNumber} />
          <Info label="Gender" value={provider.gender} />
          <Info
            label="DOB"
            value={dayjs(provider.dateOfBirth).format("YYYY-MM-DD")}
          />
          <Info label="Address" value={provider.address} />
          <Info
            label="Experience"
            value={`${provider.experienceYears} years`}
          />
          <Info label="Status" value={provider.status} />
          <Info label="Rating" value={provider.rating} />
        </div>
      </div>

      {/* Consultation Modes */}
      <Section title="Consultation Modes">
        <div className="flex gap-4">
          {Object.entries(provider.consultationModes).map(
            ([mode, available]) => (
              <span
                key={mode}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  available
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-500"
                }`}
              >
                {mode.toUpperCase()}
              </span>
            )
          )}
        </div>
      </Section>

      {/* Availability */}
      <Section title="Availability">
        {provider.availability?.length === 0 ? (
          <p className="text-gray-500 text-sm">No availability set</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {provider.availability.map((day) => (
              <div
                key={day._id}
                className="p-3 border border-gray-200 rounded shadow-sm bg-gray-50"
              >
                <h4 className="font-semibold text-main-font">{day.day}</h4>
                <ul className="mt-1 text-sm text-gray-700 list-disc pl-5">
                  {day.timeSlots.map((slot, i) => (
                    <li key={i}>{slot}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Notes */}
      <Section title="Account Notes">
        {!provider.note?.message ? (
          <p className="text-sm text-gray-500">No notes available.</p>
        ) : (
          <div className="text-sm text-gray-700 border-l-4 pl-3 border-main-color">
            {provider.note.message}
            <span className="text-xs text-gray-500 block mt-1">
              {dayjs(provider.note.date).format("DD MMM YYYY")}
            </span>
          </div>
        )}
      </Section>

      {/* Lab Tests */}
      <Section title="Lab Tests Offered">
        {provider.labTestsOffered?.length === 0 ? (
          <p className="text-sm text-gray-500">No lab tests listed.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {provider.labTestsOffered.map((test, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm"
              >
                {test}
              </span>
            ))}
          </div>
        )}
      </Section>

      {/* Certifications */}
      <Section title="Certifications">
        {provider.certifications?.length === 0 ? (
          <p className="text-sm text-gray-500">No certifications uploaded.</p>
        ) : (
          <ul className="space-y-2">
            {provider.certifications.map((cert) => (
              <li key={cert._id} className="text-sm text-gray-700">
                <a
                  href={cert.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline text-sm break-all"
                >
                  View Certificate
                </a>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* Status Update Form */}
      <Section title="Update Provider Status">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Status</label>
            <select
              value={statusInput}
              onChange={(e) => setStatusInput(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">Select Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="banned">Banned</option>
            </select>
          </div>

          <div>
            <label className="block text-sm mb-1">Note</label>
            <textarea
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
              placeholder="Reason for status change"
              rows={3}
            ></textarea>
          </div>
        </div>

        <button
          onClick={() => setShowStatusModal(true)}
          disabled={!statusInput || !noteInput}
          className="mt-4 bg-main-body text-white px-4 py-2 rounded hover:bg-opacity-90 disabled:opacity-60"
        >
          Confirm Status Change
        </button>
      </Section>

      {/* Modals */}
      {showDeleteModal && (
        <Modal
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDelete}
          message={`Are you sure you want to delete ${provider.fullName}? This action cannot be undone.`}
        />
      )}
      {showStatusModal && (
        <Modal
          onClose={() => setShowStatusModal(false)}
          onConfirm={handleStatusUpdate}
          message={`Confirm status change to "${statusInput}"?`}
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

const Section = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h4 className="text-lg font-semibold text-main-font mb-4">{title}</h4>
    {children}
  </div>
);

export default ServiceProviderDetails;
