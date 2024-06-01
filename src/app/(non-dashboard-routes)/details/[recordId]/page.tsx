"use client";
import React from "react";
import DoctorDetail from "@/components/doctor-detail";
import DoctorSuggestionList from "@/components/doctor-suggestion-list";
function Details({ params }: any) {
  const doctor = {
    url: "/beautiful-young-female-doctor-looking-camera-office.jpg",
    Name: "Mahafujul Haque",
    Year_of_Experience: "15",
    Address: "Jalangi, Murshidabad, West Bengal",
    degrees: "MBBS",
    feePerCunsultation: "700",
    specialization: "Dermatologist",
    About:
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, comes from a line in section 1.10.32.",
  };

  return (
    <div className="p-5 md:px-10">
      <h2 className="font-bold text-[22px]">Details</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 ">
        {/* Doctor Detail  */}
        <div className=" col-span-3">
          {doctor && <DoctorDetail doctor={doctor} />}
        </div>
        {/* Doctor Suggestion  */}
        <div>
          <DoctorSuggestionList />
        </div>
      </div>
    </div>
  );
}

export default Details;
