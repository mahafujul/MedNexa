"use client";
import DoctorList from "@/components/doctor-list";
// import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from "react";

function Search({ params }: any) {
  //   const [doctorList,setDoctorList]=useState([]);
  //   useEffect(()=>{
  //     console.log(params.cname);
  //     getDoctors();
  //   },[])

  //   const getDoctors=()=>{
  //     GlobalApi.getDoctorByCategory(params.cname).then(resp=>{
  //       setDoctorList(resp.data.data);
  //     })
  //   }
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
        heading={params.cname.replace(/%20/g, " ")}
        doctorList={doctorList}
      />
    </div>
  );
}

export default Search;
