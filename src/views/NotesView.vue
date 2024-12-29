<template>
  <div class="flex flex-col gap-2 p-4 relative h-full w-full">
    <div
      class="flex flex-row flex-nowrap items-center content-center p-4 bg-neutral text-neutral-content rounded-box gap-4"
      @click="showAddAgenda">
      <span class="material-symbols-outlined">add_circle</span>
      <span>New Note</span>
    </div>
    <!-- Mevcut veriyi asagi ekle kullanici asagi inmeye calismasin -->
    <Note v-model:model-visible="visible" v-model:model-value="newNote" />
    <label class="swap fixed bottom-4 right-3 text-center bg-primary p-1 rounded-box">
      <input type="checkbox" />
      <div class="swap-on">Today</div>
      <div class="swap-off">All</div>
    </label>
  </div>
</template>
<script lang="ts">
import Note from '@/components/note/Note.vue';
import type { UNote } from '@/types/note';

export default {
  components: {
    Note
  },
  data() {
    return {
      visible: false,
      newNote: {
        color: "#ffb8b8",
        title: "",
        notes: ""
      } as UNote
    }
  },
  methods: {
    showAddAgenda() {
      this.visible = true;
    }
  }
}
</script>