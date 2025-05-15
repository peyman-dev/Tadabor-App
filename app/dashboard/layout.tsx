import React, { ReactNode } from 'react'
import Header from '../components/pages/dashboard/Header/Header'
import { getDailyData } from '../actions'

const layout = async ({ children }: { children: ReactNode }) => {
    const data = await getDailyData()
    console.log(data)

    return (

        <>
            <Header />
            {children}
        </>
    )
}

export default layout