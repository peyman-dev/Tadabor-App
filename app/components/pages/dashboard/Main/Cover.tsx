"use client"
import { mediaStreamUrl } from '@/app/actions'
import { useHolyStore } from '@/app/core/stores/holy.store'
import React from 'react'

const Cover = () => {
  const { media } = useHolyStore()


  return (
    <div className='w-full h-[267.44px] md:h-[496px] p-5 overflow-hidden bg-[#9FE1EF] rounded-[50px]'>
      <div className='size-full overflow-hidden rounded-[50px]'>
        <video controls src={mediaStreamUrl(String(media?.id))} className='!size-full'></video>
      </div>
    </div>
  )
}

export default Cover