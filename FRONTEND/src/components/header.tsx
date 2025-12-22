import { Button } from "@/components/ui/button";
import { User, LogOut, Settings } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);

  function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  return (
    <header
      className="
        w-full h-24 
        bg-violet-200
        border-b border-[#E6E2D8] border-2
        shadow-[0_4px_12px_rgba(0,0,0,0.06)]
        flex items-center justify-between
        px-10 pt-[10px]
        sticky top-0 z-30
      "
    >
      {/* Left Title */}
      <h1 className="text-[24px] font-semibold text-[#2F2D35] pb-5 pt-5 tracking-tight">
        <b>TRACK YOUR EXPENSES</b>
      </h1>

      {/* Right Section */}
      <div className="relative flex items-center gap-5 pb-5 pt-5">
        
        {/* Avatar Button */}
        <div
          onClick={() => setOpenMenu(!openMenu)}
          className="
            h-11 w-11 rounded-full 
            bg-[#4E3B84] text-white
            flex items-center justify-center
            shadow-[0_3px_8px_rgba(78,59,132,0.25)]
            cursor-pointer
            hover:scale-105 transition
          "
        >
          <User className="h-5 w-5" />
        </div>

        {/* Dropdown Menu */}
        {openMenu && (
          <div
            className="
              absolute right-0 top-16
              w-44 bg-white rounded-xl 
              shadow-lg border border-gray-200
              flex flex-col py-2
              animate-in slide-in-from-top-2
              z-40
            "
          >
            {/* Profile */}
            <button
              onClick={() => navigate("/profile")}
              className="
                flex items-center gap-3 px-4 py-2 
                text-sm text-gray-700 
                hover:bg-gray-100 transition
              "
            >
              <User className="h-4 w-4 text-purple-600" />
              Profile
            </button>

             

            {/* Logout */}
            <button
              onClick={logout}
              className="
                flex items-center gap-3 px-4 py-2 
                text-sm text-gray-700 
                hover:bg-gray-100 transition
              "
            >
              <LogOut className="h-4 w-4 text-red-500" />
              Logout
            </button>
          </div>
        )}

         <Link to='/transactions'><Button
          className="
            bg-[#4E3B84] hover:bg-[#3D2F6F]
            text-white text-[15px] font-medium
            px-6 py-2.5 rounded-lg
            shadow-[0_3px_10px_rgba(78,59,132,0.25)]
            transition-all
          "
        >
          New Transaction
        </Button>
        </Link>
      </div>
    </header>
  );
}
