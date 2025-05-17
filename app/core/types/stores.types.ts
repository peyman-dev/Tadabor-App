import { HolyDataType, MediaType } from "./types";

export interface HolyStoreType {
  currentListening: number;
  setCurrentListening: (currentListening: number) => void;

  data: HolyDataType | null;
  setData: (data: HolyDataType) => void;

  media: MediaType | null;
  setMedia: (media: MediaType) => void;

  currentTime: number;
  setCurrentTime: (currentTime: number) => void;

  isAudioPlaying: boolean; // برای صوت
  setIsAudioPlaying: (isAudioPlaying: boolean) => void;

  isVideoPlaying: boolean; // برای ویدیو
  setIsVideoPlaying: (isVideoPlaying: boolean) => void;

  startFrom: number;
  setStartFrom: (startFrom: number) => void;

  endAt: number;
  setEndAt: (endAt: number) => void;

  duration: number;
  setDuration: (duration: number) => void;

  isMuted: boolean;
  setIsMuted: (isMuted: boolean) => void;

  volumeLevel: number;
  setVolumeLevel: (volumeLevel: number) => void;

  // ویژگی‌های ویدیویی
  isFullScreen: boolean;
  setIsFullScreen: (isFullScreen: boolean) => void;

  videoQuality: '240p' | '360p' | '480p' | '720p' | '1080p' | '1440p' | '4k'; // تایپ مشخص برای کیفیت ویدیو
  setVideoQuality: (videoQuality: '240p' | '360p' | '480p' | '720p' | '1080p' | '1440p' | '4k') => void;

  // ویژگی‌های اضافی برای صوت/ویدیو
  playbackRate: number; // سرعت پخش (مثل 0.5x, 1x, 2x)
  setPlaybackRate: (playbackRate: number) => void;
}