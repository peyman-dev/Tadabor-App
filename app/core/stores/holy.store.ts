import { create } from "zustand";

export const useHolyStore= create((set) => ({
    currentListening: 0,
    setCurrentListening: (index: number) => set({ currentListening: index }),

    
    
    
}))
