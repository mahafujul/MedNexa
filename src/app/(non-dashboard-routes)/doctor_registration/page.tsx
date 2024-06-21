"use client";
import React, { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import Select from "react-select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { specializationCategoryList } from "@/data/specializationCategoryList";
import axios from "axios";
import { toast } from "sonner";


// Define schema for form validation using zod
const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    firstName: z.string().min(3, {
      message: "First Name must be at least 3 characters",
    }),
    lastName: z.string().min(3, {
      message: "Last Name must be at least 3 characters",
    }),
    email: z
      .string({ required_error: "Please enter an email address." })
      .email({
        message: "This is not a valid email",
      }),
    phoneNumber: z
      .string({ required_error: "Please enter a phone number." })
      .min(10, {
        message: "Phone number must be at least 10 digits.",
      }),
    about: z
      .string()
      .min(10, {
        message: "Bio must be at least 10 characters.",
      })
      .max(1000, {
        message: "Bio must not be longer than 1000 characters.",
      }),
    url: z.string({ required_error: "Please paste your photo URL" }),
    address: z.string({ required_error: "Address of the clinic is required." }),
    city: z.string({ required_error: "City is required" }),
    degrees: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "You have to select at least one degree.",
    }),
    specialization: z.string().min(1, {
      message: "Please select a specialization",
    }),
    experience: z.string().min(1, {
      message: "Please enter your overall experience in years",
    }),
    feePerConsultation: z.string({
      required_error: "Please enter your consultation fee",
    }),
    password: z.string().min(4),
    confirmPassword: z.string().min(4),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"], // Path of error
  });
type Props = {};
// Component for Doctor Registration
function DoctorRegistration({}: Props) {
  //State variable
  const [usernameAvailable, setUsernameAvailable] = useState<boolean>(false);

  // Initialize the form with default values and validation schema
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      about: "",
      url: "",
      address: "",
      city: "",
      degrees: [],
      specialization: "",
      experience: "",
      feePerConsultation: "",
      password: "",
      confirmPassword: "",
    },
  });

  //Function to check whether a username availabe or not
  async function usernameAvailabilityChecker(username: string) {
    try {
      //Send a GET request to the server with the username
      const response = await axios.get(
        "/api/doctors/check-username-availability",
        {
          params: {
            username,
          },
        }
      );
      if (response.data.success) {
        setUsernameAvailable(true);
      }else{
        setUsernameAvailable(false)
      }
      //Display success message using toast notification
      toast(response.data.message);
    } catch (err: any) {
      //Display error message using toast notifications on username availability check failure
      toast(err.response.message);
    }
  }

  // Function to handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Send a POST request to the server with the form data
      const response = await axios.post("/api/doctors/register", { ...values });
      // Display success message using toast notification
      toast(response.data.message, {
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } catch (err: any) {
      // Display error message using toast notification on submission failure
      toast(err.response.data.message, {
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
  }

  return (
    <div className="p-5 lg:p-20">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Card for Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Provide your personal details</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {/* Username Field */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <div className="flex gap-2">
                        <FormControl>
                          <Input placeholder="Enter your username" {...field} />
                        </FormControl>
                        <Button 
                          onClick={(e) => {
                            e.preventDefault()
                            usernameAvailabilityChecker(
                              form.getValues("username")
                            );
                          }}
                        >
                          Check
                        </Button>
                      </div>
                      <FormDescription>
                        {`Your final username would be dr-${field.value}`}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* First Name Field */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your first name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Last Name Field */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your last name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Email Field */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Phone Number Field */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your phone number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Photo URL Field */}
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Photo URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Paste URL of your photo."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Bio Field */}
                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little about yourself"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            {/* Card for Professional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
                <CardDescription>
                  Provide your professional details
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {/* Specialization Field */}
                <FormField
                  control={form.control}
                  name="specialization"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Specialization</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              role="combobox"
                              className={cn(
                                "w-full justify-between",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              {field.value
                                ? specializationCategoryList.find(
                                    (specialization) =>
                                      specialization.value === field.value
                                  )?.label
                                : "Select specialization"}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command>
                            <CommandInput
                              placeholder="Search specialization...."
                              className="h-9"
                            />
                            <CommandEmpty>
                              No specialization found.
                            </CommandEmpty>
                            <CommandList>
                              <CommandGroup>
                                {specializationCategoryList.map(
                                  (specialization) => (
                                    <CommandItem
                                      value={specialization.label}
                                      key={specialization.value}
                                      onSelect={() => {
                                        form.setValue(
                                          "specialization",
                                          specialization.value
                                        );
                                      }}
                                    >
                                      {specialization.label}
                                      <CheckIcon
                                        className={cn(
                                          "ml-auto h-4 w-4",
                                          specialization.value === field.value
                                            ? "opacity-100"
                                            : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  )
                                )}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Experience Field */}
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your experience in years"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Degrees Field */}
                <FormField
                  control={form.control}
                  name="degrees"
                  render={() => (
                    <FormItem>
                      <FormLabel>Degrees</FormLabel>
                      <Select
                        placeholder="Select your degrees"
                        options={[
                          { label: "MBBS", value: "MBBS" },
                          { label: "MS", value: "MS" },
                          { label: "MD", value: "MD" },
                          { label: "PhD", value: "PhD" },
                        ]}
                        isMulti
                        onChange={(selected) =>
                          form.setValue(
                            "degrees",
                            selected.map((item) => item.value)
                          )
                        }
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            {/* Card for Other Information */}
            <Card>
              <CardHeader>
                <CardTitle>Other Information</CardTitle>
                <CardDescription>
                  Provide clinic address, consultation fee, etc.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {/* Clinic Address Field */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Clinic Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your clinic address"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* City Field */}
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your city" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Consultation Fee Field */}
                <FormField
                  control={form.control}
                  name="feePerConsultation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Consultation Fee</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your consultation fee"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
            {/* Card for Login Credentials */}
            <Card>
              <CardHeader>
                <CardTitle>Login Credentials</CardTitle>
                <CardDescription>Set up your login details</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {/* Password Field */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Choose a strong password (min 4 characters).
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Confirm Password Field */}
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Re-enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        Re-enter your password for confirmation.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>
          {/* Submit Button */}
          <div className="flex justify-end">
            {!usernameAvailable ? (
              <Button disabled className="text-right" type="submit">
                Submit
              </Button>
            ) : (
              <Button className="text-right" type="submit">
                Submit
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}

export default DoctorRegistration;
