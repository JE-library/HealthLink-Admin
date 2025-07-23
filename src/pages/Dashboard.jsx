import { useEffect, useState } from "react";
import axios from "../services/axios";
import CardStat from "../components/CardStat";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/admin/overview");
        console.log(res.data.dashboardStats);

        setStats(res.data.dashboardStats);
      } catch (error) {
        console.error("Failed to fetch overview stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading dashboard...</p>;
  if (!stats) return <p>No data available</p>;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-primary-body">Overview</h2>

      {/* USERS */}
      <section className="bg-tertiary-body p-4 rounded shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-main-font">Users</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <CardStat
            title="Total Users"
            value={stats?.users?.total || 0}
          />
        </div>
      </section>

      {/* PROVIDERS */}
      <section className="bg-tertiary-body p-4 rounded shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-main-font">
          Service Providers
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <CardStat
            title="Total Providers"
            value={stats?.providers?.total || 0}
          />
          <CardStat title="Approved" value={stats?.providers?.approved || 0} />
          <CardStat title="Pending" value={stats?.providers?.pending || 0} />
          <CardStat title="Rejected" value={stats?.providers?.rejected || 0} />
          <CardStat title="Banned" value={stats?.providers?.banned || 0} />
        </div>
      </section>

      {/* APPOINTMENTS */}
      <section className="bg-tertiary-body p-4 rounded shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-main-font">
          Appointments
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <CardStat title="Total" value={stats?.appointments?.total || 0} />
          <CardStat title="Pending" value={stats?.appointments?.pending || 0} />
          <CardStat
            title="Confirmed"
            value={stats?.appointments?.confirmed || 0}
          />
          <CardStat
            title="Completed"
            value={stats?.appointments?.completed || 0}
          />
          <CardStat
            title="Cancelled"
            value={stats?.appointments?.cancelled || 0}
          />
        </div>
      </section>

      {/* LAB REQUESTS */}
      <section className="bg-tertiary-body p-4 rounded shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-main-font">
          Lab Requests
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <CardStat title="Total" value={stats?.labRequests?.total || 0} />
          <CardStat title="Pending" value={stats?.labRequests?.pending || 0} />
          <CardStat
            title="Confirmed"
            value={stats?.labRequests?.confirmed || 0}
          />
          <CardStat
            title="Completed"
            value={stats?.labRequests?.completed || 0}
          />
          <CardStat
            title="Cancelled"
            value={stats?.labRequests?.cancelled || 0}
          />
        </div>
      </section>

      {/* POSTS */}
      <section className="bg-tertiary-body p-4 rounded shadow-xl">
        <h3 className="text-xl font-semibold mb-4 text-main-font">Posts</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <CardStat title="Total Posts" value={stats?.posts?.total || 0} />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
