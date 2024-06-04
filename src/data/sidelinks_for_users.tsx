import {
  IconLayoutDashboard,
  IconSettings,
  IconUsers,
  IconChecklist,
} from "@tabler/icons-react";

export interface NavLink {
  title: string;
  label?: string;
  href: string;
  icon: JSX.Element;
}

export interface SideLink extends NavLink {
  sub?: NavLink[];
}

export const sidelinks: SideLink[] = [
  {
    title: "Dashboard",
    label: "",
    href: "/dashboard/user",
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: "Find Specialist",
    label: "",
    href: "/dashboard/user/find-specialist",
    icon: <IconUsers size={18} />,
  },
  {
    title: "My Bookings",
    label: "",
    href: "/dashboard/user/my-bookings",
    icon: <IconChecklist size={18} />,
  },
  {
    title: "Settings",
    label: "",
    href: "/dashboard/user/settings/profile",
    icon: <IconSettings size={18} />,
  },
];
