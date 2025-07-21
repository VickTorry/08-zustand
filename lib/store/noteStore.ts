import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { NoteFormValues } from '@/types/note'; // ✅ Use your shared type

export const initialDraft: NoteFormValues = {
  title: '',
  content: '',
  tag: 'Todo',
};

interface NoteStore {
  draft: NoteFormValues;
  setDraft: (note: Partial<NoteFormValues>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) =>
        set((state) => ({
          draft: { ...state.draft, ...note },
        })),
      clearDraft: () => set({ draft: initialDraft }),
    }),
    {
      name: 'note-draft',
    }
  )
);
