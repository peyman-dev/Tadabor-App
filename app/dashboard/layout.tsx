import React, { ReactNode } from 'react'
import Header from '../components/pages/dashboard/Header/Header'
import DashboardProvider from '../core/providers/dashboard-provider'
import { HolyResponse, MediaType } from '../core/types/types'
import useTestData from '../core/hooks/useTestData'
import { getDailyData, getMedia } from '../actions'
// import { getDailyData } from '../actions'

const layout = async ({ children }: { children: ReactNode }) => {
    const Response: HolyResponse = useTestData()
    const foundedMediaEntry = Response?.data?.informationSentences?.find((item) => item?.information?.value == "Media")
    const media = await getMedia(String(foundedMediaEntry?.value))


    const data = await getDailyData()

    console.log(data)
    

    return (
        <DashboardProvider response={Response} media={media}>
            <Header />
            {children}
        </DashboardProvider>
    )
}

export default layout