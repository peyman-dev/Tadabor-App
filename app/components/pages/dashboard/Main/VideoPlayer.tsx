"use client"

import React from 'react'
import Cover from './Cover'
import ReactPlayer from 'react-player';
import AudioProgressBar from './Audio/audio-progress-bar';
const AudioPlayer = () => {
    return (
        <>
            <Cover />
            <AudioProgressBar audioSrc='https://ts16.tarafdari.com/contents/user791178/content-sound/4_695743491741013399.mp3'/>
        </>
    )
}

export default AudioPlayer