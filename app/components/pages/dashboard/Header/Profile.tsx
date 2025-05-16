import BorderedButton from '@/app/components/common/buttons/bordered-button'
import ProfileIcon from '@/app/components/pages/dashboard/Main/svgs/ProfileIcon'
import React from 'react'

const Profile = () => {
  return (
    <div className='sm:h-[83px] rounded-[13px] sm:border sm:border-[#5DCAD9] flex items-center sm:px-[15px] gap-[40px]'>
        <div className='text-center md:visible md:inline-block hidden invisible space-y-1 text-xs'>
            <p className='text-[#2B2B2B]'>
                پیمان احمدی
            </p>
            <p className='text-xs'>کاربر سامانه</p>
        </div>
        <BorderedButton className='flex items-center justify-center'>
            <ProfileIcon />
        </BorderedButton>
    </div>
  )
}

export default Profile