"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useEffect, useState } from 'react'

const SignInLink = () => {
    const path = usePathname()
    const [isRegister, setIsRegister] = useState(false)

    useEffect(() => {
        if (path.includes("register")) setIsRegister(true); else setIsRegister(false);
    }, [path])

    const RenderContent = useCallback(() => {
        return isRegister ? (
            <div className='text-gray text-[15px] flex items-center gap-1'>
                <p>
                    قبلا ثبت نام کرده اید؟
                </p>
                <Link className='underline text-[#4C8BEA]' href={"/auth/login"}>
                    وارد شوید
                </Link>
            </div>
        ) : <div className='text-gray text-[15px] flex items-center gap-1'>
            <p>
                ثبت نام نکرده اید؟
            </p>
            <Link className='underline text-[#4C8BEA]' href={"/auth/register"}>
                ثبت نام
            </Link>
        </div>

    }, [isRegister, path])

    return <RenderContent />
}

export default SignInLink