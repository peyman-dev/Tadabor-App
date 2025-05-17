import { create } from "zustand";
import { HolyDataType, MediaType } from "../types/types";
import { HolyStoreType } from "../types/stores.types";

export const useHolyStore = create<HolyStoreType>((set) => ({
  currentListening: 0,
  setCurrentListening: (currentListening: number) => set({ currentListening }),

  data: null,
  setData: (data: HolyDataType) => set({ data }),

  media: null,
  setMedia: (media: MediaType) => set({ media }),

  currentTime: 0,
  setCurrentTime: (currentTime: number) => set({ currentTime }),

  isAudioPlaying: false,
  setIsAudioPlaying: (isAudioPlaying: boolean) => set({ isAudioPlaying }),

  isVideoPlaying: false,
  setIsVideoPlaying: (isVideoPlaying: boolean) => set({ isVideoPlaying }),

  startFrom: 0,
  setStartFrom: (startFrom: number) => set({ startFrom }),

  endAt: 0,
  setEndAt: (endAt: number) => set({ endAt }),

  duration: 0,
  setDuration: (duration: number) => set({ duration }),

  isMuted: false,
  setIsMuted: (isMuted: boolean) => set({ isMuted }),

  volumeLevel: 1, // مقدار پیش‌فرض برای سطح صدا (0 تا 1)
  setVolumeLevel: (volumeLevel: number) => set({ volumeLevel }),

  isFullScreen: false,
  setIsFullScreen: (isFullScreen: boolean) => set({ isFullScreen }),

  videoQuality: "720p", // مقدار پیش‌فرض برای کیفیت ویدیو
  setVideoQuality: (videoQuality: "240p" | "360p" | "480p" | "720p" | "1080p" | "1440p" | "4k") =>
    set({ videoQuality }),

  playbackRate: 1, // مقدار پیش‌فرض برای سرعت پخش (1x)
  setPlaybackRate: (playbackRate: number) => set({ playbackRate }),
}));