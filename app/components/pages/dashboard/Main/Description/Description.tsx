import React from 'react'
import DescriptionTitle from './description-title'

const Description = () => {
  return (

    <section className='max-w-[580px] rounded-[13px] w-full bg-[#D5F8FF] p-2  border border-[#4C8BEA] relative'>
      <DescriptionTitle />
      <div className='size-full !pt-[51px]     *:max-w-[260px] pb-[51px] !mx-auto min-h-[265px] rounded-[13px] bg-gradient-to-t border border-[#4C8BEA]/50 from-[#02BAD4] to-[#A4E3F0] !flex !items-center !justify-center text-center'>
      </div>
    </section>
  )
}

export default Description