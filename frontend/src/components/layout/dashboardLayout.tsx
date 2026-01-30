import {Sidebar,SidebarBody,SidebarLink,} from '@/components/ui/sidebar'
import {
  IconHome,
  IconCreditCard,
  IconChartBar,
  IconSettings,
} from "@tabler/icons-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const links = [
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: <IconHome className="text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Transactions",
      href: "/transactions",
      icon: <IconCreditCard className="text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Analytics",
      href: "/analytics",
      icon: <IconChartBar className="text-neutral-700 dark:text-neutral-200" />,
    },
    {
      label: "Settings",
      href: "/settings",
      icon: <IconSettings className="text-neutral-700 dark:text-neutral-200" />,
    },
  ];

  return (
    <div className="flex h-screen w-full bg-neutral-950 text-white">
      <Sidebar>
        <SidebarBody className="justify-between">
          {/* Top */}
         
          <div className="flex flex-col gap-10 font-2xl ">
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
          </div>

          {/* Bottom */}
          <div className="text-sm text-neutral-400">
            FIN-TRACK
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main content */}
      <main className="flex-1 p-6 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
