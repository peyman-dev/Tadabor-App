'use client';

import { mediaStreamUrl } from '@/app/actions';
import { useHolyStore } from '@/app/core/stores/holy.store';
import { volume } from '@/app/core/utils';
import { PauseIcon, PlayIcon } from 'lucide-react';
import React, { useEffect, useRef, useCallback, useState } from 'react';

const VideoStream = () => {
  const {
    media,
    isVideoPlaying,
    setIsVideoPlaying,
    currentTime,
    setCurrentTime,
    setDuration,
    isFullScreen,
    setIsFullScreen,
    setIsAudioPlaying,
    playbackRate,
  } = useHolyStore();

  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const updateProgress = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    const newTime = video.currentTime;
    if (isNaN(newTime) || !isFinite(newTime)) {
      return;
    }
    setCurrentTime(newTime);

    if (isVideoPlaying && video.duration) {
      rafRef.current = requestAnimationFrame(updateProgress);
    }
  }, [setCurrentTime, isVideoPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !media?.id) return;

    const src = mediaStreamUrl(String(media.id));
    if (video.src !== src) {
      video.src = src;
      video.load();
    }

    const handleLoadedMetadata = () => {
      setDuration(video.duration || 0);
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
      setCurrentTime(0);
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
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [media?.id, setDuration, setIsVideoPlaying, isVideoPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
  
    if (isVideoPlaying) {
      // وقتی ویدیو پخش می‌شود، صوت را متوقف کنید
      setIsAudioPlaying(false);
      video.play().catch(() => {
        setIsVideoPlaying(false);
        setError('خطا در پخش ویدئو');
      });
    } else if (!isVideoPlaying && !video.paused) {
      video.pause();
    }
  }, [isVideoPlaying, setIsVideoPlaying, setIsAudioPlaying, error]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isVideoPlaying) return;

    if (Math.abs(video.currentTime - currentTime) < 0.1) return;

    if (isNaN(currentTime) || !isFinite(currentTime)) {
      return;
    }

    video.currentTime = currentTime;
  }, [currentTime, isVideoPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isVideoPlaying) {
      rafRef.current = requestAnimationFrame(updateProgress);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isVideoPlaying, updateProgress]);



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

  return (
    <div className="w-full h-[267.44px] md:h-[496px] p-5 overflow-hidden bg-[#9FE1EF] rounded-[50px]">
      <div className="size-full overflow-hidden rounded-[50px] flex items-center justify-center relative">
        {!isVideoPlaying ?
          <div
            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
            className="size-full absolute z-70 flex items-center justify-center bg-black/40 cursor-pointer">
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
          : null
        }

        {media?.id ? (
          error ? (
            <div className="size-full flex items-center justify-center text-red-500">
              <p>{error}</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              className="!size-full object-VideoStream"
              onClick={() => setIsVideoPlaying(!isVideoPlaying)}
              preload="metadata"
              onDoubleClick={toggleFullScreen}
            />
          )
        ) : (
          <div className="size-full flex items-center justify-center">
            <p>ویدیو قابل پخش نمی‌باشد!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoStream;