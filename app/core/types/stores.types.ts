import { create } from 'zustand';
import { HolyDataType, MediaType } from './types';


// Interface for HolyStoreType
export interface HolyStoreType {
  // Current listening state
  currentListening: number;
  setCurrentListening: (currentListening: number) => void;

  // Data for holy content
  data: HolyDataType | null;
  setData: (data: HolyDataType) => void;

  // Media information
  media: MediaType | null;
  setMedia: (media: MediaType) => void;

  // Playback timing
  currentTime: number;
  setCurrentTime: (currentTime: number) => void;
  seekToTime: (time: number) => void;

  // Audio playback state
  isAudioPlaying: boolean;
  setIsAudioPlaying: (isAudioPlaying: boolean) => void;

  // Video playback state
  isVideoPlaying: boolean;
  setIsVideoPlaying: (isVideoPlaying: boolean) => void;

  // Playback range
  startFrom: number;
  setStartFrom: (startFrom: number) => void;
  endAt: number;
  setEndAt: (endAt: number) => void;

  // Duration of media
  duration: number;
  setDuration: (duration: number) => void;

  // Audio settings
  isMuted: boolean;
  setIsMuted: (isMuted: boolean) => void;
  volumeLevel: number;
  setVolumeLevel: (volumeLevel: number) => void;

  // Video settings
  isFullScreen: boolean;
  setIsFullScreen: (isFullScreen: boolean) => void;
  videoQuality: '240p' | '360p' | '480p' | '720p' | '1080p' | '1440p' | '4k';
  setVideoQuality: (
    videoQuality: '240p' | '360p' | '480p' | '720p' | '1080p' | '1440p' | '4k',
  ) => void;

  // Playback speed
  playbackRate: number;
  setPlaybackRate: (playbackRate: number) => void;

  // Seeking state
  isSeeking: boolean;
  setIsSeeking: (isSeeking: boolean) => void;

  // Audio loading state
  isAudioLoaded: boolean;
  setIsAudioLoaded: (isAudioLoaded: boolean) => void;
}

// Create Zustand store
export const useHolyStore = create<HolyStoreType>((set) => ({
  currentListening: 0,
  setCurrentListening: (currentListening: number) => set({ currentListening }),

  data: null,
  setData: (data: HolyDataType) => set({ data }),

  media: null,
  setMedia: (media: MediaType) => set({ media }),

  currentTime: 0,
  setCurrentTime: (currentTime: number) => set({ currentTime, isSeeking: false }),
  seekToTime: (time: number) => set({ currentTime: time, isSeeking: true }),

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

  volumeLevel: 1,
  setVolumeLevel: (volumeLevel: number) => set({ volumeLevel }),

  isFullScreen: false,
  setIsFullScreen: (isFullScreen: boolean) => set({ isFullScreen }),

  videoQuality: '720p',
  setVideoQuality: (
    videoQuality: '240p' | '360p' | '480p' | '720p' | '1080p' | '1440p' | '4k',
  ) => set({ videoQuality }),

  playbackRate: 1,
  setPlaybackRate: (playbackRate: number) => set({ playbackRate }),

  isSeeking: false,
  setIsSeeking: (isSeeking: boolean) => set({ isSeeking }),

  isAudioLoaded: false,
  setIsAudioLoaded: (isAudioLoaded: boolean) => set({ isAudioLoaded }),
}));