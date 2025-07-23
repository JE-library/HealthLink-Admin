import React, { useEffect, useState } from "react";
import axios from "../services/axios";
import { useNavigate } from "react-router";
import dayjs from "dayjs";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await axios.get("/admin/appointments");
        setAppointments(res.data.appointments);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-primary-body">Appointments</h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-sm text-left bg-white rounded-lg shadow-md">
          <thead className="bg-black/10 text-gray-700">
            <tr >
              <th className="px-4 py-3">User</th>
              <th className="px-4 py-3">Provider</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time Slot</th>
              <th className="px-4 py-3">Mode</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Notes</th>
              <th className="px-4 py-3">Created</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr
                key={appt._id}
                className="border-t hover:bg-gray-50 cursor-pointer"
                onClick={() => navigate(`/appointments/${appt._id}`)} 
              >
                <td className="px-4 py-2">{appt.user?.fullName || "—"}</td>
                <td className="px-4 py-2">
                  {appt.serviceProvider?.fullName || "—"}
                </td>
                <td className="px-4 py-2">
                  {dayjs(appt.date).format("YYYY-MM-DD")}
                </td>
                <td className="px-4 py-2">{appt.timeSlot}</td>
                <td className="px-4 py-2 capitalize">{appt.mode}</td>
                <td className="px-4 py-2 capitalize">{appt.status}</td>
                <td className="px-4 py-2">{appt.notes || "—"}</td>
                <td className="px-4 py-2 text-gray-500">
                  {dayjs(appt.createdAt).format("YYYY-MM-DD HH:mm")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointments;
