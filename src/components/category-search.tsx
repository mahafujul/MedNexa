"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

function CategorySearch() {
  const categoryList = [
    {
      name: "Dermatologist",
      value: "dermatologist",
      url: "/skin.png",
    },
    {
      name: "Allergist",
      value: "allergist",
      url: "/allergy.png",
    },
    {
      name: "Gastroenterologist",
      value: "gastroenterologist",
      url: "/Gastroenterologist.png",
    },
    {
      name: "Neurologist",
      value: "neurologist",
      url: "/neurologist.png",
    },
    {
      name: "Cardiologist",
      value: "cardiologist",
      url: "/cardiologist.png",
    },
    {
      name: "Gynecologist",
      value: "gynecologist",
      url: "/gynecologist.png",
    },
    {
      name: "Pediatrician",
      value: "pediatrician",
      url: "/pediatrician.png",
    },
    {
      name: "Hepatologist",
      value: "hepatologist",
      url: "/hepatologist.png",
    },
    {
      name: "Osteopathic",
      value: "osteopathic",
      url: "/osteopathic_.png",
    },
    {
      name: "Endocrinologist",
      value: "endocrinologist",
      url: "/endocrinologist.png",
    },
    {
      name: "Pulmonologist",
      value: "pulmonologist",
      url: "/pulmonologist.png",
    },
    {
      name: "Internal Medicine",
      value: "internal medicine",
      url: "/internal_medicine.png",
    },
    {
      name: "Common Cold",
      value: "common cold",
      url: "/common_cold.png",
    },
    {
      name: "Phlebologist",
      value: "phlebologist",
      url: "/phlebologist.png",
    },
    {
      name: "Osteoarthritis",
      value: "osteoarthritis",
      url: "/osteoarthritis.png",
    },
    {
      name: "Rheumatologists",
      value: "rheumatologists",
      url: "/rheumatologists.png",
    },
    {
      name: "Otolaryngologist",
      value: "otolaryngologist",
      url: "/otolaryngologist.png",
    },
  ];

  return (
    <div className="mb-10 items-center px-5 flex flex-col gap-3">
      <h2 className="font-bold text-4xl tracking-wide">
        Search <span className="text-primary">Doctors</span>
      </h2>
      <h2 className="text-gray-500 text-xl">
        Search Your Doctor and Book Appointment in one click
      </h2>

      {/* <div className="flex w-full mt-3 max-w-sm items-center space-x-2">
        <Input type="text" placeholder="Search..." />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div> */}

      {/* Display List of Category  */}
      <div className="grid grid-cols-3 mt-5 md:grid-cols-4 lg:grid-cols-6 ">
        {categoryList.length > 0
          ? categoryList.map(
              (item, index) =>
                index < 6 && (
                  <Link
                    href={"/search/" + item.value}
                    key={index}
                    className="flex 
            flex-col text-center items-center
            p-5 bg-blue-50 m-2 rounded-lg cursor-pointer
            gap-2 hover:scale-110 transition-all ease-in-out"
                  >
                    <Image src={item.url} alt="icon" width={40} height={40} />
                    <label className="text-blue-600 text-sm">{item.name}</label>
                  </Link>
                )
            )
          : [1, 2, 3, 4, 5, 6].map((item, index) => (
              <div className=" bg-slate-200 m-2 w-[130px] h-[120px] rounded-lg animate-pulse"></div>
            ))}
      </div>
    </div>
  );
}

export default CategorySearch;
