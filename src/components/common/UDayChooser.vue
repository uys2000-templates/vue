<template>
  <div class="u-day-chooser">
    <template v-for="name, i in uCalendar.names" :key="i">
      <button type="button" class="udc-day" :class="{ 'udc-day-active': isSelected(i) }" :data-index="i"
        @click="() => onSelect(i)">
        {{ name }}
      </button>
    </template>
  </div>
</template>

<script lang="ts">
import { UCalendar } from '@/types/ucalendar';
import type { PropType } from 'vue';

export default {
  emits: ["update:selected"],
  props: {
    selected: {
      type: Array as PropType<number[]>,
      default: []
    }
  },
  data() {
    return {
      uCalendar: new UCalendar(new Date)
    }
  },
  methods: {
    isSelected(value: number) {
      return this.selectedValues.includes(value)
    },
    onSelect(value: number) {
      if (this.isSelected(value)) this.selectedValues = this.selectedValues.filter(i => i != value)
      else this.selectedValues.push(value)
    }
  },
  computed: {
    selectedValues: {
      get() {
        return this.selected
      },
      set(value: number[]) {
        this.$emit('update:selected', value)
      }
    }
  }
}
</script>

<style scoped>
.u-day-chooser {
  @apply border rounded-btn p-2 cursor-pointer;
  @apply w-full flex items-center justify-between;
  border-color: var(--fallback-bc, oklch(var(--bc) / 0.2));
}

.u-day-chooser .udc-day {
  @apply btn btn-circle btn-sm;
}

.u-day-chooser .udc-day.udc-day-active {
  @apply btn-primary;
}
</style>