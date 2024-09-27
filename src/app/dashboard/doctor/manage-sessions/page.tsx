"use client";
// Importing custom components
import React from "react";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { UserNav } from "@/components/user-nav";
import SetAvailability from "../components/set-availability";
import { useSession } from "next-auth/react";

const SetAvailabilityPage = () => {
  const { data: session } = useSession();
  const doctorId = session?.user?.userId;
  return (
    <Layout>
      {/* Header section */}
      <LayoutHeader>
        <div className="flex w-full items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Set Your Availability
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </LayoutHeader>

      {/* Body section */}
      <LayoutBody className="flex flex-col" fixedHeight>
        <div className="w-full">
          <div className="container mx-auto p-4">
            <SetAvailability doctorId={doctorId} />
          </div>
        </div>
      </LayoutBody>
    </Layout>
  );
};

export default SetAvailabilityPage;
