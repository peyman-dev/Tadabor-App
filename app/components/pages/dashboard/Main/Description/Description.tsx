"use client"
import React from 'react'
import DescriptionTitle from './description-title'
import { useHolyStore } from '@/app/core/stores/holy.store'
import { HolyDataType } from '@/app/core/types/types'

const Description = () => {
  const { data } = useHolyStore()
  const dataDesc = data?.informationSentences[3].value

  console.log(data?.informationSentences[3])


  return (

    <section className='max-w-[580px] rounded-[13px] w-full bg-[#D5F8FF] p-2  border border-[#4C8BEA] relative'>
      <DescriptionTitle />
      <div className='size-full !pt-[51px]     *:max-w-[260px] pb-[51px] !mx-auto min-h-[265px] rounded-[13px] bg-gradient-to-t border border-[#4C8BEA]/50 from-[#02BAD4] to-[#A4E3F0] !flex !items-center !justify-center text-center'>
      {dataDesc}
      </div>
    </section>
  )
}

export default Description