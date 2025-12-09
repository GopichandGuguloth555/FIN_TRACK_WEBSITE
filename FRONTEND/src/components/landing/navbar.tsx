import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function LandingNavbar() {
  return (
    <nav className="w-full bg-white shadow-[0_2px_10px_rgba(0,0,0,0.05)] fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* LEFT — LOGO */}
        <div className="flex items-center gap-2">
          <img
            src="/src/assets/FintrackLogo.png"
            alt="FinTrack Logo"
            className="h-20 w-30 "
          />
          <span className="text-xl font-semibold text-[#4E3B84]">
            FINTRACK
          </span>
        </div>

        {/* CENTER NAV MENU */}
        <ul className="hidden md:flex items-center gap-10 text-gray-700 font-medium">
          <li className="hover:text-[#4E3B84] cursor-pointer transition">Features</li>
          <li className="hover:text-[#4E3B84] cursor-pointer transition">About Us</li>
          <li className="hover:text-[#4E3B84] cursor-pointer transition">Contact</li>
        </ul>

        {/* RIGHT BUTTONS */}
        <div className="flex items-center gap-3">
          <Link to="/login">
            <Button
              variant="outline"
              className="
                border-[#4E3B84] text-[#4E3B84] hover:bg-[#4E3B84]/10
                px-6 rounded-lg
              "
            >
              Log In
            </Button>
          </Link>

          <Link to="/signup">
            <Button
              className="
                bg-[#4E3B84] hover:bg-[#3D2F6F]
                text-white px-6 rounded-lg shadow-md
              "
            >
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
