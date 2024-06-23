"use client";
import { useState, useEffect, ChangeEvent } from "react";
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
import { cities } from "@/data/cities_in_west_bengal";
import { UserNav } from "@/components/user-nav";
import Image from "next/image";
import BookAppointment from "../(components)/BookAppointment";
import { GraduationCap, MapPin, IndianRupee } from "lucide-react";
import axios from "axios";
import { useParams } from "next/navigation";

interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  url: string;
  feePerConsultation: number;
  experience: number;
  specialization: string;
  city: string;
  degrees: string[];
  name: string;
}


export default function RecommendedDoctors() {
  // State variables for sorting, filtering, search term, loading state, and doctors list
  const [sortOrder, setSortOrder] = useState<"ascending" | "descending">(
    "ascending"
  );
  const [selectedLocation, setSelectedLocation] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  // Retrieve specialization from URL parameters
  const params = useParams();
  const specialization = params.specialization;

  // Fetch doctors of a particular specialization category
  useEffect(() => {
    (async function fetchDoctors() {
      try {
        setIsLoading(true);
        const response = await axios.get(`/api/doctors/get-a-specialist`, {
          params: { specialization },
        });
        setDoctors(response.data.doctors);
      } catch (error) {
        console.error("Error fetching doctors data:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [specialization]);

  // Filter and sort the doctors list
  const filteredDoctors = doctors
    .sort((a, b) =>
      sortOrder === "ascending"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    )
    .filter((doctor) =>
      selectedLocation === "All" ? true : doctor.city === selectedLocation
    )
    .filter((doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  // Display loading indicator while data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center h-screen items-center">
        <p>Loading...</p>
      </div>
    );
  }

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
            {/* Search input for filtering doctors by name */}
            <Input
              placeholder="Search a doctor..."
              className="h-9 w-40 lg:w-[250px]"
              value={searchTerm}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearchTerm(e.target.value)
              }
            />
            {/* Dropdown for selecting location */}
            <Select
              value={selectedLocation}
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger className="w-36">
                <SelectValue>
                  {selectedLocation === "All"
                    ? "All Locations"
                    : selectedLocation}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Locations</SelectItem>
                {cities.map((city, index) => (
                  <SelectItem key={index} value={city.name}>
                    {city.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Dropdown for selecting sort order */}
          <Select value={sortOrder} onValueChange={setSortOrder}>
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

        {/* List of filtered doctors */}
        <ul className="no-scrollbar grid gap-4 overflow-y-scroll pb-16 pt-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <li
              key={doctor._id}
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
                    <span>{doctor.experience} Years of Experience</span>
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
                      {doctor.degrees.map((degree, index) => (
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
                  <BookAppointment doctorId={doctor._id} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </LayoutBody>
    </Layout>
  );
}
