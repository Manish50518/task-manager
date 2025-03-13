import { create } from "zustand";
import { persist } from "zustand/middleware";

const useNoteStore = create(
  persist((set) => ({
    notes: [],
    pending: [],
    completed: [],
    inProgress: [],
    bin: [],

    addNotes: (note) =>
      set((state) => {
        if (note.status === "Pending") {
          return {
            notes: [...state.notes, note],
            pending: [...state.pending, note],
          };
        } else if (note.status === "Completed") {
          return {
            notes: [...state.notes, note],
            completed: [...state.completed, note],
          };
        } else if (note.status === "In Progress") {
          return {
            notes: [...state.notes, note],
            inProgress: [...state.inProgress, note],
          };
        }
        return {
          notes: [...state.notes, note], // Default case (if status is unknown)
        };
      }),

    archiveNote: (id) =>
      set((state) => {
        const noteToArchive = state.notes.find((note) => note.id === id);
        return {
          notes: state.notes.filter((note) => note.id !== id),
          pending: [...state.pending, noteToArchive],
        };
      }),

    unarchiveNote: (id) =>
      set((state) => {
        const noteToUnarchive = state.pending.find((note) => note.id === id);
        return {
          pending: state.pending.filter((note) => note.id !== id),
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

    completedTask: (id) =>
      set((state) => {
        const tasktoCompleted = state.inProgress.find((item) => item.id === id);
        const updatedTask = { ...tasktoCompleted, status: "Completed" };
        return {
          inProgress: state.inProgress.filter((item) => item.id !== id),

          completed: [...state.completed, updatedTask],

          notes: state.notes.map((note) =>
            note.id === id ? updatedTask : note
          ),
        };
      }),

    progressTask: (id) =>
      set((state) => {
        const tasktoProgress = state.pending.find((item) => item.id === id);
        const updatedTask = { ...tasktoProgress, status: "In Progress" };

        return {
          pending: state.pending.filter((item) => item.id !== id),
          inProgress: [...state.inProgress, updatedTask],
          notes: state.notes.map((note) =>
            note.id === id ? updatedTask : note
          ),
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
    updateNote: (id, updatedData) =>
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === id ? { ...note, ...updatedData } : note
        ),
        pending: state.pending.map((note) =>
          note.id === id ? { ...note, ...updatedData } : note
        ),
        inProgress: state.inProgress.map((note) =>
          note.id === id ? { ...note, ...updatedData } : note
        ),
        completed: state.completed.map((note) =>
          note.id === id ? { ...note, ...updatedData } : note
        ),
      })),
  }))
);

export default useNoteStore;
