import React, { ReactNode } from 'react'
import Header from '../components/pages/dashboard/Header/Header'
import DashboardProvider from '../core/providers/dashboard-provider'
import { getDailyData } from '../actions'
// import { getDailyData } from '../actions'

const layout = async ({ children }: { children: ReactNode }) => {

    //? This is the test data (Back-End had some bugs and My Request was not working)
    // const Response: HolyResponse = useTestData()

    // const foundedMediaEntry = Response?.data?.informationSentences?.find((item) => item?.information?.value == "Media")
    // const media = await getMedia(String(foundedMediaEntry?.value))

    //* Fetch Daily Data from Server
    const Response = await getDailyData()


    return (
        <DashboardProvider response={Response}>
            <Header />
            {children}
        </DashboardProvider>
    )
}

export default layout