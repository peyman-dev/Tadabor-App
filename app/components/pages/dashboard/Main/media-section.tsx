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
            <AudioPlayer src='https://xx.bests-music.ir/Archive/H/Hayedeh/Hayedeh%20-%20Nashenideha/01-Delaye%20Ashegh.mp3' />
        </>
    )
}

export default MediaSection