import {
  IconApps,
  IconBarrierBlock,
  IconBoxSeam,
  IconChartHistogram,
  IconChecklist,
  IconComponents,
  IconError404,
  IconExclamationCircle,
  IconHexagonNumber1,
  IconHexagonNumber2,
  IconHexagonNumber3,
  IconHexagonNumber4,
  IconHexagonNumber5,
  IconLayoutDashboard,
  IconMessages,
  IconRouteAltLeft,
  IconServerOff,
  IconSettings,
  IconTruck,
  IconUserShield,
  IconUsers,
  IconUserExclamation,
  IconCalendarClock,
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
    href: "/dashboard/admin",
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: "Doctors",
    href: "/dashboard/admin/all-doctors",
    icon: <IconUsers size={18} />,
  },
  {
    title: "Users",
    href: "/dashboard/admin/all-users",
    icon: <IconUsers size={18} />,
  },
  {
    title: "Appointments",
    label: "",
    href: "/dashboard/admin/all-appointments",
    icon: <IconCalendarClock size={18} />,
  },
  {
    title: "Pending Applications",
    label: "",
    href: "/dashboard/admin/pending-applications",
    icon: <IconUserExclamation size={18} />,
  },
  {
    title: "Settings",
    label: "",
    href: "/dashboard/admin/settings",
    icon: <IconSettings size={18} />,
  },
];
