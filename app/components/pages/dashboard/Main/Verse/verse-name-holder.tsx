import NameHolder from '@/app/components/svgs/name-holder'
import React from 'react'

const VerseNameHolder = ({verseName}: {verseName?: string}) => {
  return (
    <>
    <NameHolder className='!absolute !z-50 !left-0 !right-0 !mx-auto !-top-6' />
    <div className="flex left-0 right-0 text-center items-center justify-center absolute !z-50 -top-3 text-sm md:text-base">
      {verseName}
    </div>
    </>
  )
}

export default VerseNameHolder