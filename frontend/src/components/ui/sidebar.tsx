"use client";

import { cn } from "@/lib/utils";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { Link, useLocation } from "react-router-dom";

/* ===================== TYPES ===================== */

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

interface SidebarLinkProps {
  label: string;
  href: string;
  icon: React.ReactNode;
}

/* ===================== CONTEXT ===================== */

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(true); // 👈 DEFAULT OPEN

  return (
    <SidebarContext.Provider
      value={{
        open: openProp ?? openState,
        setOpen: setOpenProp ?? setOpenState,
        animate,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};

/* ===================== ROOT ===================== */

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <DesktopSidebar className={className}>{children}</DesktopSidebar>
      <MobileSidebar>{children}</MobileSidebar>
    </>
  );
};

/* ===================== DESKTOP ===================== */

const DesktopSidebar = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { open, setOpen } = useSidebar();

  return (
    <motion.aside
      className={cn(
        `
        hidden md:flex h-screen flex-col
        bg-neutral-900/70 backdrop-blur-xl
        border-r border-white/10
        `,
        className
      )}
      animate={{ width: open ? 240 : 80 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* ================= BRAND ================= */}
      <div className="relative px-4 pt-6 pb-8">
        {/* Glow */}
        <div className="absolute -top-2 left-4 h-16 w-16 rounded-full bg-emerald-500/25 blur-2xl" />

        <div
          className={cn(
            "relative flex items-center transition-all duration-300",
            open ? "gap-4" : "justify-center"
          )}
        >
          {/* LOGO */}
          <div
            className={cn(
              `
              rounded-xl
              bg-gradient-to-br from-emerald-400 to-emerald-600
              flex items-center justify-center
              shadow-lg shadow-emerald-500/40
              text-black font-extrabold
              transition-all duration-300
              `,
              open ? "h-14 w-14 text-2xl" : "h-12 w-12 text-xl"
            )}
          >
            ₣
          </div>

          {/* BRAND TEXT (ONLY WHEN OPEN) */}
          {open && (
            <div className="leading-tight animate-fade-in">
              <h1 className="text-base font-bold tracking-[0.25em] text-white">
                FIN<span className="text-emerald-400">TRACK</span>
              </h1>
              <p className="text-xs text-neutral-400 tracking-wide">
                Smart Finance Control
              </p>
            </div>
          )}
        </div>

        {/* Divider */}
        {open && (
          <div className="mt-6 h-px bg-gradient-to-r from-white/20 via-white/5 to-transparent" />
        )}
      </div>

      {/* ================= LINKS ================= */}
    <nav className="flex flex-col gap-4 px-3 py-4">
  {children}
</nav>

      {/* ================= FOOTER ================= */}
      <div className="mt-auto h-14 border-t border-white/10" />
    </motion.aside>
  );
};

/* ===================== MOBILE ===================== */

const MobileSidebar = ({ children }: { children: React.ReactNode }) => {
  const { open, setOpen } = useSidebar();

  return (
    <div className="md:hidden h-12 flex items-center px-4 bg-neutral-900 border-b border-white/10">
      <IconMenu2 className="text-white" onClick={() => setOpen(true)} />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-neutral-950 p-6"
          >
            <IconX
              className="absolute top-6 right-6 text-white"
              onClick={() => setOpen(false)}
            />
            <div className="mt-10 space-y-3">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

/* ===================== LINK ===================== */

export const SidebarLink = ({ link }: { link: SidebarLinkProps }) => {
  const { open } = useSidebar();
  const location = useLocation();
  const isActive = location.pathname === link.href;

  return (
    <Link to={link.href}>
      <motion.div
        whileHover={{ x: 6 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          `
          relative flex items-center gap-3
          px-4 py-6 rounded-xl
          text-sm font-medium transition
          `,
          isActive
            ? "bg-white/15 text-white"
            : "text-neutral-400 hover:text-white hover:bg-white/10",
          !open && "justify-center"
        )}
      >
        {/* ACTIVE BAR */}
        {isActive && (
          <span className="absolute left-0 h-5 w-[3px] rounded-full bg-emerald-400" />
        )}

        {/* ICON */}
        <span className="text-lg">{link.icon}</span>

        {/* LABEL */}
        {open && <span className="whitespace-nowrap">{link.label}</span>}
      </motion.div>
    </Link>
  );
};
