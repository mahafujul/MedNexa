import React, { useState, useEffect } from "react";
import axios from "axios";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/helper/formatDate";

function SetAvailability({ doctorId }: any) {
  const [date, setDate] = useState<Date>(new Date());
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [generateTimeSlots, setGenerateTimeSlots] = useState<string[]>([]);
  const [morningSession, setMorningSession] = useState<{
    from: number;
    to: number;
  }>({ from: 0, to: 0 });
  const [eveningSession, setEveningSession] = useState<{
    from: number;
    to: number;
  }>({ from: 0, to: 0 });
  const [sessionDuration, setSessionDuration] = useState<number>(0);

  const addTimeSlot = (time: string) => {
    setTimeSlots((prevSlots) =>
      prevSlots.includes(time) ? prevSlots : [...prevSlots, time]
    );
  };

  const removeTimeSlot = (time: string) => {
    setTimeSlots((prevSlots) => prevSlots.filter((slot) => slot !== time));
  };

  const saveAvailability = async () => {
    try {
      await axios.post("/api/doctors/set-availability", {
        doctorId,
        date: formatDate(date),
        slots: timeSlots,
      });
      toast.success("Availability set successfully!");
    } catch (error) {
      toast.error("Failed to set availability.");
    }
  };

  useEffect(() => {
    getTime();
  }, [sessionDuration]);

  const getTime = () => {
    const timeList = [];

    const generateSlots = (from: number, to: number, period: string) => {
      for (let i = from; i < to; i++) {
        const num = String(i);
        const digits = num.length;
        for (let j = 0; j < 60; j += sessionDuration) {
          const time =
            digits < 2
              ? j === 0
                ? `0${i}:00 ${period}`
                : `0${i}:${j} ${period}`
              : j === 0
              ? `${i}:00 ${period}`
              : `${i}:${j} ${period}`;

          // Split the time string to extract hours and minutes
          const [hour, minutePeriod] = time.split(":");
          const [minute, periodType] = minutePeriod.split(" ");
          const dateTime = new Date(date);

          // Adjust the hour based on the period (AM/PM)
          dateTime.setHours(
            periodType === "PM" && hour !== "12"
              ? parseInt(hour) + 12
              : parseInt(hour),
            parseInt(minute)
          );

          // Only add future time slots
          if (dateTime > new Date()) {
            timeList.push(time);
          }
        }
      }
    };

    if (morningSession.from && morningSession.to) {
      generateSlots(morningSession.from, morningSession.to, "AM");
    }

    if (eveningSession.from && eveningSession.to) {
      if (eveningSession.from === 12) {
        for (let i = 0; i < 60; i += sessionDuration) {
          const time = i === 0 ? "12:00 PM" : `12:${i} PM`;
          const dateTime = new Date(date);
          dateTime.setHours(12, i);

          if (dateTime > new Date()) {
            timeList.push(time);
          }
        }
        generateSlots(1, eveningSession.to, "PM");
      } else {
        generateSlots(eveningSession.from, eveningSession.to, "PM");
      }
    }

    setGenerateTimeSlots(timeList);
  };

  const isPastDay = (day: Date) => {
    const today = new Date();
    return day.setHours(0, 0, 0, 0) < today.setHours(0, 0, 0, 0);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="w-full">
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-2 md:space-y-0 pb-2">
            <CardTitle className="text-sm font-medium w-full md:w-auto">
              <div className="flex gap-2 items-center">
                <CalendarDays className="text-primary h-5 w-5" />
                Select Date
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-5 flex justify-center">
            <div className="flex flex-col gap-3 items-center w-full">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(day) => {
                  day && setDate(day);
                  setTimeSlots([]);
                }}
                disabled={isPastDay}
                className="rounded-md border sm:w-auto"
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Select Upcoming Sessions
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="flex flex-col gap-3">
              <h3 className="flex gap-2 items-center">
                <Clock className="text-primary h-5 w-5" />
                Morning Session
              </h3>
              <Select
                onValueChange={(value) => {
                  setMorningSession({ ...morningSession, from: Number(value) });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>From</SelectLabel>
                    <SelectItem value="6">06 AM</SelectItem>
                    <SelectItem value="7">07 AM</SelectItem>
                    <SelectItem value="8">08 AM</SelectItem>
                    <SelectItem value="9">09 AM</SelectItem>
                    <SelectItem value="10">10 AM</SelectItem>
                    <SelectItem value="11">11 AM</SelectItem>
                    <SelectItem value="12">12 PM</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) => {
                  setMorningSession({ ...morningSession, to: Number(value) });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>To</SelectLabel>
                    <SelectItem value="6">06 AM</SelectItem>
                    <SelectItem value="7">07 AM</SelectItem>
                    <SelectItem value="8">08 AM</SelectItem>
                    <SelectItem value="9">09 AM</SelectItem>
                    <SelectItem value="10">10 AM</SelectItem>
                    <SelectItem value="11">11 AM</SelectItem>
                    <SelectItem value="12">12 PM</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-3">
              <h3 className="flex gap-2 items-center">
                <Clock className="text-primary h-5 w-5" />
                Evening Session
              </h3>
              <Select
                onValueChange={(value) => {
                  setEveningSession({ ...eveningSession, from: Number(value) });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>From</SelectLabel>
                    <SelectItem value="12">12 PM</SelectItem>
                    <SelectItem value="1">01 PM</SelectItem>
                    <SelectItem value="2">02 PM</SelectItem>
                    <SelectItem value="3">03 PM</SelectItem>
                    <SelectItem value="4">04 PM</SelectItem>
                    <SelectItem value="5">05 PM</SelectItem>
                    <SelectItem value="6">06 PM</SelectItem>
                    <SelectItem value="7">07 PM</SelectItem>
                    <SelectItem value="8">08 PM</SelectItem>
                    <SelectItem value="9">09 PM</SelectItem>
                    <SelectItem value="10">10 PM</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select
                onValueChange={(value) => {
                  setEveningSession({ ...eveningSession, to: Number(value) });
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>To</SelectLabel>
                    <SelectItem value="1">01 PM</SelectItem>
                    <SelectItem value="2">02 PM</SelectItem>
                    <SelectItem value="3">03 PM</SelectItem>
                    <SelectItem value="4">04 PM</SelectItem>
                    <SelectItem value="5">05 PM</SelectItem>
                    <SelectItem value="6">06 PM</SelectItem>
                    <SelectItem value="7">07 PM</SelectItem>
                    <SelectItem value="8">08 PM</SelectItem>
                    <SelectItem value="9">09 PM</SelectItem>
                    <SelectItem value="10">10 PM</SelectItem>
                    <SelectItem value="11">11 PM</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-3 lg:col-span-2">
              <h3 className="flex gap-2 items-center">
                <Clock className="text-primary h-5 w-5" />
                Duration of a Session
              </h3>
              <Select
                onValueChange={(value) => {
                  setSessionDuration(Number(value));
                }}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Time in Minutes</SelectLabel>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="30">30</SelectItem>
                    <SelectItem value="60">60</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              <div className="flex gap-2 items-center">
                <Clock className="text-primary h-5 w-5" />
                Select Time Slots
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-5">
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 border rounded-lg p-5">
                {generateTimeSlots.map((time, index) => (
                  <h2
                    key={index}
                    onClick={() =>
                      timeSlots.includes(time)
                        ? removeTimeSlot(time)
                        : addTimeSlot(time)
                    }
                    className={`p-2 border cursor-pointer text-center rounded-full ${
                      timeSlots.includes(time)
                        ? "bg-primary text-white"
                        : "hover:bg-primary hover:text-white"
                    }`}
                  >
                    {time}
                  </h2>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <Button
        type="button"
        className="mt-4 w-full md:w-auto"
        disabled={!(date && timeSlots.length)}
        onClick={saveAvailability}
      >
        Save Availability
      </Button>
    </div>
  );
}

export default SetAvailability;
