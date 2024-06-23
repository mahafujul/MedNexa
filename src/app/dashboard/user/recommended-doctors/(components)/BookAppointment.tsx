import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { formatDate } from "@/helper/formatDate";
import { filterOutPastSlots } from "@/helper/filterOutPastSlots";

// Define the BookAppointment component, accepting doctorId as a prop
function BookAppointment({ doctorId }: any) {
  const [date, setDate] = useState<Date>(new Date());
  const [timeSlot, setTimeSlot] = useState<string[]>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>();
  const [note, setNote] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch available slots when the date changes
  useEffect(() => {
    if (date != new Date()) {
      fetchAvailableSlots();
    }
  }, [date]);

  // Function to fetch available slots for a specific date and doctor
  const fetchAvailableSlots = async () => {
    try {
      const response = await axios.get("/api/doctors/available-slots", {
        params: {
          date: formatDate(date), // Format date to YYYY-MM-DD
          doctorId,
        },
      });
      //Filter out past time slots, Only add future time slots.
      setTimeSlot(filterOutPastSlots(response.data.slots, date));
    } catch (error) {
      console.error("Failed to fetch available slots", error);
    }
  };

  // Function to save the booking
  const saveBooking = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/appointments/book", {
        selectedTimeSlot,
        note,
        date: formatDate(date), // Format date to YYYY-MM-DD
        doctorId,
      });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      // Remove the selected time slot from available slots after booking
      setTimeSlot(timeSlot?.filter((time) => time != selectedTimeSlot));
      setLoading(false);
    }
  };

  // Function to check if a given date is in the past
  const isPastDay = (day: Date) => {
    const today = new Date();
    return day.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div className="border border-blue-300 bg-blue-50 hover:bg-blue-100 dark:border-blue-700 dark:bg-blue-950 dark:hover:bg-blue-900 h-9 rounded-md px-3 content-center">
          <h4 className="text-sm font-medium">Book Appointment</h4>
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-full max-h-full overflow-y-auto md:max-w-2xl md:max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Pick a time slot</DialogTitle>
          <DialogDescription>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-2">
                {/* Calendar section to select date */}
                <div className="flex flex-col gap-3 items-baseline">
                  <h2 className="flex gap-2 items-center">
                    <CalendarDays className="text-primary h-5 w-5" />
                    Select Date
                  </h2>

                  <div className="flex flex-col gap-3 items-center w-full">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(day) => day && setDate(day)}
                      disabled={isPastDay}
                      className="rounded-md border sm:w-auto"
                    />
                  </div>
                </div>
                {/* Time Slot section to select available time slot */}
                {!loading ? (
                  <div className="mt-3 md:mt-0">
                    <h2 className="flex gap-2 items-center mb-3">
                      <Clock className="text-primary h-5 w-5" />
                      Select Time Slot
                    </h2>
                    <div className="grid grid-cols-3 gap-2 border rounded-lg p-5">
                      {timeSlot?.map((item, index) => (
                        <h2
                          key={index}
                          onClick={() => setSelectedTimeSlot(item)}
                          className={`p-2 border cursor-pointer text-center hover:bg-primary hover:text-white rounded-full ${
                            item == selectedTimeSlot && "bg-primary text-white"
                          }`}
                        >
                          {item}
                        </h2>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mt-3 md:mt-0">
                    <h2 className="flex gap-2 items-center mb-3">
                      <Clock className="text-primary h-5 w-5" />
                      Wait.....
                    </h2>
                    <div className="grid grid-cols-3 gap-2 border rounded-lg p-5">
                      {timeSlot?.map((item, index) => (
                        <h2
                          key={index}
                          onClick={() => setSelectedTimeSlot(item)}
                          className={`p-2 border cursor-pointer text-center hover:bg-primary hover:text-white rounded-full ${
                            item == selectedTimeSlot && "bg-primary text-white"
                          }`}
                        >
                          {item}
                        </h2>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              {/* Textarea to add a note for the appointment */}
              <Textarea
                className="mt-3"
                placeholder="Note"
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end gap-4 sm:gap-0">
          {/* Dialog close button */}
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="text-red-500 border-red-500"
            >
              Close
            </Button>
          </DialogClose>
          {/* Submit button to save the booking */}
          <Button
            type="button"
            disabled={!(date && selectedTimeSlot)}
            onClick={saveBooking}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookAppointment;
