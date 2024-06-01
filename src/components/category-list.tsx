"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

function CategoryList() {
  const params = usePathname();
  const category = params.split("/")[2];

  const categoryList = [
    {
      Name: "Dermatologist",
      url: "/skin.png",
    },
    {
      Name: "Allergist",
      url: "/allergy.png",
    },
    {
      Name: "Gastroenterologist",
      url: "/Gastroenterologist.png",
    },
    {
      Name: "Neurologist",
      url: "/neurologist.png",
    },
    {
      Name: "Cardiologist",
      url: "/cardiologist.png",
    },
    {
      Name: "Gynecologist",
      url: "/gynecologist.png",
    },
    {
      Name: "Pediatrician",
      url: "/pediatrician.png",
    },
    {
      Name: "Hepatologist",
      url: "/hepatologist.png",
    },
    {
      Name: "Osteopathic",
      url: "/osteopathic_.png",
    },
    {
      Name: "Endocrinologist",
      url: "/endocrinologist.png",
    },
    {
      Name: "Pulmonologist",
      url: "/pulmonologist.png",
    },
    {
      Name: "Internal Medicine",
      url: "/internal_medicine.png",
    },
    {
      Name: "Common Cold",
      url: "/common_cold.png",
    },
    {
      Name: "Phlebologist",
      url: "/phlebologist.png",
    },
    {
      Name: "Osteoarthritis",
      url: "/osteoarthritis.png",
    },
    {
      Name: "Rheumatologists",
      url: "/rheumatologists.png",
    },
    {
      Name: "Otolaryngologist",
      url: "/otolaryngologist.png",
    },
  ];

  return (
    <div className="mt-5 flex flex-col">
      <ul className="">
        {categoryList.map((item, index) => (
          <li key={index} className="cursor-pointer">
            <Link
              href={"/search/" + item?.Name}
              className={`p-2 flex gap-2
                            text-[14px]
                            text-blue-600
                            items-center
                            rounded-md cursor-pointer w-full
                            ${category == item.Name && "bg-blue-100"}
                            `}
            >
              <Image src={item?.url} alt="icon" width={25} height={25} />
              <label className="cursor-pointer">{item?.Name}</label>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
