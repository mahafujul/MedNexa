"use client";
import DoctorList from "@/components/doctor-list";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { capitalizeFirstLetter } from "@/helper/capitalizeFirstLetter";
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

function Search({ params }: any) {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const param = useParams();
  const specialization = param.cname;

  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(`/api/doctors/get-a-specialist`, {
          params: { specialization },
        });
        setDoctors(response.data.doctors);
      } catch (error: any) {
        console.error("Error fetching doctors data:", error);
      }
    })();
  }, []);

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
      id: 1,
      url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
      Name: "Mahafujul Haque",
      Year_of_Experience: "15 Years",
      Address: "Kalyani",
      specialization: "Internal Medicine",
    },
    {
      id: 1,
      url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
      Name: "Mahafujul Haque",
      Year_of_Experience: "15 Years",
      Address: "Kalyani",
      specialization: "Radiology",
    },
    {
      id: 1,
      url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
      Name: "Mahafujul Haque",
      Year_of_Experience: "15 Years",
      Address: "Kalyani",
      specialization: "Orthopedics",
    },
    {
      id: 1,
      url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
      Name: "Mahafujul Haque",
      Year_of_Experience: "15 Years",
      Address: "Kalyani",
      specialization: "Orthopedics",
    },
    {
      id: 1,
      url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
      Name: "Mahafujul Haque",
      Year_of_Experience: "15 Years",
      Address: "Kalyani",
      specialization: "Orthopedics",
    },
    {
      id: 1,
      url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
      Name: "Mahafujul Haque",
      Year_of_Experience: "15 Years",
      Address: "Kalyani",
      specialization: "Orthopedics",
    },
    {
      id: 1,
      url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
      Name: "Mahafujul Haque",
      Year_of_Experience: "15 Years",
      Address: "Kalyani",
      specialization: "Orthopedics",
    },
    {
      id: 1,
      url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
      Name: "Mahafujul Haque",
      Year_of_Experience: "15 Years",
      Address: "Kalyani",
      specialization: "Orthopedics",
    },
    {
      id: 1,
      url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
      Name: "Mahafujul Haque",
      Year_of_Experience: "15 Years",
      Address: "Kalyani",
      specialization: "Orthopedics",
    },
    {
      id: 1,
      url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
      Name: "Mahafujul Haque",
      Year_of_Experience: "15 Years",
      Address: "Kalyani",
      specialization: "Orthopedics",
    },
    {
      id: 1,
      url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
      Name: "Mahafujul Haque",
      Year_of_Experience: "15 Years",
      Address: "Kalyani",
      specialization: "Orthopedics",
    },
    {
      id: 1,
      url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
      Name: "Mahafujul Haque",
      Year_of_Experience: "15 Years",
      Address: "Kalyani",
      specialization: "Orthopedics",
    },
    {
      id: 1,
      url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
      Name: "Mahafujul Haque",
      Year_of_Experience: "15 Years",
      Address: "Kalyani",
      specialization: "Orthopedics",
    },
    {
      id: 1,
      url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
      Name: "Mahafujul Haque",
      Year_of_Experience: "15 Years",
      Address: "Kalyani",
      specialization: "Orthopedics",
    },
  ];
  return (
    <div className="mt-5">
      <DoctorList
        heading={capitalizeFirstLetter(params.cname.replace(/%20/g, " "))}
        doctorList={doctors}
      />
    </div>
  );
}

export default Search;
