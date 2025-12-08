import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";

import DashboardPage from "./pages/Dashboard";
import AnalyticsPage from "./pages/Analytics";
import WalletPage from "./pages/Wallet";
import AccountsPage from "./pages/Accounts";

export default function App() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/wallet" element={<WalletPage />} />
        <Route path="/accounts" element={<AccountsPage />} />
      </Routes>
    </DashboardLayout>
  );
}
