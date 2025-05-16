import React from 'react'
import VerseNameHolder from './verse-name-holder'
import VerseContent from './verse-content'
import FooterHolder from '@/app/components/svgs/footer-holder'
import VerseFooter from './verse-footer'
// import { dataObject } from '@/app/core/db/data'
// import { HolyType } from '@/app/core/types/types'

const VerseSection = () => {
    // const holy = dataObject

    // console.log(holy)
    
    return (
        <section className='max-w-[580px] rounded-[13px] w-full bg-[#D5F8FF] p-2  border border-[#4C8BEA] relative'>
            <VerseNameHolder  />
            <VerseContent />
            <VerseFooter content="" />
        </section>
    )
}

export default VerseSection