"use client";
import Image from "next/image";
import Hero from "@/components/hero";
import CategorySearch from "@/components/category-search";
import DoctorList from "@/components/doctor-list";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { useEffect, useState } from "react";
import axios from "axios";

const doctorList = [
  {
    id: 1,
    url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
    Name: "Mahafujul Haque",
    Year_of_Experience: "15 Years",
    Address: "Kalyani",
    specialization: "Orthopedics",
  },
  {
    id: 2,
    url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
    Name: "Mahafujul Haque",
    Year_of_Experience: "15 Years",
    Address: "Kalyani",
    specialization: "Internal Medicine",
  },
  {
    id: 3,
    url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
    Name: "Mahafujul Haque",
    Year_of_Experience: "15 Years",
    Address: "Kalyani",
    specialization: "Radiology",
  },
  {
    id: 4,
    url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
    Name: "Mahafujul Haque",
    Year_of_Experience: "15 Years",
    Address: "Kalyani",
    specialization: "Orthopedics",
  },
  {
    id: 5,
    url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
    Name: "Mahafujul Haque",
    Year_of_Experience: "15 Years",
    Address: "Kalyani",
    specialization: "Orthopedics",
  },
  {
    id: 6,
    url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
    Name: "Mahafujul Haque",
    Year_of_Experience: "15 Years",
    Address: "Kalyani",
    specialization: "Orthopedics",
  },
  {
    id: 7,
    url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
    Name: "Mahafujul Haque",
    Year_of_Experience: "15 Years",
    Address: "Kalyani",
    specialization: "Orthopedics",
  },
  {
    id: 8,
    url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
    Name: "Mahafujul Haque",
    Year_of_Experience: "15 Years",
    Address: "Kalyani",
    specialization: "Orthopedics",
  },
  {
    id: 9,
    url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
    Name: "Mahafujul Haque",
    Year_of_Experience: "15 Years",
    Address: "Kalyani",
    specialization: "Orthopedics",
  },
  {
    id: 10,
    url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
    Name: "Mahafujul Haque",
    Year_of_Experience: "15 Years",
    Address: "Kalyani",
    specialization: "Orthopedics",
  },
  {
    id: 11,
    url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
    Name: "Mahafujul Haque",
    Year_of_Experience: "15 Years",
    Address: "Kalyani",
    specialization: "Orthopedics",
  },
  {
    id: 12,
    url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
    Name: "Mahafujul Haque",
    Year_of_Experience: "15 Years",
    Address: "Kalyani",
    specialization: "Orthopedics",
  },
  {
    id: 13,
    url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
    Name: "Mahafujul Haque",
    Year_of_Experience: "15 Years",
    Address: "Kalyani",
    specialization: "Orthopedics",
  },
  {
    id: 14,
    url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
    Name: "Mahafujul Haque",
    Year_of_Experience: "15 Years",
    Address: "Kalyani",
    specialization: "Orthopedics",
  },
  {
    id: 15,
    url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
    Name: "Mahafujul Haque",
    Year_of_Experience: "15 Years",
    Address: "Kalyani",
    specialization: "Orthopedics",
  },
];
export default function Home() {
  const [doctor, setDoctor] = useState([]);
  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get("/api/doctors/popular-doctor");
        setDoctor(response.data.popularDoctors);
      } catch (error) {
        console.error("Error fetching doctors data:", error);
      }
    })();
  }, []);
  return (
    <div>
      <div className="md:px-20">
        {/* Header */}
        <Header></Header>
        {/* Hero Section */}
        <Hero></Hero>
        {/* Search Bar + Category */}
        <CategorySearch />
        {/* Popular Doctor List  */}
        <DoctorList doctorList={doctor} />
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
