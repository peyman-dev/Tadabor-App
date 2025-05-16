import { createSession } from '@/app/actions'
import React, { ReactNode } from 'react'
import Cookies from 'js-cookie'

const AuthenticationProvider = async ({ children }: { children: ReactNode }) => {

    const sessionExpiration = Cookies.get("sessionExpiration");
    const currentTime = new Date().getTime();
    const hundredMinutesInMs = 100 * 60 * 1000;
    
    if (!sessionExpiration) {
        const expirationTime = currentTime + hundredMinutesInMs;
        Cookies.set("sessionExpiration", String(expirationTime), { expires: 100 / (24 * 60) });
        await createSession();
    } else {
        const expirationTime = parseInt(sessionExpiration);
        if (currentTime >= expirationTime) {
            const newExpirationTime = currentTime + hundredMinutesInMs;
            Cookies.set("sessionExpiration", String(newExpirationTime), { expires: 100 / (24 * 60) });
            await createSession();
        }
    }

    return (
        <>
            {children}
        </>
    )

}

export default AuthenticationProvider