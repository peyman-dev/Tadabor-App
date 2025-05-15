import React, { ReactNode } from 'react'
import Header from '../components/pages/dashboard/Header/Header'

const layout = ({ children }: { children: ReactNode }) => {
    return (

        <>
            <Header />
            {children}
        </>
    )
}

export default layout