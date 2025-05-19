"use client"
import React, { ReactNode, useEffect } from 'react'
import { useHolyStore } from '../stores/holy.store'
import { DailyDataResponseType, HolyResponse, MediaType } from '../types/types'
import { ParseThis } from '../utils'

const DashboardProvider = ({ children, response, media }: { children: ReactNode, response?: DailyDataResponseType, media?: MediaType }) => {
    //* Primary Store 
    const store = useHolyStore()

    useEffect(() => {
        // if (!!media.id) store.setMedia(media);
        // if (response.data) store.setData(response.data);

        if (response?.erroCode == 200) store.setData(ParseThis(response.data));
        
    }, [response, media])


    return (
        <>{children}</>
    )
}

export default DashboardProvider