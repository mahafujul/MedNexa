"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useSession, signOut } from "next-auth/react";
import { LayoutDashboard } from "lucide-react";

function Header() {
  const { data: session } = useSession();

  // Function to handle sign out
  async function onClickSignOut() {
    try {
      signOut();
      // Show toast notification on successful logout
      toast("Logout successful", {
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  // Menu items for navigation
  const Menu = [
    {
      id: 1,
      name: "Home",
      path: "/",
    },
    {
      id: 2,
      name: "Explore",
      path: "/explore",
    },
    {
      id: 3,
      name: "Contact Us",
      path: "/contact-us",
    },
  ];

  // Render header for authenticated users
  if (session) {
    return (
      <div className="flex items-center justify-between p-4 shadow-sm">
        <div className="flex items-center gap-10">
          <Image src="/logo.svg" alt="logo" width={180} height={80} />
          <ul className="md:flex gap-8 hidden">
            {Menu.map((item, index) => (
              <Link key={index} href={item.path}>
                <li className="hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out">
                  {item.name}
                </li>
              </Link>
            ))}
          </ul>
        </div>
        <div className="flex gap-1 md:gap-3">
          <Button asChild>
            <h2 className="text-md flex gap-2 text-gray-500">
              <LayoutDashboard />
              <Link className="hidden md:block" href="/dashboard">
                Dashboard
              </Link>
            </h2>
          </Button>
          <Button asChild>
            <Link href="#" onClick={() => onClickSignOut()}>
              Sign out
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // Render header for unauthenticated users
  return (
    <div className="flex items-center justify-between p-4 shadow-sm">
      <div className="flex items-center gap-10">
        <Image src="/logo.svg" alt="logo" width={180} height={80} />
        <ul className="md:flex gap-8 hidden">
          {Menu.map((item, index) => (
            <Link key={index} href={item.path}>
              <li className="hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out">
                {item.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex gap-2">
        <Button asChild className="hidden md:block">
          <Link href="/doctor_registration">Dr. Registration</Link>
        </Button>
        <Button asChild>
          <Link href="/login_signup">Get Started</Link>
        </Button>
      </div>
    </div>
  );
}

export default Header;
