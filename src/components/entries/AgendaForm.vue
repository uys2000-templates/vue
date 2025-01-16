<template>
  <form class="flex flex-col gap-2" @submit.prevent="onSubmit">
    <label class="input input-ghost input-bordered flex items-center gap-2">
      Title
      <input type="text" class="grow" v-model="value.title" />
    </label>
    <textarea class="textarea textarea-ghost textarea-bordered" placeholder="Note :" v-model="value.content"></textarea>
    <label class="label input input-ghost input-bordered cursor-pointer">
      <span class="label-text">All Day</span>
      <input type="checkbox" class="toggle toggle-primary" :checked="value.allDay"
        @click="value.allDay = !value.allDay" />
    </label>
    <template v-if="!value.allDay">
      <label class="label input input-ghost input-bordered cursor-pointer">
        <span class="label-text">Start</span>
        <input type="datetime-local" :value="startTime"
          @change="value.start = new Date(($event.target as HTMLInputElement).value)" />
      </label>
      <label class="label input input-ghost input-bordered cursor-pointer">
        <span class="label-text">End</span>
        <input type="datetime-local" :value="endTime"
          @change="value.end = new Date(($event.target as HTMLInputElement).value)" />
      </label>
    </template>
    <template v-else>
      <label class="label input input-ghost input-bordered cursor-pointer">
        <span class="label-text">Date</span>
        <input type="date" :value="startDate"
          @change="value.start = new Date(($event.target as HTMLInputElement).value)" />
      </label>
    </template>
    <label class="label input input-ghost input-bordered cursor-pointer">
      <span class="label-text">Repeat</span>
      <input type="checkbox" class="toggle toggle-primary" :checked="value.repeat"
        @click="value.repeat = !value.repeat" />
    </label>
    <template v-if="value.repeat">
      <label class="input input-ghost input-bordered flex items-center gap-2">
        Repeat Count
        <input type="number" class="grow text-right" v-model.number="value.repeatCount" />
      </label>
      <select class="select select-bordered select-ghost w-full" v-model="value.repeatType">
        <option value="daily" selected>Daily</option>
        <option value="weekly">Weekly</option>
      </select>
      <template v-if="value.repeatType == 'weekly'">
        <UDayChooser v-model:selected="value.repeatWeeklyDays" />
      </template>
    </template>
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
import type { UAgenda } from "@/types/agenda";
export default {
  emits: ["update:modelValue", "submit"],
  components: {
    Modal, UDayChooser, UColorPicker
  },
  props: {
    modelValue: {
      type: Object as PropType<UAgenda>,
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
      set(value: UAgenda) {
        this.$emit('update:modelValue', value)
      }
    },
    startDate() {
      return this.value.start.toISOString().split('T')[0]
    },
    startTime() {
      return this.value.start.toISOString().split('.')[0]
    },
    endTime() {
      return this.value.end.toISOString().split('.')[0]
    }
  },
  beforeMount() {
    this.value.start.setSeconds(0, 0)
    this.value.end = new Date(Date.now() + 1000 * 60 * 60)
    this.value.end.setSeconds(0, 0)
  }
}
</script>
