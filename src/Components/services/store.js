import { create } from "zustand";

const useNoteStore = create((set) => ({
  notes: [],
  archive: [],
  bin: [],

  addNotes: (note) =>
    set((state) => ({
      notes: [...state.notes, note],
    })),

  archiveNote: (id) =>
    set((state) => {
      const noteToArchive = state.notes.find((note) => note.id === id);
      return {
        notes: state.notes.filter((note) => note.id !== id),
        archive: [...state.archive, noteToArchive],
      };
    }),

  unarchiveNote: (id) =>
    set((state) => {
      const noteToUnarchive = state.archive.find((note) => note.id === id);
      return {
        archive: state.archive.filter((note) => note.id !== id),
        notes: [...state.notes, noteToUnarchive],
      };
    }),
  toBin: (id) =>
    set((state) => {
      const notetoBin = state.notes.find((item) => item.id === id);

      return {
        notes: state.notes.filter((item) => item.id !== id),
        bin: [...state.bin, notetoBin],
      };
    }),

  restoreNote: (id) =>
    set((state) => {
      const bintoNote = state.bin.find((item) => item.id === id);
      return {
        bin: state.bin.filter((item) => item.id !== id),
        notes: [...state.notes, bintoNote],
      };
    }),
  deleteNote: (id) =>
    set((state) => ({
      bin: state.bin.filter((note) => note.id !== id),
    })),
}));

export default useNoteStore;
