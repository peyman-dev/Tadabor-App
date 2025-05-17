import { create } from "zustand";
import { HolyDataType, MediaType } from "../types/types";
import { HolyStoreType } from "../types/stores.types";

export const useHolyStore = create<HolyStoreType>((set) => ({
  currentListening: 0,
  setCurrentListening: (index: number) => set({ currentListening: index }),

  data: null,
  setData: (data: HolyDataType) => set({ data }),

  media: null,
  setMedia: (media: MediaType) => set({ media }),

  currentTime: 0,
  setCurrentTime: (time: number) => set({ currentTime: time }),

  endAt: 0,
  setEndAt: (time: number) => set({ endAt: time }),

  isPlaying: false,
  setIsPlaying: (bool: boolean) => set({ isPlaying: bool }),

  startFrom: 0,
  setStartFrom: (time: number) => set({ startFrom: time }),

  duration: 0,
  setDuration: (time: number) => set({ duration: time }),

  isMuted: false,
  setIsMuted: (bool: boolean) => set({ isMuted: bool }),

  volumeLevel: 1,
  setVolumeLevel: (label: number) => set({ volumeLevel: label }),
  
}));