<template>
  <Collapse class="bg-neutral text-neutral-content rounded-box flex-shrink-0">
    <template #title>
      <div class="flex flex-row flex-nowrap items-center gap-4">
        <span class="material-symbols-outlined" :style="`color: ${value.color};`">event</span>
        <span class="grow">{{ value.title }}</span>
        <span class="material-symbols-outlined z-10 cursor-pointer" @click="update">edit</span>
        <span class="material-symbols-outlined z-10 cursor-pointer" @click="remove">delete</span>
      </div>
    </template>
    <template #content>
      <p>
        {{ value.content }}
      </p>
    </template>
  </Collapse>
</template>

<script lang="ts">
import type { UAgenda } from '@/types/agenda';
import type { PropType } from 'vue';
import Collapse from '../daisy/Collapse.vue';
import type { UNote } from '@/types/note';

export default {
  emits: ["update", "remove"],
  components: { Collapse },
  props: {
    value: {
      type: Object as PropType<UAgenda | UNote>,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  methods: {
    update() {
      this.$emit("update", this.value, this.index)
    },
    remove() {
      this.$emit("remove", this.value, this.index)
    }
  }
}
</script>