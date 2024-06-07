"use client";
import Sidebar from "@/components/sidebar";
import useIsCollapsed from "@/hooks/use-is-collapsed";
import { sidelinks } from "@/data/sidelinks_for_users";
export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isCollapsed, setIsCollapsed] = useIsCollapsed();
  return (
    <div className="relative h-full overflow-hidden bg-background">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        sidelinks={sidelinks}
      />
      <div
        className={`overflow-x-hidden pt-16 transition-[margin] md:overflow-y-hidden md:pt-0 ${
          isCollapsed ? "md:ml-14" : "md:ml-64"
        } h-full`}
      >
        {children}
      </div>
    </div>
  );
}
