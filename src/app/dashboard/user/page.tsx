"use client";

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
import { useSession } from "next-auth/react"; // Import useSession for authentication
import { CreditCard, LineChart } from "lucide-react"; // Import icons
import { useRouter } from "next/navigation"; // Import router for navigation
import axios from "axios"; // Import axios for making API requests
import { useEffect, useState } from "react"; // Import hooks for state management and side effects
import { RecentAppointments } from "../(components)/recent-appointments"; // Import RecentAppointments component

export default function User() {
  const router = useRouter();
  const [user, setUser] = useState({}); // State to store user data

  useEffect(() => {
    // Function to fetch user data from the backend
    async function fetchDataFromBackend() {
      try {
        const response = await axios.get(`/api/users/profile`);
        console.log(response.data.user[0].allAppointments);
        setUser(response.data.user[0]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchDataFromBackend(); // Fetch data when the component mounts
  }, []);

  return (
    <Layout>
      {/* ===== Top Heading ===== */}
      <LayoutHeader className="py-3.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Dashboard
        </h1>
        <div className="ml-auto flex items-center space-x-4">
          <UserNav /> {/* User navigation menu */}
        </div>
      </LayoutHeader>

      {/* ===== Main Content ===== */}
      <LayoutBody className="space-y-4">
        <div className="space-y-4">
          <div>
            {/* Welcome Card */}
            <Card className="bg-gray-900 relative">
              <CardHeader>
                <CardTitle className="text-md font-medium text-white">
                  Welcome!
                </CardTitle>
                <CardContent>
                  <div className="text-2xl font-bold py-5 text-white">
                    {user?.username}.
                  </div>
                  <p className="text-md text-muted-foreground pb-6 text-white">
                    Need a Specialist? No problem! Let's Find One for You.
                    <br />
                    Tell us about your symptoms, and we'll match you with the
                    best expert for your recovery.
                    <br />
                    Simply choose a convenient time slot.
                  </p>
                  <Button
                    onClick={() =>
                      router.push("/dashboard/user/find-specialist")
                    }
                  >
                    Find Specialist
                  </Button>{" "}
                  {/* Button to navigate to the enter symptoms page */}
                </CardContent>
              </CardHeader>
            </Card>
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-10">
            <div className="col-span-1 lg:col-span-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">
                {/* Statistics Cards */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Upcoming Sessions
                    </CardTitle>
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {user?.upcomingSessions?.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +19% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Today Sessions
                    </CardTitle>
                    <LineChart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {user?.todaySessions?.length}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      +201 since last hour
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="col-span-1 lg:col-span-4">
              {/* Recent Appointments Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Appointments</CardTitle>
                </CardHeader>
                <CardContent>
                  <RecentAppointments allAppointments={user.allAppointments} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </LayoutBody>
    </Layout>
  );
}
