"use client"
import FooterHolder from '@/app/components/svgs/footer-holder'
import React from 'react'

const VerseFooter = ({ content }: { content: any }) => {
    return (
        // <div>VerseFooter</div>
        <>
            <FooterHolder className='absolute !left-0 -bottom-6 !right-0 !mx-auto' />
            <div className='absolute flex-col  flex items-center justify-center !left-0 -bottom-1.5 gap-1 !right-0 !mx-auto' >
                {/* {content || "Test message"} */}
                <p className='text-sm'>
                جلد4  (حزب مفصل)
                </p>
                <p className="text-xs">
                گروه تحقیقاتی تدبرّ درکلام وحـــــــی
                </p>
            </div>
        </>
    )
}

export default VerseFooter