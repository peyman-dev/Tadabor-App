"use client"
import React, { ReactNode, useEffect } from 'react'
import { useHolyStore } from '../stores/holy.store'
import { HolyResponse, MediaType } from '../types/types'

const DashboardProvider = ({ children, response, media }: { children: ReactNode, response: HolyResponse, media: MediaType }) => {
    const store = useHolyStore()


    useEffect(() => {
        if (!!media.id) store.setMedia(media);
        if (response.data) store.setData(response.data);
    }, [response, media])


    return (
        <>{children}</>
    )
}

export default DashboardProvider