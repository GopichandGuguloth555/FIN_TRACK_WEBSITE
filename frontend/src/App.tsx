import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landingpage";
import { Login } from "./pages/login";
import { Signup } from "./pages/singnup";
import Dashboard from "./pages/dashboard";
import Transactions from "./pages/transactions";
import Analytics from "./pages/analytics";
import ProfilePage from "./pages/profilepage";
import UploadedFiles from "./pages/uploadedFiles";
import SessionExpired from "./pages/sessionExpired";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthCallback from "./pages/authCallback";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/sessionExpired" element={<SessionExpired />} />

        <Route path="/auth/callback" element={<AuthCallback />} />

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/files" element={<UploadedFiles />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
