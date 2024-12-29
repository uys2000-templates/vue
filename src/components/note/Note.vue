<template>
  <Modal ref="modal" id="new-note" v-model="visible">
    <template #title>
      <span class="shrink-0 text-nowrap">New Note</span>
      <UColorPicker class="ml-auto mr-2 border" v-model="value.color" />
    </template>
    <form class="flex flex-col gap-2">
      <label class="input input-ghost input-bordered flex items-center gap-2">
        Name
        <input type="text" class="grow" v-model="value.title" />
      </label>
      <textarea class="textarea textarea-ghost textarea-bordered" placeholder="Note :" v-model="value.notes"></textarea>
    </form>
  </Modal>
</template>
<script lang="ts">
import Modal from "@/components/daisy/Modal.vue"
import UDayChooser from "../common/UDayChooser.vue";
import UColorPicker from "../common/UColorPicker.vue";
import type { UNote } from "@/types/note";
import type { PropType } from "vue";
export default {
  emits: ["update:modelVisible", "update:modelValue"],
  components: {
    Modal, UDayChooser, UColorPicker
  },
  props: {
    modelValue: {
      type: Object as PropType<UNote>,
      required: true
    },
    modelVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
    }
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
    value: {
      get() {
        return this.modelValue
      },
      set(value: boolean) {
        this.$emit("update:modelValue", value)
      }
    }
  },
}
</script>
