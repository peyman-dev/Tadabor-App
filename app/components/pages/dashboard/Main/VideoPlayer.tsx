"use client"

import React from 'react'
import VideoPlayer from './Cover'
import ReactPlayer from 'react-player';
import VideoProgressBar from './Audio/audio-progress-bar';
import { useHolyStore } from '@/app/core/stores/holy.store';
const AudioPlayer = () => {
    const { media } = useHolyStore()

    return (
        <>
            <VideoPlayer />
            <VideoProgressBar />
        </>
    )
}

export default AudioPlayer