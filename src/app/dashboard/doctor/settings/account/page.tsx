"use client";
import { Separator } from "@/components/ui/separator";
import { AccountForm } from "./account-form";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SettingsAccount() {
  const [user, setUser] = useState({}); // State to store user data

  useEffect(() => {
    // Function to fetch user data from the backend
    async function fetchDataFromBackend() {
      try {
        const response = await axios.get(`/api/doctors/profile`);
        setUser(response.data.doctor[0]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchDataFromBackend(); // Fetch data when the component mounts
  }, []);
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Account</h3>
        <p className="text-sm text-muted-foreground">
          Manage your account details here. Update your personal information
          including First Name, Last Name, and Date of Birth.
        </p>
      </div>
      <Separator />
      <AccountForm user={user} />
    </div>
  );
}
