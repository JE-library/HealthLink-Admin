import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "../../services/axios";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post("/admin/login", formData);

      if (res.data.success) {
        const { token, ...adminData } = res.data.admin;
        localStorage.setItem("accessToken", token);
        localStorage.setItem("admin", JSON.stringify(adminData));
        navigate("/dashboard");
      } else {
        setError("Invalid login response");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-main-body font-primary">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-primary-body">Admin Login</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-main-font mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-body"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-main-font mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-body"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary-body text-white py-2 rounded transition cursor-pointer hover:bg-primary-body/50"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
