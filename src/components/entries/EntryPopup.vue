<template>
  <Modal ref="modal" id="new-agenda" class="z-20" v-model="visible">
    <template #title>
      <span class="shrink-0 text-nowrap">{{ title }}</span>
      <UColorPicker class="ml-auto mr-2 border" v-model="color" />
    </template>
    <slot />
  </Modal>
</template>
<script lang="ts">
import UColorPicker from '../common/UColorPicker.vue';
import Modal from '../daisy/Modal.vue';

export default {
  emits: ["update:modelVisible", "update:colorValue"],
  components: {
    Modal,
    UColorPicker
  },
  props: {
    modelVisible: {
      type: Boolean,
      default: false,
    },
    modelColor: {
      type: String,
    },
    title: {
      type: String,
    },
  },
  computed: {
    visible: {
      get() {
        return this.modelVisible
      },
      set(value: boolean) {
        this.$emit("update:modelVisible", value)
      }
    },
    color: {
      get() {
        return this.modelColor
      },
      set(value: string) {
        this.$emit('update:colorValue', value)
      }
    }
  }
}
</script>