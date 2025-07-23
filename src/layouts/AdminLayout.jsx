import { Outlet, NavLink, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState(null);

  // On mount, check admin from localStorage
  useEffect(() => {
    const storedAdmin = localStorage.getItem("admin");
    if (storedAdmin) {
      setAdmin(JSON.parse(storedAdmin));
    } else {
      navigate("/login"); // if no admin info, redirect to login
    }

    if (window.location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [navigate]);

  const navItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Users", path: "/users" },
    { name: "Service Providers", path: "/providers" },
    { name: "Appointments", path: "/appointments" },
    { name: "Lab Requests", path: "/lab-requests" },
    { name: "Posts", path: "/posts" },
    { name: "Reports", path: "/reports" },
  ];

  return (
    <div className="flex h-screen bg-secondary-body/50 font-primary">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md p-4">
        <div className="text-2xl font-bold mb-8 text-primary-body">
          HealthLink Admin
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `block px-4 py-2 rounded hover:bg-main-body hover:text-white transition text-lg ${
                  isActive ? "bg-main-body text-white text-lg font-bold" : "text-main-font"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-semibold text-primary-body">Admin Panel</h1>
            {admin && (
              <p className="text-sm text-gray-600">Welcome, {admin.fullName}</p>
            )}
          </div>

          <div className="flex items-center gap-4">
            {admin && (
              <div className="text-sm text-gray-700">
                <p>{admin.email}</p>
                <p className="text-xs text-gray-500">{admin.phoneNumber}</p>
              </div>
            )}
            <button
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("admin");
                navigate("/login");
              }}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Routed Page Content */}
        <main className="p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
