import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "../../services/axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await axios.post("/admin/register", formData);

      if (res.data.success) {
        setSuccess("Account created successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError("Registration failed.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-body font-primary">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-primary-body">
          Admin Sign Up
        </h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 text-green-700 p-2 rounded mb-4 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-main-font mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              required
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-main-body"
            />
          </div>

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
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-main-body"
            />
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-main-font mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              required
              value={formData.phoneNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-main-body"
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
              className="w-full px-4 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-main-body"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-main-body text-white py-2 rounded hover:bg-primary-body transition"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
