<template>
  <Transition name="modal">
    <template v-if="value">
      <div class="absolute w-full h-full bottom-0 left-0 overflow-hidden">
        <div class="relative w-full h-full bg-base-300 overflow-hidden flex flex-col">
          <div class="p-4 pb-2 flex flex-nowrap items-center content-center justify-between gap-2 flex-shrink-0">
            <template v-if="title"><span class="shrink-0 text-nowrap">{{ title }}</span></template>
            <template v-else>
              <slot name="title" />
            </template>
            <span class="material-symbols-outlined flex justify-center items-center pt-px shrink-0 cursor-pointer"
              @click="close">arrow_drop_down_circle</span>
          </div>
          <div class="content p-2 overflow-auto h-auto flex-shrink">
            <slot />
          </div>
        </div>
      </div>
    </template>
  </Transition>
</template>

<script lang="ts">
export default {
  emits: ["update:model-value", "close"],
  props: {
    modelValue: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    }
  },
  methods: {
    close() {
      this.$emit("close")
      this.value = false;
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue;
      },
      set(value: boolean) {
        this.$emit('update:model-value', value);
      }
    }
  }
}
</script>

<style>
.modal-enter-active,
.modal-leave-active {
  position: absolute;
  transition: 0.5s ease;
}

.modal-enter-from {
  transform: translateY(100%);
  opacity: 0;
}

.modal-leave-to {
  transform: translateY(100%);
  opacity: 0;
}
</style>