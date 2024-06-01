"use client";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function useCheckActiveNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const role = session?.user?.role?.toString().toLowerCase();

  const checkActiveNav = (nav: string) => {
    const pathArray = pathname.split("/").filter((item: any) => item !== "");

    if (nav === `/dashboard/${role}` && pathArray.length < 3) return true;

    const thirdElementOfTheRoute = nav.split("/")[3];
    return pathArray.includes(thirdElementOfTheRoute);
  };

  return { checkActiveNav };
}
