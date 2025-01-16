<template>
  <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
    <label class="input input-ghost input-bordered flex items-center gap-2">
      Name
      <input type="text" class="grow" v-model="value.title" />
    </label>
    <textarea class="textarea textarea-ghost textarea-bordered" placeholder="Note :" v-model="value.content"></textarea>
    <div class="flex justify-end">
      <button type="submit" class="btn btn-primary btn-sm">Save</button>
    </div>
  </form>
</template>
<script lang="ts">
import Modal from "@/components/daisy/Modal.vue"
import UDayChooser from "../common/UDayChooser.vue";
import UColorPicker from "../common/UColorPicker.vue";
import type { PropType } from "vue";
import type { UNote } from "@/types/note";
export default {
  emits: ["update:modelValue", "submit"],
  components: {
    Modal, UDayChooser, UColorPicker
  },
  props: {
    modelValue: {
      type: Object as PropType<UNote>,
      required: true
    },
    update: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    async onSubmit() {
      this.$emit('submit')
    }
  },
  computed: {
    value: {
      get() {
        return this.modelValue
      },
      set(value: UNote) {
        this.$emit('update:modelValue', value)
      }
    },
  },
}
</script>
