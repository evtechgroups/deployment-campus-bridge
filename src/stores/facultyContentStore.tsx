import { create } from 'zustand';

interface FacultyContentStore {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export const useFacultyContent = create<FacultyContentStore>((set) => ({
  isOpen: false,
  setIsOpen: (open) => set({ isOpen: open }),
}));
