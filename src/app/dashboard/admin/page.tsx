"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/custom/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserNav } from "@/components/user-nav";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { Users, ListTodo, UsersRound } from "lucide-react"; // Import icons
import axios from "axios";

export default function Admin() {
  const [data, setData] = useState<{
    totalNumberOfUsers: number;
    totalNumberOfDoctors: number;
    totalNumberOfPendingApplications: number;
    totalNumberOfAppointments: number;
    success: boolean;
  }>();
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch data from the backend
  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get("/api/admin/initial-contents");
        setData(response.data);
      } catch (err: any) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Dashboard
        </h1>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav />
        </div>
      </LayoutHeader>

      {/* ===== Main ===== */}
      <LayoutBody className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card for Total Doctors */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Doctors
              </CardTitle>
              <UsersRound className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data?.totalNumberOfDoctors}
              </div>
              <p className="text-xs text-muted-foreground">
                Registered doctors
              </p>
            </CardContent>
          </Card>

          {/* Card for Total Users */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data?.totalNumberOfUsers}
              </div>
              <p className="text-xs text-muted-foreground">Registered users</p>
            </CardContent>
          </Card>

          {/* Card for Total Appointments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Appointments
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="h-4 w-4 text-muted-foreground"
              >
                <rect width="20" height="14" x="2" y="5" rx="2" />
                <path d="M2 10h20" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data?.totalNumberOfAppointments}
              </div>
              <p className="text-xs text-muted-foreground">
                Scheduled appointments
              </p>
            </CardContent>
          </Card>

          {/* Card for Pending Applications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Applications
              </CardTitle>
              <ListTodo className="w-4 h-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {data?.totalNumberOfPendingApplications}
              </div>
              <p className="text-xs text-muted-foreground">Pending approvals</p>
            </CardContent>
          </Card>
        </div>
      </LayoutBody>
    </Layout>
  );
}
