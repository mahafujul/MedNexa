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
    href: "/dashboard/doctor",
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: "Manage Sessions",
    label: "",
    href: "/dashboard/user/manage-sessions",
    icon: <IconUsers size={18} />,
  },
  {
    title: "Manage Appointments",
    label: "",
    href: "/dashboard/doctor/all-appointments",
    icon: <IconChecklist size={18} />,
  },
  {
    title: "Todays Appointments",
    label: "",
    href: "/dashboard/doctor/todays-appointments",
    icon: <IconChecklist size={18} />,
  },
  {
    title: "Settings",
    label: "",
    href: "/dashboard/doctor/settings/profile",
    icon: <IconSettings size={18} />,
  },
];
