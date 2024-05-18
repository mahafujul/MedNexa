import React from 'react'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/options"
type Props = {}

async function Admin({}: Props) {
  const session = await getServerSession(authOptions)
  console.log(session)
  return (
    <div className='flex h-screen items-center justify-center'>
        <h1 className='text-primary text-[100px] font-bold'>Admin</h1>
    </div>
  )
}

export default Admin