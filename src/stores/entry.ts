import type { UAgenda } from "@/types/agenda";
import type { UNote } from "@/types/note";
import { defineStore } from "pinia";

export const useEntryStore = defineStore("entry", {
  state() {
    return {
      day: new Date().toDateString(),
      agendas: {} as Record<string, UAgenda[] | undefined>,
      notes: {} as Record<string, UNote[] | undefined>,
    };
  },
  getters: {
    todayAgendas: (state) =>
      state.agendas[state.day] ? state.agendas[state.day] : ([] as UAgenda[]),
    todayNotes: (state) =>
      state.notes[state.day] ? state.notes[state.day] : ([] as UNote[]),
    allNotes: (state) => {
      const keys = Object.keys(state.notes);
      return keys.map((key) => state.notes[key]).flat() as UNote[];
    },
  },
  actions: {
    addAgenda(value: UAgenda) {
      const day = value.start.toDateString();
      const targetDay = this.agendas[day];
      if (targetDay) targetDay.push(value);
      else this.agendas[day] = [value];
    },
    addNote(value: UNote) {
      const day = new Date(value.timestamp).toDateString();
      const targetDay = this.notes[day];
      if (targetDay) targetDay.push(value);
      else this.notes[day] = [value];
    },
  },
});
