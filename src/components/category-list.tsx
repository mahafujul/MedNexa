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
    <div className="mt-5 flex flex-col">
      <ul className="">
        {categoryList.map((item, index) => (
          <li key={index} className="cursor-pointer">
            <Link
              href={"/search/" + item?.value}
              className={`p-2 flex gap-2
                            text-[14px]
                            text-blue-600
                            items-center
                            rounded-md cursor-pointer w-full
                            ${category == item.value && "bg-blue-100"}
                            `}
            >
              <Image src={item?.url} alt="icon" width={25} height={25} />
              <label className="cursor-pointer">{item?.name}</label>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryList;
