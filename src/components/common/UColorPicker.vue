<template>
  <span class="w-full flex-shrink overflow-y-hidden overflow-x-auto h-6 flex flex-row-reverse gap-1">
    <span class="inline-block w-5 h-5 rounded-full flex-shrink-0 cursor-pointer" :style="`background-color: ${value};`"
      @click="() => show = true"></span>
    <template v-if="show">
      <template v-for="color in colors">
        <span class="inline-block w-5 h-5 rounded-full flex-shrink-0" :style="`background-color: ${color};`"
          @click="() => onSelect(color)"></span>
      </template>
    </template>
  </span>
</template>

<script lang="ts">
export default {
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type: String,
      default: '#c56cf0'
    }
  },
  data() {
    return {
      show: false,
      colors: ["#c56cf0", "#ffb8b8", "#ff3838", "#ff9f1a", "#fff200", "#3ae374", "#67e6dc", "#17c0eb", "#7158e2", "#3d3d3d"]
    }
  },
  methods: {
    onSelect(value: string) {
      this.show = false;
      this.value = value;
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value: string) {
        this.$emit("update:modelValue", value)
      }
    }
  }
}
</script>