import { useState } from "react";
import logo from "/logo.png";
import {Link} from "react-router-dom";

const Input = ({
  placeholder,
  type = "text",
}: {
  placeholder: string;
  type?: string;
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-full h-12 px-4
        rounded-md
        bg-[#0f1418]
        border border-[#262b30]
        text-sm text-[#c9d1d9]
        placeholder:text-[#6e7681]
        outline-none
        focus:border-[#8b949e]
        transition
      "
    />
  );
};

const socialIcons = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4zm9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3"
        />
      </svg>
    ),
    href: "#",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M6.94 5a2 2 0 1 1-4-.002a2 2 0 0 1 4 .002M7 8.48H3V21h4zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91z"
        />
      </svg>
    ),
    href: "#",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396z"
        />
      </svg>
    ),
    href: "#",
  },
];

const Page = () => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);

  return (
    <div className=" min-h-screen w-full flex items-center justify-center bg-[#0b0f12]">
      <div className=" w-full max-w-5xl h-[560px] flex overflow-hidden rounded-xl bg-[#0f1418] shadow-2xl">

        {/* LEFT */}
        <div
          className="relative w-full lg:w-1/2 h-full flex items-center justify-center px-12"
          onMouseMove={(e) => {
            const r = e.currentTarget.getBoundingClientRect();
            setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          {/* WHITE HOVER GLOW */}
          <div
            className={`absolute pointer-events-none transition-opacity duration-300 ${
              hover ? "opacity-100" : "opacity-0"
            }`}
            style={{inset: "-150px",
              background: `radial-gradient(
                400px circle at ${pos.x}px ${pos.y}px,
                #fbfafa24,
                rgba(255,255,255,0.08),
                transparent 65%
              )`,
            }}
          />

          <form
            className="relative z-10 w-full max-w-sm flex flex-col gap-5 text-center"
            onSubmit={(e) => e.preventDefault()}
          >
            <h1 className="text-4xl font-semibold text-white">
              Sign Up
            </h1>

            {/* SOCIAL ICONS */}
            <div className="flex justify-center gap-4">
              {socialIcons.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="
                    group
                    w-11 h-11
                    rounded-full
                    flex items-center justify-center
                    bg-white
                    border border-[#262b30]
                    text-black
                    transition-all duration-300
                    hover:bg-[#2a2f33]
                    hover:border-white
                  "
                >
                  <span className="group-hover:text-white transition-colors duration-300">
                    {social.icon}
                  </span>
                </a>
              ))}
            </div>

            <span className="text-xl text-white">
              or Create  your account
            </span>
             <Input placeholder="Eneter Your Name " type="userName" />
            <Input placeholder="Email" type="email" />
            <Input placeholder="Password" type="password" />

            <a className="text-xs text-[#8b949e] hover:text-white transition">
              Forgot your password?
            </a>

            <button
              className="
                mt-2 h-11 rounded-md
                bg-[#21262d]
                text-sm text-white
                hover:bg-[#30363d]
                transition
              "
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* RIGHT */}
        <div className="hidden lg:block w-1/2 h-full relative">
          <img
            src={logo}
            alt="Fintrack"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>
    </div>
  );
};

export default Page;
