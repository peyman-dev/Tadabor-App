import { HolyDataType, MediaType } from "./types";

export interface HolyStoreType {
  currentListening: number;
  setCurrentListening: (currentListening: number) => void;

  data: HolyDataType | null;
  setData: (data: HolyDataType) => void;

  media: MediaType | null;
  setMedia: (media: MediaType) => void;
}
