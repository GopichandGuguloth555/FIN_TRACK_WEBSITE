import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

import {
  BarChart3,
  ShieldCheck,
  Wallet,
} from "lucide-react";

export default function LandingPage() {
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F3EEFF] to-white text-gray-800">
   
    
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-3">
            <img
              src="/assets/FintrackLogo.png"
              alt="FINTRACK"
              className=" w-50 h-20 "
            />
          </div>

         

          <div className="flex gap-3">
            <Link to="/login" ><Button className=" w-40 h-16 " variant="outline">Log In</Button></Link>
            <Link to="/signup"><Button className=" w-40 h-16 bg-violet-900 hover:bg-violet-700">
              Get Started
              
            </Button></Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Take Control of <br />
            <span className="text-violet-900">
              Your Financial Future
            </span>
          </h1>

          <p className="mt-6 text-gray-600 max-w-lg text-lg">
            Intelligent tools to track expenses, manage budgets, and
            gain powerful insights into your financial habits — all in
            one dashboard.
          </p>

          <div className="mt-10">
            <Button className=" w-40 h-16 bg-violet-900 hover:bg-violet-700 px-8 py-6 text-lg">
             lets Go!
            </Button>
          </div>
        </div>


       
      </section>

   
      <section className="bg-[#FAF9FF] py-20">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900">
            Everything You Need for{" "}
            <span className="text-violet-900">
              Smart Money Management
            </span>
          </h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
            <Feature
              icon={<Wallet />}
              title="Smart Tracking"
              desc="Easily log and categorize expenses in real time."
            />

            <Feature
              icon={<ShieldCheck />}
              title="Top-Tier Security"
              desc="Your financial data stays encrypted and protected."
            />

            <Feature
              icon={<BarChart3 />}
              title="Financial Insights"
              desc="Visual reports help you understand spending patterns."
            />
          </div>
        </div>
      </section>

 
      <footer className="py-6 text-center text-xl font-bold pb-10 text-sm text-violet-900 ">
        © gopichandguguloth555@gmail.com  ==== to connect
      </footer>
    </div>
  );
}


function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition">
      <div className="h-12 w-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center mb-6">
        {icon}
      </div>

      <h3 className="text-xl font-semibold text-gray-900">
        {title}
      </h3>
      <p className="mt-3 text-gray-600">
        {desc}
      </p>
    </div>
  );
}
