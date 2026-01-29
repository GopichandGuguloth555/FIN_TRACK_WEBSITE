import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Login } from "./pages/login"

export default function App() {
  return (
    <BrowserRouter>
      <div className="p-6">
     
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
