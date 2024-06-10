import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";
import dayjs from "dayjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/custom/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { toast } from "sonner";

// Define schema for account form validation using Zod
const accountFormSchema = z.object({
  firstName: z
    .string()
    .min(2, {
      message: "First name must be at least 2 characters.",
    })
    .max(30, {
      message: "First name must not be longer than 30 characters.",
    }),
  lastName: z
    .string()
    .min(2, {
      message: "Last name must be at least 2 characters.",
    })
    .max(30, {
      message: "Last name must not be longer than 30 characters.",
    }),
});

type AccountFormValues = z.infer<typeof accountFormSchema>;

// Default form values
const defaultValues: Partial<AccountFormValues> = {};

// AccountForm component for updating account details
export function AccountForm({ user }: any) {
  // Initialize form with useForm hook and Zod resolver
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues,
  });

  // Function to handle form submission
  async function onSubmit(data: AccountFormValues) {
    try {
      const response = await axios.put("/api/doctors/profile", { ...data });
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* First Name Field */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input defaultValue={user?.firstName} {...field} />
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
                <Input defaultValue={user?.lastName} {...field} />
              </FormControl>
              <FormDescription>
                This is the name that will be displayed on your profile and in
                emails.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit">Update Account</Button>
      </form>
    </Form>
  );
}
