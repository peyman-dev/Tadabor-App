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
}));
