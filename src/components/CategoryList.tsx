"use client";

import React from "react";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
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
            Name: "Neurologist",
            url: "/neurologist.png",
        },
        {
            Name: "Internal Medicine",
            url: "/pngegg.png",
        },
        {
            Name: "Pediatrician",
            url: "/pngegg.png",
        },
        {
            Name: "Common Cold",
            url: "/pngegg.png",
        },
        {
            Name: "Cardiologist",
            url: "/pngegg.png",
        },
        {
            Name: "Phlebologist",
            url: "/pngegg.png",
        },
        {
            Name: "Osteoarthristis",
            url: "/pngegg.png",
        },
        {
            Name: "Rheumatologists",
            url: "/pngegg.png",
        },
        {
            Name: "Otolaryngologist",
            url: "/pngegg.png",
        },
        {
            Name: "Gynecologist",
            url: "/pngegg.png",
        },
    ]

  return (
    <div className="mt-5 flex flex-col">
        <ul className="">
            {
                categoryList.map((item, index)=>(
                    <li key={index} className="cursor-pointer">
                        <Link href={'/search/'+item?.Name}
                            className={`p-2 flex gap-2
                            text-[14px]
                            text-blue-600
                            items-center
                            rounded-md cursor-pointer w-full
                            ${category==item.Name&&'bg-blue-100'}
                            `}>
                                <Image src={item?.url}
                                alt='icon'
                                width={25}
                                height={25}/>
                                <label className="cursor-pointer">{item?.Name}</label>
                        </Link>
                    </li>
                ))
            }
        </ul>
    </div>
  );
}

export default CategoryList;