"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { buttonVariants } from "@/components/custom/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Define the type for individual nav items
interface NavItem {
  href: string;
  title: string;
  icon: JSX.Element;
}

// Define the props for the SidebarNav component
interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: NavItem[];
}

// SidebarNav component for rendering navigation links
export default function SidebarNav({
  className,
  items,
  ...props
}: SidebarNavProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [val, setVal] = useState<string>(pathname ?? "/settings");

  // Handle selection change in the dropdown
  const handleSelect = (e: string) => {
    setVal(e);
    router.push(e);
  };

  return (
    <>
      {/* Dropdown for mobile view */}
      <div className="p-1 md:hidden">
        <Select value={val} onValueChange={handleSelect}>
          <SelectTrigger className="h-12 sm:w-48">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent>
            {items.map((item) => (
              <SelectItem key={item.href} value={item.href}>
                <div className="flex gap-x-4 px-2 py-1">
                  <span className="scale-125">{item.icon}</span>
                  <span className="text-md">{item.title}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Sidebar navigation for desktop view */}
      <div className="hidden w-full overflow-x-auto bg-background px-1 py-2 md:block">
        <nav
          className={cn(
            "flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1",
            className
          )}
          {...props}
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                pathname === item.href
                  ? "bg-muted hover:bg-muted"
                  : "hover:bg-transparent hover:underline",
                "justify-start"
              )}
            >
              <span className="mr-2">{item.icon}</span>
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
