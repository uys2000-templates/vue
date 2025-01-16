<template>
  <Modal ref="modal" id="new-note" v-model="visible">
    <template #title>
      <span class="shrink-0 text-nowrap">New Note</span>
      <UColorPicker class="ml-auto mr-2 border" v-model="value.color" />
    </template>
    <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
      <label class="input input-ghost input-bordered flex items-center gap-2">
        Name
        <input type="text" class="grow" v-model="value.title" />
      </label>
      <textarea class="textarea textarea-ghost textarea-bordered" placeholder="Note :"
        v-model="value.content"></textarea>
      <div class="flex justify-end">
        <button type="submit" class="btn btn-primary btn-sm">Create</button>
      </div>
    </form>
  </Modal>
</template>
<script lang="ts">
import Modal from "@/components/daisy/Modal.vue"
import UDayChooser from "../common/UDayChooser.vue";
import UColorPicker from "../common/UColorPicker.vue";
import type { UNote } from "@/types/note";
import type { PropType } from "vue";
import { deleteEntry, writeEntry } from "@/services/app/entryService";
export default {
  emits: ["update:modelVisible", "update:modelValue", "after:submit"],
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
    update: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {
      localValue: {} as UNote
    }
  },
  methods: {
    async onSubmit() {
      this.visible = false
      const value = { ...this.localValue }
      if (!value.timestamp) value.timestamp = new Date().getTime()
      if (this.update) deleteEntry('note', this.modelValue)
      await writeEntry('note', value)
      this.$emit('after:submit', value)
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
        return this.localValue
      },
      set(value: UNote) {
        this.localValue = value
      }
    },
  },
  watch: {
    visible() {
      if (!this.localValue.timestamp) this.localValue = { ...this.modelValue }
      else this.localValue = {} as UNote
    }
  },
}
</script>
