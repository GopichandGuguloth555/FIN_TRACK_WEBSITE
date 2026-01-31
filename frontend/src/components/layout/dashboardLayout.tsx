import {
  Sidebar,
  SidebarBody,
  SidebarLink,
} from "@/components/ui/sidebar";
import {
  IconHome,
  IconCreditCard,
  IconChartBar,
  IconSettings,
  IconUpload,
} from "@tabler/icons-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = [
    { label: "Dashboard", href: "/dashboard", icon: <IconHome size={18} /> },
    { label: "Transactions", href: "/transactions", icon: <IconCreditCard size={18} /> },
    { label: "Analytics", href: "/analytics", icon: <IconChartBar size={18} /> },
    { label: "My Uploads", href: "/files", icon: <IconUpload size={18} /> },
    { label: "Profile", href: "/profile", icon: <IconSettings size={18} /> },
  ];

  return (
    <div className="flex h-screen w-full bg-neutral-950 text-white">
      <Sidebar>
        <SidebarBody className="px-3">
          {/* TOP BRAND */}
          <div className="mb-8 px-3 pt-4">
            <h1 className="text-sm font-semibold tracking-widest text-neutral-300">
            </h1>
      
          </div>
           
     
          {/* NAV LINKS */}
          <br />
          <div className="flex flex-col gap-1 ">
            {links.map((link) => (
              <SidebarLink key={link.href} link={link} />
            ))}
            <br />
          </div>
          <br />
        </SidebarBody>
      </Sidebar>

      {/* MAIN */}
      <main className="flex-1 overflow-y-auto p-8">
        {children}
      </main>
    </div>
  );
}
