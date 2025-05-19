"use client"
import { redirect, useRouter } from 'next/navigation'
import React from 'react'

const BackButton = ({ className }: { className?: string }) => {
  const redirector = () => redirect("/dashboard")
  
  return (
    <button onClick={redirector} className='size-8 z-50 rounded-[5px] flex items-center justify-center  !cursor-pointer bg-primary absolute left-5 top-4 text-white'>
      <svg xmlns="http://www.w3.org/2000/svg" width="19.9" height="14.8" viewBox="0 0 19.9 14.8">
        <g id="Group_63" data-name="Group 63" transform="translate(-21.6 -27.6)">
          <line id="Line_10" data-name="Line 10" x1="17" transform="translate(23.5 35)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2" />
          <line id="Line_11" data-name="Line 11" y1="6" x2="8" transform="translate(23 29)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2" />
          <path id="Path_45" data-name="Path 45" d="M8,6,0,0" transform="translate(23 35)" fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>

    </button>
  )
}

export default BackButton