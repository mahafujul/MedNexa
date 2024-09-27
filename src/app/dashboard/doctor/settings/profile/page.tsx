"use client";
import { Separator } from "@/components/ui/separator";
import ProfileForm from "./profile-form";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SettingsProfile() {
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
        <h3 className="text-lg font-medium">Profile</h3>
        <p className="text-sm text-muted-foreground">
          This is how others will see you on the site.
        </p>
      </div>
      <Separator className="my-4" />
      <ProfileForm user={user} />
    </div>
  );
}
