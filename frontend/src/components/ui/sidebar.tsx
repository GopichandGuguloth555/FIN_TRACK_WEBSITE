"use client";
import { cn } from "@/lib/utils";
import React, { useState, createContext, useContext } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";

interface Links {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = false,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);
  const open = openProp ?? openState;
  const setOpen = setOpenProp ?? setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

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

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();

  return (
    <motion.div
      className={cn(
        "hidden md:flex h-full px-4 py-4 flex-col w-[300px] shrink-0 bg-neutral-900/30 rounded-xl backdrop-blur-xl border-r border-white/10",
        className
      )}
      animate={{ width: animate ? (open ? "300px" : "64px") : "300px" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </motion.div>
  );
};

const MobileSidebar = ({ children }: React.ComponentProps<"div">) => {
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
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-neutral-950 p-6"
          >
            <IconX
              className="text-white absolute top-6 right-6"
              onClick={() => setOpen(false)}
            />
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};



export const SidebarLink = ({ link }: { link: any }) => {
  const { open, animate } = useSidebar();
  const isActive = window.location.pathname === link.href;

  return (
    <motion.a
      href={link.href}
      initial={false}
      whileHover={{
        scale: 1.1,
        x: 8,
      }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 16,
      }}
      className={`
        relative flex items-center gap-4
        py-3 px-3 rounded-xl
        text-[15px] font-medium
        transition-all duration-300
        ${
          isActive
            ? "bg-white/15 text-white shadow-[0_0_20px_rgba(255,255,255,0.15)]"
            : "text-neutral-400 hover:text-white hover:bg-white/10"
        }
      `}
    >
      {/* ACTIVE LEFT INDICATOR */}
      {isActive && (
        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-full bg-white" />
      )}

      {/* ICON */}
      <motion.div
        whileHover={{ scale: 1.15 }}
        transition={{ type: "spring", stiffness: 300 }}
        className={isActive ? "text-white" : "text-neutral-400"}
      >
        {link.icon}
      </motion.div>

      {/* LABEL */}
      <motion.span
        animate={{
          opacity: animate ? (open ? 1 : 0) : 1,
          display: animate ? (open ? "block" : "none") : "block",
        }}
        className="whitespace-nowrap"
      >
        {link.label}
      </motion.span>
    </motion.a>
  );
};


