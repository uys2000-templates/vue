<template>
  <div class="flex flex-row flex-nowrap items-center p-4 bg-neutral text-neutral-content rounded-box gap-4"
    @click="onclick">
    <span class="material-symbols-outlined">add_circle</span>
    <span>{{ title }}</span>
  </div>
</template>
<script lang="ts">
export default {
  emits: ["click"],
  props: {
    title: {
      type: String,
      default: "New Entry"
    }
  },
  methods: {
    onclick() {
      this.$emit("click")
    }
  }
}
</script>