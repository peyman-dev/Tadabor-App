"use client"

import BorderedButton from '@/app/components/common/buttons/bordered-button'
import ProfileIcon from '@/app/components/pages/dashboard/Main/svgs/ProfileIcon'
import React, { useState } from 'react'
import { redirect } from 'next/navigation'
import { Loader2 } from 'lucide-react'

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false)

  const handleNavigate = () => {
    setIsLoading(true);
    redirect("/auth")
  }

  return (
    <div onClick={handleNavigate} className='sm:h-[83px] rounded-[13px] sm:border sm:border-[#5DCAD9] flex cursor-pointer items-center sm:px-[15px] gap-[20px]'>
      {isLoading ? <Loader2 className='size-7 animate-spin opacity-80 text-primary' />
        : <>
          <div className='text-center md:visible md:inline-block hidden invisible space-y-1 text-xs'>
            <p className='text-[#2B2B2B]'>
             کاربر مهمان
            </p>
            {/* <p className='text-xs'>کاربر سامانه</p> */}
            <p className='text-xs'> ورود به سامانه</p>
          </div>
          <BorderedButton className='flex items-center justify-center'>
            <ProfileIcon />
          </BorderedButton>
        </>
      }
    </div>
  )
}

export default Profile