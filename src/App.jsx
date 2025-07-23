import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router";

// Auth Page
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";

// Admin Pages
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import UserDetails from "./pages/UserDetails";
import AppointmentDetails from "./pages/AppointmentDetails";
import Appointments from "./pages/Appointments";
import LabRequests from "./pages/LabRequests";
import LabRequestDetails from "./pages/LabRequestDetails";
import Posts from "./pages/Posts";
import PostDetails from "./pages/PostDetails";
import Reports from "./pages/Reports";

// Admin Layout
import AdminLayout from "./layouts/AdminLayout";

// Error Page
import NotFound from "./components/NotFound";
import Providers from "./pages/Providers";
import ProviderDetails from "./pages/ProviderDetails";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
  {
    path: "/",
    element: <AdminLayout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "users", element: <Users /> },
      { path: "users/:id", element: <UserDetails /> },
      { path: "providers", element: <Providers /> },
      { path: "providers/:id", element: <ProviderDetails /> },
      { path: "appointments", element: <Appointments /> },
      { path: "appointments/:id", element: <AppointmentDetails /> },
      { path: "lab-requests", element: <LabRequests /> },
      { path: "lab-requests/:id", element: <LabRequestDetails /> },
      { path: "posts", element: <Posts /> },
      { path: "posts/:id", element: <PostDetails /> },
      { path: "reports", element: <Reports /> },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
