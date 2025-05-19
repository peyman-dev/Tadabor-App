"use client"

import React from 'react'
import VideoStream from './Video/VideoStream'
import { useHolyStore } from '@/app/core/stores/holy.store';
import AudioPlayer from './Audio/AudioPlayer';
import { generateMediaSrc } from '@/app/actions';
const MediaSection = () => {
    const { media, data } = useHolyStore()




    return (
        <div className='md:w-1/2'>
            <VideoStream />
            <AudioPlayer src={generateMediaSrc(String(data?.audio.id))} />
        </div>
    )
}

export default MediaSection