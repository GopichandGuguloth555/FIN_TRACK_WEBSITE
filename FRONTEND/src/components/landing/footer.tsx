import { Instagram, Twitter, Facebook } from "lucide-react";

export default function LandingFooter() {
  return (
    <footer className="bg-[#F8F7FC] border-t mt-20 py-12">
      <div className="max-w-7xl mx-auto px-6">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-10">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-[#4E3B84]">FINTRACK</h2>
            <p className="text-gray-600 mt-3 text-sm leading-relaxed">
              Smart tools to manage expenses, track budgets, and stay financially healthy.
            </p>
          </div>

        

          {/* Company */}
          <div>
            <h3 className="font-semibold text-[#4E3B84] mb-3">Company</h3>
            <ul className="space-y-2 text-gray-600 text-sm">
              <li className="hover:text-[#4E3B84] cursor-pointer">About Us</li>
              <li className="hover:text-[#4E3B84] cursor-pointer">Contact</li>
            </ul>
          </div>

    

    
          {/* Copyright */}
          <p>© {new Date().getFullYear()} <b>FinTrack. All rights reserved.</b></p>
        </div>

      </div>
    </footer>
  );
}
