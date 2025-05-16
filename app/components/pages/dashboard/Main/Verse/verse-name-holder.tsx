"use client"

import NameHolder from '@/app/components/svgs/name-holder'
import { useHolyStore } from '@/app/core/stores/holy.store'
import React from 'react'

const VerseNameHolder = () => {
  const store = useHolyStore()
  const seasonName = store.data?.sentence.seasonName


  return (
    <>
      <NameHolder className='!absolute !z-50 !left-0 !right-0 !mx-auto !-top-6' />
      <div className="flex left-0 right-0 text-center items-center justify-center absolute !z-50 -top-2.5 text-sm md:text-base">
        {seasonName}
      </div>
    </>
  )
}

export default VerseNameHolder