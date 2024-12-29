<template>
  <Modal ref="modal" id="new-agenda" v-model="visible">
    <template #title>
      <span class="shrink-0 text-nowrap">New Agenda</span>
      <UColorPicker class="ml-auto mr-2 border" v-model="value.color" />
    </template>
    <form class="flex flex-col gap-2">
      <label class="input input-ghost input-bordered flex items-center gap-2">
        Name
        <input type="text" class="grow" v-model="value.title" />
      </label>
      <label class="label input input-ghost input-bordered cursor-pointer">
        <span class="label-text">All Day</span>
        <input type="checkbox" class="toggle toggle-primary" :checked="value.allDay"
          @click="value.allDay = !value.allDay" />
      </label>
      <template v-if="!value.allDay">
        <label class="label input input-ghost input-bordered cursor-pointer">
          <span class="label-text">Start</span>
          <input type="datetime-local" :value="value.start.toISOString().split('.')[0]" />
        </label>
        <label class="label input input-ghost input-bordered cursor-pointer">
          <span class="label-text">End</span>
          <input type="datetime-local" :value="value.end.toISOString().split('.')[0]" />
        </label>
      </template>
      <label class="label input input-ghost input-bordered cursor-pointer">
        <span class="label-text">Repeat</span>
        <input type="checkbox" class="toggle toggle-primary" :checked="value.repeat"
          @click="value.repeat = !value.repeat" />
      </label>
      <template v-if="value.repeat">
        <select class="select select-bordered select-ghost w-full" v-model="value.repeatType">
          <option value="daily" selected>Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <template v-if="value.repeatType == 'weekly'">
          <UDayChooser v-model:selected="value.repeatWeeklyDays" />
        </template>
      </template>
    </form>
  </Modal>
</template>
<script lang="ts">
import Modal from "@/components/daisy/Modal.vue"
import UDayChooser from "../common/UDayChooser.vue";
import UColorPicker from "../common/UColorPicker.vue";
import type { PropType } from "vue";
import type { UAgenda } from "@/types/agenda";
export default {
  emits: ["update:modelVisible", "update:modelValue"],
  components: {
    Modal, UDayChooser, UColorPicker
  },
  props: {
    modelValue: {
      type: Object as PropType<UAgenda>,
      required: true
    },
    modelVisible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
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
  beforeMount() {
    this.value.start.setSeconds(0, 0)
    this.value.end = new Date(Date.now() + 1000 * 60 * 60)
    this.value.end.setSeconds(0, 0)
  }
}
</script>
