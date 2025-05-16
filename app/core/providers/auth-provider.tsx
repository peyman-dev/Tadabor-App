"use client"
import { redirect, usePathname } from 'next/navigation'
import React, { ReactNode } from 'react'

const AuthenticationProvider = ({ children }: { children: ReactNode }) => {
    const path = usePathname()

    
    const handleAuthorization = () => {
        // if (typeof window == "undefined") return;
        
        // const localData = localStorage?.getItem("accountInfo")
        // if (!localData && !path.startsWith("/auth")) redirect('/auth/login');
    }

    handleAuthorization()


    return (
        <>
            {children}
        </>
    )

}

export default AuthenticationProvider