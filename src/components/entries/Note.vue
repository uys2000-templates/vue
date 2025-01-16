<template>
  <div class="flex flex-row flex-nowrap items-center p-4 bg-neutral text-neutral-content rounded-box gap-4">
    <span class="material-symbols-outlined" :style="`color: ${value.color};`">event</span>
    <span>{{ value.title }}</span>
  </div>
</template>

<script lang="ts">
import type { UNote } from '@/types/note';
import type { PropType } from 'vue';

export default {
  emits: ["update", "detele"],
  props: {
    value: {
      type: Object as PropType<UNote>,
      required: true
    }
  },
  methods: {
    update(item: UNote, index: number) {
      this.$emit("update", item, index)
    }
  }
}
</script>