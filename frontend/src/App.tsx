import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./pages/login"
import Dashboard from "./pages/dashboard"

export default function App() {
  return (
    <BrowserRouter>
      <div className="p-6">
     
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard/>} />
          
        </Routes>
      </div>
    </BrowserRouter>
  )
}
