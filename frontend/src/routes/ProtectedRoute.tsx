import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");

  if (!token) {
    // IMPORTANT: replace = true (prevents back navigation)
    return <Navigate to="/sessionExpired" replace />;
  }

  return <Outlet />;
}
