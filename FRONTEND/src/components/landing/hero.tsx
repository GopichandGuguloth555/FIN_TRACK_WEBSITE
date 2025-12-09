import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#F5F1FF] py-28">

      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8E0FF] via-[#F4EFFF] to-[#E3D9FF] opacity-80"></div>

      {/* Decorative blur blobs */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-[#C9B6FF] rounded-full blur-[130px] opacity-30"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#B9A3FF] rounded-full blur-[150px] opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center gap-16">

        {/* LEFT CONTENT */}
        <div className="flex-1 text-center lg:text-left">
          
          <h1 className="text-5xl md:text-6xl font-bold text-[#3B2D73] leading-tight">
            Take Control of Your <span className="text-[#5B46A5]">Financial Future</span>
          </h1>

          <p className="mt-4 text-lg text-[#5E5873] max-w-xl">
            Intelligent tools to track expenses, manage budgets, and gain powerful insights 
            into your financial habits — all in one dashboard.
          </p>

          <Link to="/signup">
            <Button
              className="
                mt-8 px-10 h-12 text-lg rounded-xl font-medium
                bg-[#4E3B84] hover:bg-[#3C2C6A] text-white
                shadow-[0_8px_25px_rgba(78,59,132,0.35)]
              "
            >
              Get Started
            </Button>
          </Link>

        </div>

        {/* RIGHT IMAGE */}
        <div className="flex-1 flex justify-center">
          <img
            src="/src/assets/image.png"
            alt="Financial dashboard illustration"
            className="w-[420px] lg:w-[500px] drop-shadow-xl rounded-xl"
          />
        </div>

      </div>
    </section>
  );
}
