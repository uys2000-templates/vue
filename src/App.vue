<template>
  <router-view v-slot="{ Component }">
    <transition name="layout">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { KeepAlive } from 'vue';
import { RouterView } from 'vue-router'
import { useEntryStore } from './stores/entry';
import { readEntry, readPathEntries } from './services/app/entryService';
import type { UAgenda } from './types/agenda';
import type { UNote } from './types/note';
export default {
  components: {
    RouterView,
    KeepAlive,
  },
  data() {
    return {
      entryStore: useEntryStore()
    }
  },
  methods: {
    async getAgendas() {
      const agendas = await readPathEntries<UAgenda>("agenda")
      for (let index = 0; index < Object.keys(agendas).length; index++) {
        const key = Object.keys(agendas)[index];
        // fixes json date parse problem
        agendas[key] = agendas[key].map(item => ({ ...item, start: new Date(item.start), end: new Date(item.end) }))
      }
      this.entryStore.agendas = agendas
    },
    async getNotes() {
      const notes = await readPathEntries<UNote>("note")
      this.entryStore.notes = notes
    }
  },
  beforeMount() {
    //window.lang = "tr-TR"
    window.lang = "en-US"
    this.getAgendas()
    this.getNotes()
  }
}
</script>


<style>
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>