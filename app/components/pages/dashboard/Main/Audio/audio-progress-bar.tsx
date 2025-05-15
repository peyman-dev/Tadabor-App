'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Play, Pause, PauseIcon, PlayIcon, Forward } from 'lucide-react';

interface AudioProgressBarProps {
    audioSrc: string;
    primaryColor?: string;
    backgroundColor?: string;
    height?: number;
}

const AudioProgressBar: React.FC<AudioProgressBarProps> = ({
    audioSrc,
    primaryColor = '#02BAD4',
    backgroundColor = '#E5E7EB',
    height = 12,
}) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const controls = useAnimation();

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const updateProgress = () => {
            const currentTime = audio.currentTime;
            const duration = audio.duration;
            setCurrentTime(currentTime);
            setProgress((currentTime / duration) * 100);
        };

        const handleLoadedMetadata = () => {
            setDuration(audio.duration);
        };

        const handleEnded = () => {
            setIsPlaying(false);
            setProgress(0);
            setCurrentTime(0);
        };

        audio.addEventListener('timeupdate', updateProgress);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', updateProgress);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
        const audio = audioRef.current;
        if (!audio) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const newTime = (clickX / width) * audio.duration;
        audio.currentTime = newTime;
        setCurrentTime(newTime);
        setProgress((newTime / audio.duration) * 100);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex items-center justify-center gap-8 flex-col">
            <div className="flex flex-col gap-2 w-full max-w-md" dir='ltr'>
                <audio ref={audioRef} src={audioSrc} />
                <div className="flex items-center gap-3">

                    <div
                        className="flex-1 relative cursor-pointer"
                        onClick={handleBarClick}
                        style={{ height }}
                    >
                        <div
                            className="w-full absolute top-0 rounded-full"
                            style={{ backgroundColor, height }}
                        />
                        <motion.div
                            className="absolute top-0 rounded-full !h-full bottom-0 my-auto"
                            style={{ backgroundColor: primaryColor }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: 'tween', ease: 'linear' }}
                        />
                        <motion.div
                            className='absolute size-6 top-0 bottom-0 my-auto rounded-full bg-black'
                            animate={{ left: `${progress - 2}%` }}
                            style={{ background: primaryColor }}
                            transition={{ type: 'tween', ease: 'linear' }}
                        >
                        </motion.div>
                    </div>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                </div>
            </div>
            <div className='flex items-center **:bg-[#E6C472] text-white gap-[25px] **:cursor-pointer **:rounded-full **:flex **:items-center **:justify-center **:size-[57px]'>
                <button>

                </button>
                <button
                    className='!size-20 '
                    onClick={togglePlay}
                >
                    {isPlaying ? <PauseIcon /> : <PlayIcon />}
                </button>
                <button>
                    <Forward />
                    {/* Forward */}
                </button>
            </div>
        </div>
    );
};

export default AudioProgressBar;