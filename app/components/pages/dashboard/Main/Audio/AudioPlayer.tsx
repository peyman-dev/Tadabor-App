'use client';

import React, { useEffect, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  PlayIcon,
  PauseIcon,
  FastForward,
  VolumeOff,
  Volume1,
  Volume2,
} from 'lucide-react';
import { useHolyStore } from '@/app/core/stores/holy.store';

interface AudioPlayerProps {
  src: string;
  primaryColor?: string;
  backgroundColor?: string;
  height?: number;
  isDisabled?: boolean;
}

const AudioPlayer = ({
  src,
  primaryColor = '#02BAD4',
  backgroundColor = '#E5E7EB',
  height = 12,
  isDisabled = false,
}: AudioPlayerProps) => {
  const {
    isAudioPlaying,
    setIsAudioPlaying,
    setIsVideoPlaying,
    setCurrentTime,
    currentTime,
    duration,
    setDuration,
    setIsMuted,
    setVolumeLevel,
    volumeLevel,
    playbackRate,
    setPlaybackRate,
  } = useHolyStore();

  const audioRef = useRef<HTMLAudioElement>(null);

  const progress =
    duration && !isNaN(duration) && !isNaN(currentTime) && currentTime >= 0 && duration > 0
      ? Math.min(Math.max((currentTime / duration) * 100, 0), 100)
      : 0;

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsAudioPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [setCurrentTime, setDuration, setIsAudioPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isAudioPlaying) {
      setIsVideoPlaying(false);
      audio.play().catch((error) => console.error('Audio playback failed:', error));
    } else {
      audio.pause();
    }
  }, [isAudioPlaying, setIsVideoPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volumeLevel === 0 ? 0 : volumeLevel === 1 ? 0.5 : 1;
    audio.muted = volumeLevel === 0;
  }, [volumeLevel]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.playbackRate = playbackRate;
  }, [playbackRate]);

  const togglePlay = useCallback(() => {
    setIsAudioPlaying(!isAudioPlaying);
  }, [isAudioPlaying, setIsAudioPlaying]);

  const handleVolumeToggle = useCallback(() => {
    const nextLevel = (volumeLevel + 1) % 3;
    setVolumeLevel(nextLevel);
    setIsMuted(nextLevel === 0);
  }, [volumeLevel, setVolumeLevel, setIsMuted]);

  const handleBarClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isDisabled || !duration || isNaN(duration) || duration <= 0) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const wanting = e.clientX - rect.left;
      const width = rect.width;
      if (width <= 0) return;
      const newTime = (wanting / width) * duration;
      if (isNaN(newTime) || !isFinite(newTime)) return;
      setCurrentTime(newTime);
      if (audioRef.current) {
        audioRef.current.currentTime = newTime;
      }
    },
    [isDisabled, duration, setCurrentTime]
  );

  const skipForward = useCallback(() => {
    if (isDisabled || !duration || isNaN(duration)) return;
    const newTime = Math.min(currentTime + 10, duration);
    if (isNaN(newTime) || !isFinite(newTime)) return;
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  }, [isDisabled, currentTime, duration, setCurrentTime]);

  const skipBackward = useCallback(() => {
    if (isDisabled) return;
    const newTime = Math.max(currentTime - 10, 0);
    if (isNaN(newTime) || !isFinite(newTime)) return;
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  }, [isDisabled, currentTime, setCurrentTime]);

  const formatTime = useCallback((seconds: number) => {
    if (isNaN(seconds) || !isFinite(seconds) || seconds < 0) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60)
      .toString()
      .padStart(2, '0');
    return `${mins}:${secs}`;
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-8 w-full">
      <audio ref={audioRef} src={src} style={{ display: 'none' }} />

      <div className="flex flex-col gap-2 w-full max-w-md" dir="ltr">
        <div
          className={`flex-1 relative ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={handleBarClick}
          style={{ height }}
        >
          <div
            className="w-full absolute top-0 rounded-full"
            style={{ backgroundColor, height }}
          />
          <motion.div
            className="absolute top-0 rounded-full h-full"
            style={{ backgroundColor: primaryColor }}
            animate={{ width: `${progress}%` }}
            transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
          />
          <motion.div
            className="absolute w-6 h-6 top-0 bottom-0 my-auto rounded-full"
            style={{ background: primaryColor }}
            animate={{ left: `${progress}%`, x: '-50%' }}
            transition={{ type: 'tween', ease: 'linear', duration: 0.1 }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>
      <div className="relative max-w-max flex items-center justify-center">
        <button
          className={`absolute -right-18 w-8 h-8 bg-transparent z-10 text-[#CDA84D] ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
          onClick={handleVolumeToggle}
          disabled={isDisabled}
        >
          {volumeLevel === 0 && <VolumeOff className="fill-white w-5 h-5 md:w-7 md:h-7" />}
          {volumeLevel === 1 && <Volume1 className="fill-white w-5 h-5 md:w-7 md:h-7" />}
          {volumeLevel === 2 && <Volume2 className="fill-white w-5 h-5 md:w-7 md:h-7" />}
        </button>
        <div className="flex items-center justify-center w-full gap-5 md:gap-[25px]">
          <button
            className={`w-[45px] h-[45px] bg-gradient-to-t from-[#CDA84D] to-[#E6C472] text-white rounded-full flex items-center justify-center md:w-[57px] md:h-[57px] ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={skipForward}
            disabled={isDisabled}
          >
            <FastForward className="fill-white w-5 h-5 md:w-7 md:h-7" />
          </button>
          <button
            className={`w-[65px] h-[65px] bg-gradient-to-t from-[#CDA84D] to-[#E6C472] text-white rounded-full flex items-center justify-center md:w-20 md:h-20 ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={togglePlay}
            disabled={isDisabled}
          >
            {isAudioPlaying ? (
              <PauseIcon className="w-8 h-8 md:w-10 md:h-10" />
            ) : (
              <PlayIcon className="w-8 h-8 md:w-10 md:h-10" />
            )}
          </button>
          <button
            className={`w-[45px] h-[45px] bg-gradient-to-t from-[#CDA84D] rotate-180 to-[#E6C472] text-white rounded-full flex items-center justify-center md:w-[57px] md:h-[57px] ${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            onClick={skipBackward}
            disabled={isDisabled}
          >
            <FastForward className="fill-white w-5 h-5 md:w-7 md:h-7" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;