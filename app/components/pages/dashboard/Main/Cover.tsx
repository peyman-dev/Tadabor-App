'use client';

import { mediaStreamUrl } from '@/app/actions';
import { useHolyStore } from '@/app/core/stores/holy.store';
import { volume } from '@/app/core/utils';
import React, { useEffect, useRef, useCallback, useState } from 'react';

const Cover = () => {
  const {
    media,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    setDuration,
    isMuted,
    volumeLevel,
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

    if (isPlaying && video.duration) {
      rafRef.current = requestAnimationFrame(updateProgress);
    }
  }, [setCurrentTime, isPlaying]);

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
      if (isPlaying) {
        video.play().catch(() => {
          setIsPlaying(false);
          setError('خطا در پخش ویدئو');
        });
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleError = () => {
      setIsPlaying(false);
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
  }, [media?.id, setDuration, setIsPlaying, isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying && video.paused && !error) {
      video.play().catch(() => {
        setIsPlaying(false);
        setError('خطا در پخش ویدئو');
      });
    } else if (!isPlaying && !video.paused) {
      video.pause();
    }
  }, [isPlaying, setIsPlaying, error]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || isPlaying) return;

    if (Math.abs(video.currentTime - currentTime) < 0.1) return;

    if (isNaN(currentTime) || !isFinite(currentTime)) {
      return;
    }

    video.currentTime = currentTime;
  }, [currentTime]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      rafRef.current = requestAnimationFrame(updateProgress);
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [isPlaying, updateProgress]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isMuted) {
      video.volume = 0;
    } else {
      const vol = volume[volumeLevel as keyof typeof volume]?.volume ?? 1;
      video.volume = vol;
    }
  }, [volumeLevel, isMuted]);

  return (
    <div className="w-full h-[267.44px] md:h-[496px] p-5 overflow-hidden bg-[#9FE1EF] rounded-[50px]">
      <div className="size-full overflow-hidden rounded-[50px]">
        {media?.id ? (
          error ? (
            <div className="size-full flex items-center justify-center text-red-500">
              <p>{error}</p>
            </div>
          ) : (
            <video
              ref={videoRef}
              muted={isMuted}
              className="!size-full object-cover"
              preload="metadata"
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

export default Cover;