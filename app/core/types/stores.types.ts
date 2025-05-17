import { HolyDataType, MediaType } from "./types";

export interface HolyStoreType {
  currentListening: number;
  setCurrentListening: (currentListening: number) => void;

  data: HolyDataType | null;
  setData: (data: HolyDataType) => void;

  media: MediaType | null;
  setMedia: (media: MediaType) => void;

  currentTime: number,
  setCurrentTime: (currentTime: number) => void;

  isPlaying: boolean,
  setIsPlaying: (isPlaying: boolean) => void;

  startFrom: number,
  setStartFrom: (startFrom: number) => void;

  endAt: number,
  setEndAt: (endAt: number) => void;

  duration: number,
  setDuration: (duration: number) => void;

  isMuted: boolean;
  setIsMuted: (bool: boolean) => void;

  volumeLevel: number,
  setVolumeLevel: (volumeLevel: number) => void;
}
