"use client";

import React, { useState, useEffect } from 'react';
import VideoStream from './Video/VideoStream';
import { useHolyStore } from '@/app/core/stores/holy.store';
import AudioPlayer from './Audio/AudioPlayer';
import { generateMediaSrc } from '@/app/actions';

const MediaSection = () => {
  const { data } = useHolyStore();
  const [mediaSrc, setMediaSrc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMediaPath = async () => {
      if (!data?.audio?.idmedia) {
        setError('No media ID available');
        return;
      }

      try {
        const url = await generateMediaSrc(String(data.audio.idmedia));
        console.log(url)
        if (url) {
          setMediaSrc(url);
        } else {
          setError('Failed to load media source');
        }
      } catch (err) {
        setError('Error fetching media source');
        console.error(err);
      }
    };

    fetchMediaPath();
  }, [data?.audio?.idmedia]);

  return (
    <div className="md:w-1/2">
      <VideoStream />
      {mediaSrc ? (
        <AudioPlayer src={mediaSrc} />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p>درحال بارگذاری ...</p>
      )}
    </div>
  );
};

export default MediaSection;