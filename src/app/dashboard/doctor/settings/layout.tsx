import { IconUser, IconTool } from "@tabler/icons-react"; // Importing icons from @tabler/icons-react
import { Separator } from "@/components/ui/separator"; // Importing Separator component
import ThemeSwitch from "@/components/theme-switch"; // Importing ThemeSwitch component
import { UserNav } from "@/components/user-nav"; // Importing UserNav component
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout"; // Importing Layout components
import SidebarNav from "./(components)/sidebar-nav"; // Importing SidebarNav component

// Define the props for the Settings component
interface SettingsProps {
  children: React.ReactNode;
}

// Sidebar navigation items
const sidebarNavItems = [
  {
    title: "Profile",
    icon: <IconUser size={18} />,
    href: "/dashboard/doctor/settings/profile",
  },
  {
    title: "Account",
    icon: <IconTool size={18} />,
    href: "/dashboard/doctor/settings/account",
  },
];

// Settings component for managing user settings
export default function SettingsLayout({ children }: Readonly<SettingsProps>) {
  return (
    <Layout fadedBelow fixedHeight>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Settings
        </h1>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeSwitch />
          <UserNav />
        </div>
      </LayoutHeader>

      <LayoutBody className="flex flex-col" fixedHeight>
        <div className="space-y-0.5">
          <p className="text-muted-foreground">Manage your account settings.</p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-1 flex-col space-y-8 overflow-auto lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="sticky top-0 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="w-full p-1 pr-4 lg:max-w-xl">
            <div className="pb-16">
              {/* Render the children passed to the Settings component */}
              {children}
            </div>
          </div>
        </div>
      </LayoutBody>
    </Layout>
  );
}
