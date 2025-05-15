import React, { ReactNode } from 'react'

const AuthLogo = ({ content = "لوگوی سایت" }: { content?: ReactNode | any }) => {
    return <div >
        <p className='text-gray text-[25px]'>
            {content}
        </p>
    </div>
}

export default AuthLogo