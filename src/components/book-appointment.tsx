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

function BookAppointment({ doctor }: any) {
  const [date, setDate] = useState(new Date());
  const [timeSlot, setTimeSlot] = useState<{ time: string }[]>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState();
  const [note, setNote] = useState();

  useEffect(() => {
    getTime();
  }, []);

  const getTime = () => {
    const timeList = [];
    for (let i = 10; i <= 12; i++) {
      timeList.push({ time: i + ":00 AM" });
      timeList.push({ time: i + ":30 AM" });
    }
    for (let i = 1; i <= 6; i++) {
      timeList.push({ time: i + ":00 PM" });
      timeList.push({ time: i + ":30 PM" });
    }

    setTimeSlot(timeList);
  };

  const saveBooking = () => {
    const responce: any = axios.post(
      "http://localhost:3000/api/appointments/book",
      {
        selectedTimeSlot,
        note,
        date,
      }
    );
    // Code for saving booking
  };

  const isPastDay = (day: any) => {
    return day <= new Date();
  };

  return (
    <Dialog>
      <DialogTrigger>
        <Button className="mt-3 rounded-full">Book Appointment</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pick a time slot</DialogTitle>
          <DialogDescription>
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-2">
                {/* Calendar */}
                <div className="flex flex-col gap-3 items-baseline">
                  <h2 className="flex gap-2 items-center">
                    <CalendarDays className="text-primary h-5 w-5" />
                    Select Date
                  </h2>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(day) => day && setDate(day)}
                    disabled={isPastDay}
                    className="rounded-md border"
                  />
                </div>
                {/* Time Slot */}
                <div className="mt-3 md:mt-0">
                  <h2 className="flex gap-2 items-center mb-3">
                    <Clock className="text-primary h-5 w-5" />
                    Select Time Slot
                  </h2>
                  <div className="grid grid-cols-3 gap-2 border rounded-lg p-5">
                    {timeSlot?.map((item: any, index: any) => (
                      <h2
                        onClick={() => setSelectedTimeSlot(item.time)}
                        className={`p-2 border cursor-pointer text-center hover:bg-primary hover:text-white rounded-full ${
                          item.time == selectedTimeSlot &&
                          "bg-primary text-white"
                        }`}
                      >
                        {item.time}
                      </h2>
                    ))}
                  </div>
                </div>
              </div>
              <Textarea
                className="mt-3"
                placeholder="Note"
                onChange={(e: any) => setNote(e.target.value)}
              />
            </div>
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="text-red-500 border-red-500"
            >
              Close
            </Button>
          </DialogClose>
          <Button
            type="button"
            disabled={!(date && selectedTimeSlot)}
            onClick={() => saveBooking()}
          >
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BookAppointment;
