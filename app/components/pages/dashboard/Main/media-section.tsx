"use client"

import React from 'react'
import VideoStream from './Video/VideoStream'
import { useHolyStore } from '@/app/core/stores/holy.store';
import AudioPlayer from './Audio/AudioPlayer';
const MediaSection = () => {
    const { media } = useHolyStore()

    return (
        <>
            <VideoStream />
            <AudioPlayer src='' />
        </>
    )
}

export default MediaSection