<template>
  <div class="flex flex-col gap-2 p-4 relative h-full w-full">
    <div class="flex flex-row flex-nowrap items-center p-4 bg-neutral text-neutral-content rounded-box gap-4"
      @click="showAddAgenda">
      <span class="material-symbols-outlined">add_circle</span>
      <span>New Entry</span>
    </div>
    <!-- Mevcut veriyi asagi ekle kullanici asagi inmeye calismasin -->
    <Agenda v-model:model-visible="visible" v-model:model-value="newAgenda" />
  </div>
</template>
<script lang="ts">
import Agenda from '@/components/agenda/Agenda.vue';
import type { UAgenda } from '@/types/agenda';

export default {
  components: {
    Agenda
  },
  data() {
    return {
      visible: false,
      newAgenda: {
        timestamp: Date.now(),
        color: "#c56cf0",
        title: "",
        note: "",
        allDay: false,
        start: new Date(),
        end: new Date(Date.now() + 1000 * 60 * 60),
        repeat: false,
        repeatType: "weekly",
        repeatWeeklyDays: []
      } as UAgenda
    }
  },
  methods: {
    showAddAgenda() {
      this.visible = true;
    }
  }
}
</script>