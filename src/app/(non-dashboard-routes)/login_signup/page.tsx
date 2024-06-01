"use client";
// Import necessary modules and dependencies
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signIn } from "next-auth/react";

// Define the type of props passed to the component
type Props = {};

// Define the LoginSignup functional component
function LoginSignup({}: Props) {
  // Define state variables using useState hook
  const [user, setUser] = useState({}); // State for user registration data
  const [loginCredential, setLoginCredential] = useState<{
    username: string;
    password: string;
  }>({ username: "", password: "" }); // State for login credentials

  // Initialize useRouter hook for navigation
  const router = useRouter();

  // Function to handle registration form submission
  async function onSubmitRegister() {
    try {
      // Send a POST request to register a user
      const response = await axios.post(`/api/users/register`, { ...user });
      // Display success message using toast notification
      toast(response.data.message, {
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } catch (err: any) {
      // Display error message using toast notification on registration failure
      toast(err.response.data.message, {
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
  }

  // Function to handle login form submission
  async function onSubmitLogin() {
    try {
      // Send a request to sign in the user with credentials
      const result = await signIn("credentials", {
        redirect: false,
        username: loginCredential.username,
        password: loginCredential.password,
      });

      if (result?.error) {
        // Display error message using toast notification on login failure
        toast(result.error, {
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
      }

      if (result?.url) {
        // Display success message using toast notification
        toast("Login successful", {
          action: {
            label: "Undo",
            onClick: () => console.log("Undo"),
          },
        });
        // Redirect user to dashboard on successful login
        router.replace("/dashboard");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  }

  return (
    <div className="w-100 h-screen flex justify-center items-center p-4">
      {/* Tabs for switching between Login and Register */}
      <Tabs defaultValue="login" className="w-[400px]">
        {/* TabsList for displaying tab labels */}
        <TabsList className="grid w-full grid-cols-2">
          {/* Tab trigger for Login */}
          <TabsTrigger value="login">Login</TabsTrigger>
          {/* Tab trigger for Register */}
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        {/* Content of the Login tab */}
        <TabsContent value="login">
          {/* Card for containing login form */}
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Input fields for username and password */}
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  onChange={(e) => {
                    setLoginCredential({
                      ...loginCredential,
                      username: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) => {
                    setLoginCredential({
                      ...loginCredential,
                      password: e.target.value,
                    });
                  }}
                />
              </div>
            </CardContent>
            <CardFooter>
              {/* Button to submit login form */}
              <Button
                onClick={() => {
                  onSubmitLogin();
                }}
              >
                Login
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        {/* Content of the Register tab */}
        <TabsContent value="register">
          {/* Card for containing registration form */}
          <Card>
            <CardHeader>
              <CardTitle>Join MedNexa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {/* Input fields for user details */}
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  onChange={(e) =>
                    setUser({ ...user, username: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="firstName">FirstName</Label>
                <Input
                  id="firstName"
                  onChange={(e) =>
                    setUser({ ...user, firstName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="lastName">LastName</Label>
                <Input
                  id="lastName"
                  onChange={(e) =>
                    setUser({ ...user, lastName: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="mobileNumber">Mobile Number</Label>
                <Input
                  id="mobileNumber"
                  type="tel"
                  onChange={(e) =>
                    setUser({ ...user, mobileNumber: e.target.value })
                  }
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />
              </div>
            </CardContent>
            <CardFooter>
              {/* Button to submit registration form */}
              <Button
                onClick={() => {
                  onSubmitRegister();
                }}
              >
                Register
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Export the LoginSignup component
export default LoginSignup;
