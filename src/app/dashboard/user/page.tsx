import React from 'react'
type Props = {}

async function User({}: Props) {
  return (
    <div className='flex h-screen items-center justify-center'>
        <h1 className='text-primary text-[100px] font-bold'>User</h1>
    </div>
  )
}

export default User