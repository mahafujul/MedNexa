"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function DoctorSuggestionList() {
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
  return (
    <div className=" p-4 border-[1px] mt-5 md:ml-5 rounded-lg ">
      <h2 className="mb-3 font-bold">Suggestions</h2>

      {doctorList.map((doctor, index) => (
        <Link
          key={index}
          href={"/details/" + doctor.id}
          className=" mb-4 p-3 shadow-sm w-full 
            cursor-pointer hover:bg-slate-100
            rounded-lg flex items-center gap-3"
        >
          <Image
            src={doctor.url}
            width={70}
            height={70}
            className="w-[70px] h-[70px] rounded-full object-cover"
            alt="doctor profile photo"
          />
          <div className="mt-3 flex-col flex gap-1 items-baseline">
            <h2
              className="text-[10px] bg-blue-100 p-1 rounded-full px-2
                    text-primary"
            >
              {doctor.Name}
            </h2>
            <h2 className="font-medium text-sm">{doctor.specialization}</h2>
            <h2 className="text-primary text-xs flex gap-2">
              {doctor.Year_of_Experience}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default DoctorSuggestionList;
