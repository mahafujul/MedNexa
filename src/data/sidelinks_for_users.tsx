import {
  IconLayoutDashboard,
  IconSettings,
  IconUsers,
  IconChecklist
} from '@tabler/icons-react'

export interface NavLink {
  title: string
  label?: string
  href: string
  icon: JSX.Element
}

export interface SideLink extends NavLink {
  sub?: NavLink[]
}

export const sidelinks: SideLink[] = [
  {
    title: 'Dashboard',
    label: '',
    href: '/dashboard/user',
    icon: <IconLayoutDashboard size={18} />,
  },
  {
    title: 'Find Specialist',
    label: '',
    href: '/dashboard/user/enter-symptoms',
    icon: <IconUsers size={18} />,
  },
  {
    title: 'My Bookings',
    label: '3',
    href: '/my-bookings',
    icon: <IconChecklist size={18} />,
  },
  {
    title: 'Settings',
    label: '',
    href: '/settings',
    icon: <IconSettings size={18} />,
  },
]