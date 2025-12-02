import { BrowserRouter, Routes, Route } from "react-router-dom";
import Loginpage from "./pages/loginpage";
import Signuppage from "./pages/signuppage";
import Landingpage from "./pages/landing";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landingpage />}/>
        <Route path="/login" element={<Loginpage />} />
        <Route path="/signup" element={<Signuppage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
