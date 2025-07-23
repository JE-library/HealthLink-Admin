import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import dayjs from "dayjs";
import { useNavigate } from "react-router";

const LabRequests = () => {
  const [labRequests, setLabRequests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLabRequests = async () => {
      try {
        const res = await axios.get("/admin/lab-services");
        setLabRequests(res.data.LabRequests);
      } catch (error) {
        console.error("Error fetching lab requests:", error);
      }
    };

    fetchLabRequests();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary-body">Lab Requests</h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1000px] text-sm text-left bg-white rounded-lg shadow-md">
          <thead className="bg-black/10 text-gray-700">
            <tr>
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Provider</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time Slot</th>
              <th className="px-4 py-3">Tests</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {labRequests.map((req) => (
              <tr
                key={req._id}
                className="border-t hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => navigate(`/lab-requests/${req._id}`)}
              >
                <td className="px-4 py-2">{req.user?.fullName || "—"}</td>
                <td className="px-4 py-2">
                  {req.serviceProvider?.fullName || "—"}
                </td>
                <td className="px-4 py-2">
                  {dayjs(req.date).format("YYYY-MM-DD")}
                </td>
                <td className="px-4 py-2">{req.timeSlot}</td>
                <td className="px-4 py-2">
                  {req.tests?.length ? req.tests.join(", ") : "—"}
                </td>
                <td className="px-4 py-2 capitalize">{req.status}</td>
                <td className="px-4 py-2">{req.notes || "—"}</td>
                <td className="px-4 py-2 text-gray-500">
                  {dayjs(req.createdAt).format("YYYY-MM-DD HH:mm")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LabRequests;
