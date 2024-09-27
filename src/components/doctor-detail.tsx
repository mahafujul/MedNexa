import { GraduationCap, MapPin, IndianRupee } from "lucide-react";
import Image from "next/image";
import React from "react";
import BookAppointment from "./book-appointment";

function DoctorDetail({ doctor }: any) {
  const socialMediaList = [
    {
      id: 1,
      icon: "/youtube.png",
      url: "",
    },
    {
      id: 2,
      icon: "/linkedin.png",
      url: "",
    },
    {
      id: 3,
      icon: "/twitter.png",
      url: "",
    },
    {
      id: 4,
      icon: "/facebook.png",
      url: "",
    },
  ];
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 border-[1px] p-5 mt-5 rounded-lg">
        {/* Doctor Image  */}
        <div>
          <Image
            src={doctor.url}
            width={200}
            height={200}
            alt="doctor-image"
            className="rounded-lg w-full h-[280px] object-cover"
          />
        </div>
        {/* Doctor Info  */}
        <div className="col-span-2 mt-5 flex md:px-10 flex-col gap-3 items-baseline">
          <h2 className="font-bold text-2xl">{doctor.Name}</h2>
          <h2 className="flex gap-2 text-gray-500 text-md">
            <GraduationCap />
            <span>{doctor.Year_of_Experience} years of Experince</span>
          </h2>
          <h2 className="text-md flex gap-2 text-gray-500">
            <MapPin />
            <span>{doctor.Address}</span>
          </h2>
          <h2 className="text-md flex gap-2 text-gray-500">
            <IndianRupee />
            <span>{`${doctor.feePerCunsultation} Consultation fee at clinic`}</span>
          </h2>
          <div className="flex gap-3">
            <h2
              className="text-[10px] bg-blue-100 p-1 rounded-full
                            px-2 text-primary"
            >
              {doctor.specialization}
            </h2>
            <h2
              className="text-[10px] bg-blue-100 p-1 rounded-full
                            px-2 text-primary"
            >
              {doctor.degrees}
            </h2>
          </div>

          <div className="flex gap-3">
            {socialMediaList.map((item, index) => (
              <Image
                src={item.icon}
                key={index}
                width={30}
                height={30}
                alt={"social media icons"}
              />
            ))}
          </div>
          <BookAppointment doctor={doctor} />
        </div>
      </div>
      {/* About Doctor  */}
      <div className="p-3 border-[1px] rounded-lg mt-5">
        <h2 className="font-bold text-[20px]">About Me</h2>
        <p className="text-gray-500 tracking-wide mt-2">{doctor.About}</p>
      </div>
    </>
  );
}

export default DoctorDetail;
