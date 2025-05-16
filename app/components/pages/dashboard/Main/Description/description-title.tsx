import NameHolder from '@/app/components/pages/dashboard/Main/svgs/name-holder'
import React from 'react'

const DescriptionTitle = ({ title = "توضیحات" }) => {
    return (
        <>
            <NameHolder className='!absolute -top-6 left-0 right-0 mx-auto !z-50' />
            <div className='absolute -top-3 flex items-center justify-center gap-1 left-0 right-0 z-60'>
                <p>
                        {title}
                </p>
            </div>
        </>
    )
}

export default DescriptionTitle