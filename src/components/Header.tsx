"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import axios from 'axios';
import { useCookies } from 'next-client-cookies';
import { toast } from "sonner"
import Router from 'next/router'

function Header() {
    const cookies = useCookies();
    const cookie = cookies.get('token');

    async function onClickSignOut(){
        try{
            const response = await axios.post('/api/logout');
            toast(response.data.message, {
                action: {
                  label: "Undo",
                  onClick: () => console.log("Undo"),
                },
            })
            Router.reload();
        }catch(err){
            console.log(err);
        }
    }

    const Menu = [
        {
            id: 1,
            name: "Home",
            path: '/'
        },
        {
            id: 2,
            name: "Explore",
            path: '/explore'
        },
        {
            id: 3,
            name: "Contact Us",
            path: '/contact-us'
        }
    ]
    if(!cookie){
        return (
            <div className='flex items-center justify-between p-4 shadow-sm'>
                <div className='flex items-center gap-10'>
                    <Image src="/logo.svg" alt='logo'
                        width={180} height={80}
                        />
                    <ul className='md:flex gap-8 hidden'>
                        {Menu.map((item, index)=>(
                            <Link key={index} href={item.path}>
                                <li className='hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out'>{item.name}</li>
                            </Link>
                        ))}
                    </ul>
                </div>
                <Button asChild>
                    <Link href="/login_signup">Get Started</Link>
                </Button>
            </div>
        )
    }

    return (
        <div className='flex items-center justify-between p-4 shadow-sm'>
            <div className='flex items-center gap-10'>
                <Image src="/logo.svg" alt='logo'
                    width={180} height={80}
                    />
                <ul className='md:flex gap-8 hidden'>
                    {Menu.map((item, index)=>(
                        <Link key={index} href={item.path}>
                            <li className='hover:text-primary cursor-pointer hover:scale-105 transition-all ease-in-out'>{item.name}</li>
                        </Link>
                    ))}
                </ul>
            </div>
            <Button asChild>
                <Link href="/">Sign out</Link>
            </Button>
        </div>
    )
}

export default Header