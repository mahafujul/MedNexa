"use client";
import { useState } from "react";
import {
  IconAdjustmentsHorizontal,
  IconSortAscendingLetters,
  IconSortDescendingLetters,
} from "@tabler/icons-react";
import { Layout, LayoutBody, LayoutHeader } from "@/components/custom/layout";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

import { UserNav } from "@/components/user-nav";
import { doctorList } from "@/data/doctor_list";
import Image from "next/image";
import BookAppointment from "../(components)/BookAppointment";
import { GraduationCap, MapPin, IndianRupee } from "lucide-react";

export default function RecommendedDoctors() {
  const [sort, setSort] = useState("ascending");
  const [location, setLocation] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDoctor = doctorList
    .sort((a: any, b: any) =>
      sort === "ascending"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
    .filter((doctor: any) =>
      location === "All" ? true : doctor.city === location
    )
    .filter((doctor: any) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <Layout fadedBelow fixedHeight>
      {/* ===== Top Heading ===== */}
      <LayoutHeader>
        <div className="flex w-full items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
              Book an appointment
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <UserNav />
          </div>
        </div>
      </LayoutHeader>

      {/* ===== Content ===== */}
      <LayoutBody className="flex flex-col" fixedHeight>
        <div>
          <p className="text-muted-foreground">
            Here&apos;s a list of recommended doctors!
          </p>
        </div>
        <div className="my-4 flex items-end justify-between sm:my-0 sm:items-center">
          <div className="flex flex-col gap-4 sm:my-4 sm:flex-row">
            <Input
              placeholder="Search a doctor..."
              className="h-9 w-40 lg:w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={location} onValueChange={setLocation}>
              <SelectTrigger className="w-36">
                <SelectValue>
                  {location === "all" ? "All Locations" : location}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Locations</SelectItem>
                <SelectItem value="Kolkata">Kolkata</SelectItem>
                <SelectItem value="Kalyani">Kalyani</SelectItem>
                <SelectItem value="Berhampure">Berhampure</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Select value={sort} onValueChange={setSort}>
            <SelectTrigger className="w-16">
              <SelectValue>
                <IconAdjustmentsHorizontal size={18} />
              </SelectValue>
            </SelectTrigger>
            <SelectContent align="end">
              <SelectItem value="ascending">
                <div className="flex items-center gap-4">
                  <IconSortAscendingLetters size={16} />
                  <span>Ascending</span>
                </div>
              </SelectItem>
              <SelectItem value="descending">
                <div className="flex items-center gap-4">
                  <IconSortDescendingLetters size={16} />
                  <span>Descending</span>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Separator className="shadow" />
        <ul className="no-scrollbar grid gap-4 overflow-y-scroll pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctor.map((doctor: any) => (
            <li
              key={doctor.id}
              className="rounded-lg border p-2 sm:p-4 hover:shadow-md"
            >
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <Image
                    src={doctor?.url}
                    alt="doctor"
                    width={60}
                    height={30}
                    className="rounded-md shadow-sm"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="mt-2 font-semibold">{doctor.name}</h2>
                  <h2 className="flex gap-2 text-gray-500 text-md">
                    <GraduationCap />
                    <span>{doctor.Year_of_Experience} of Experience</span>
                  </h2>
                  <h2 className="text-md flex gap-2 text-gray-500">
                    <MapPin />
                    <span>{doctor.city}</span>
                  </h2>
                  <h2 className="text-md flex gap-2 text-gray-500">
                    <IndianRupee />
                    <span>{`${doctor.feePerConsultation}`}</span>
                  </h2>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="flex gap-2">
                    <h2
                      className="text-[10px] bg-blue-100 p-1 rounded-full
                        px-2 text-primary"
                    >
                      {doctor.specialization}
                    </h2>
                    <div className="flex gap-2">
                      {doctor.degrees.map((degree: any, index: number) => (
                        <h2
                          key={index}
                          className="text-[10px] bg-blue-100 p-1 rounded-full
                        px-2 text-primary"
                        >
                          {degree}
                        </h2>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <BookAppointment />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </LayoutBody>
    </Layout>
  );
}
