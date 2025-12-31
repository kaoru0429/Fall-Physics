import { create } from 'zustand';

interface ChapterState {
  completedChapters: string[];
  currentChapter: string | null;
  completeChapter: (slug: string) => void;
  setCurrentChapter: (slug: string) => void;
}

export const useChapterStore = create<ChapterState>((set) => ({
  completedChapters: [],
  currentChapter: null,
  completeChapter: (slug) =>
    set((state) => ({
      completedChapters: [...state.completedChapters, slug],
    })),
  setCurrentChapter: (slug) => set({ currentChapter: slug }),
}));
