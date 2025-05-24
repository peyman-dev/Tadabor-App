'use client';

import { getMedia, generateMediaSrc } from '@/app/actions';
import useQuickInformation from '@/app/core/hooks/use-quick-information';
import { useHolyStore } from '@/app/core/stores/holy.store';
import { InformationSentence } from '@/app/core/types/types';
import { PauseIcon, PlayIcon, RotateCw, Maximize } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const VideoStream = () => {
  const {
    isVideoPlaying,
    setIsVideoPlaying,
    isFullScreen,
    setIsFullScreen,
    setIsAudioPlaying,
    playbackRate,
    data
  } = useHolyStore();

  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [rotation, setRotation] = useState<number>(0);


  const media = useQuickInformation(data?.informationSentences as InformationSentence[], "Media")

  const fetchUrl = async () => {
    const video = videoRef.current;
    if (!video) return;
    const src = await generateMediaSrc(String(media?.value));
    video.src = src;
  }
  // const src =


  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    fetchUrl()

    const handleLoadedMetadata = () => {
      setError(null);
      if (isVideoPlaying) {
        video.play().catch(() => {
          setIsVideoPlaying(false);
          setError('خطا در پخش ویدئو');
        });
      }
    };

    const handleEnded = () => {
      setIsVideoPlaying(false);
    };

    const handleError = () => {
      setIsVideoPlaying(false);
      setError('خطا در بارگذاری ویدئو');
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [media]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoPlaying) {
      setIsAudioPlaying(false);
      video.play().catch(() => {
        setIsVideoPlaying(false);
        setError('خطا در پخش ویدئو');
      });
    } else if (!isVideoPlaying && !video.paused) {
      video.pause();
    }
  }, [isVideoPlaying, setIsVideoPlaying, setIsAudioPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.playbackRate = playbackRate;
  }, [playbackRate]);

  const toggleFullScreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!isFullScreen) {
      video.requestFullscreen();
      setIsFullScreen(true);
    } else {
      document.exitFullscreen();
      setIsFullScreen(false);
    }
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  return (
    <div className="w-full relative h-[267.44px] md:h-[496px] p-3 overflow-hidden bg-[#9FE1EF] rounded-[56px]">
      <div className="size-full overflow-hidden rounded-[56px] flex items-center justify-center relative">
        {!isVideoPlaying ? (
          <div
            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
            className="size-full absolute z-70 flex items-center justify-center bg-black/40 cursor-pointer"
          >
            <button
              className={`w-[65px] h-[65px] bg-gradient-to-t absolute from-[#CDA84D] to-[#E6C472] text-white rounded-full flex items-center justify-center md:w-20 md:h-20 cursor-pointer z-60`}
            >
              {isVideoPlaying ? (
                <PauseIcon className="w-8 h-8 md:w-10 md:h-10" />
              ) : (
                <PlayIcon className="w-8 h-8 md:w-10 md:h-10" />
              )}
            </button>
          </div>
        ) : null}

        <video
          ref={videoRef}
          className="!size-full object-VideoStream"
          style={{ transform: `rotate(${rotation}deg)` }} // اعمال چرخش
          onClick={() => setIsVideoPlaying(!isVideoPlaying)}
          preload="metadata"
          onDoubleClick={toggleFullScreen}

        />

        {/* دکمه چرخش */}
        <button
          onClick={handleRotate}
          className={`w-[32px] h-[32px] bottom-6 right-6 bg-gradient-to-t absolute from-[#CDA84D] to-[#E6C472] text-white rounded-full flex items-center justify-center md:w-8 md:h-8 cursor-pointer z-1000`}
        >
          <RotateCw className="size-5" />
        </button>

        {/* دکمه تمام‌صفحه */}
        <button
          onClick={toggleFullScreen}
          className={`w-[32px] h-[32px] bottom-6 right-16 bg-gradient-to-t absolute from-[#CDA84D] to-[#E6C472] text-white rounded-full flex items-center justify-center md:w-8 md:h-8 cursor-pointer z-1000`}
        >
          <Maximize className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default VideoStream;