import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./pages/login"
import Dashboard from "./pages/dashboard"
import Transactions from "./pages/transactions"
import Analytics from "./pages/analytics"

export default function App() {
  return (
    <BrowserRouter>
      <div className="p-6">
     
        <Routes>

          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/transactions" element={<Transactions/>} />
          <Route path="/analytics" element={<Analytics/>} />
          
        </Routes>
      </div>
    </BrowserRouter>
  )
}
