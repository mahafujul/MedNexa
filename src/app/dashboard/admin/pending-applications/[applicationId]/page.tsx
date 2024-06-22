"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import Select from "react-select";
import { Textarea } from "@/components/ui/textarea";
import { specializationCategoryList } from "@/data/specializationCategoryList";
import { toast } from "sonner";

// Define schema for form validation using zod
const formSchema = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    firstName: z.string().min(2, {
      message: "First Name must be at least 2 characters",
    }),
    lastName: z.string().min(2, {
      message: "Last Name must be at least 2 characters",
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

function VerifyApplication({}: Props) {
  // State variables
  const [application, setApplication] = useState<z.infer<typeof formSchema>>();
  const [loading, setLoading] = useState<boolean>(false);
  const params = useParams();
  const applicationId = params.applicationId;

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const response = await axios.get(
          "/api/admin/doctors/pending-applications",
          {
            params: {
              applicationId,
            },
          }
        );
        setApplication(response.data.doctor[0]);
      } catch (err) {
        console.error("Error fetching application data:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [applicationId]);

  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
    defaultValues: application,
    mode: "onChange",
  });

  useEffect(() => {
    if (application) {
      form.reset(application);
    }
  }, [application, form]);

  // Function to handle form submission
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await axios.put(
        "/api/admin/doctors/pending-applications/give-approval",
        {
          ...values,
        },
        { params: { applicationId } }
      );
      toast(response.data.message, {
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
      window.close();
    } catch (err: any) {
      toast(err.response.data.message, {
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return (
      <div className="flex justify-center h-screen items-center">
        <p>Loading...</p>
      </div>
    );

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
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input disabled {...field} />
                      </FormControl>
                      <FormDescription>
                        {`Final username would be ${field.value}`}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="about"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bio</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
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
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Experience</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                        defaultValue={application?.degrees.map((degree) => ({
                          label: degree,
                          value: degree,
                        }))}
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
          </div>
          {/* Submit Button */}
          <div className="flex justify-end">
            <Button className="text-right" type="submit">
              Verify
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default VerifyApplication;
