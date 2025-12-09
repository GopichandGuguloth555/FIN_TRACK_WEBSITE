import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

export default function Header() {
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
      <div className="flex items-center gap-5 pb-5 pt-5 ">
        
        {/* User Avatar */}
        <div
          className="
            h-11 w-11 rounded-full 
            bg-[#4E3B84] text-white
            flex items-center justify-center
            shadow-[0_3px_8px_rgba(78,59,132,0.25)]
          "
        >
          <User className="h-5 w-5" />
        </div>

        {/* New Transaction Button */}
        <Button
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
      </div>
    </header>
  );
}
