import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppLayout from "../src/components/applayout";

import LoginPage from "../src/pages/login";
import SignupPage from "../src/pages/signup";
import ForgotPasswordPage from "../src/pages/forgetPassword";

import LandingPage from "../src/pages/landing";

import DashboardPage from "../src/pages/dashboard";
import TransactionsPage from "../src/pages/transaction";
import BudgetsPage from "../src/pages/budjet";
import AnalyticsPage from "../src/pages/analytics";
import ProfilePage from "../src/pages/profile";
import CsvPage from "../src/pages/csv";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* App Layout (Now fully public, no protection) */}
        <Route path="/" element={<AppLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="transactions" element={<TransactionsPage />} />
          <Route path="budgets" element={<BudgetsPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="csv" element={<CsvPage />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}
