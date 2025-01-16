<template>
  <div class="u-calendar">
    <div class="u-c-header">
      <div class="u-ch-date">{{ uCalendar.month }}</div>
      <div class="u-ch-actions">
        <span class="text-xs material-symbols-outlined" @click="previousMonth">arrow_back_ios</span>
        <span class="text-xs material-symbols-outlined" @click="nextMonth">arrow_forward_ios</span>
      </div>
    </div>
    <div class="u-c-body">
      <div class="u-cb-header">
        <template v-for="day in uCalendar.names">
          <div class="u-cbh-day">{{ day }}</div>
        </template>
      </div>
      <div class="u-cb-weeks">
        <template v-for="week in uCalendar.weeks">
          <div class="u-cbw-week">
            <template v-for="day in week">
              <div class="u-cbww-day" :class="{
                'u-cbwwd-selected': day.isEqual(uCalendar.selected),
                'u-cbwwd-today': day.isEqual(uCalendar.today),
                'u-cbwwd-last': day.isLast,
                'u-cbwwd-next': day.isNext,
              }" @click="() => selectDay(day)">
                {{ day.date.getDate() }}
                <div class="u-cbwwd-items">
                  <template v-for="item in items[day.date.toDateString()]">
                    <div class="u-cbwwdi-item" :style="`background-color: ${item.color};`">
                    </div>
                  </template>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useEntryStore } from '@/stores/entry';
import { UCalendar, UCDay } from '@/types/ucalendar';

export default {
  emits: ["update:date"],
  props: {
    date: {
      type: Date,
      default: new Date()
    }
  },
  data() {
    return {
      uCalendar: new UCalendar(this.date),
      entryStore: useEntryStore()
    }
  },
  computed: {
    dateValue: {
      get() {
        return this.date
      },
      set(value: Date) {
        this.$emit("update:date", value)
      }
    },
    items() {
      if (this.$route.name == 'AgendaView') {
        return this.entryStore.agendas
      }
      if (this.$route.name == 'NotesView') {
        return this.entryStore.notes
      }
      return {}
    }
  },
  methods: {
    selectDay(day: UCDay) {
      this.entryStore.day = day.date.toDateString()
      this.dateValue = day.date
      this.uCalendar.selected = day.date
      if (day.isLast || day.isNext) {
        this.uCalendar.setDate(day.date, day.date)
      }
    },
    previousMonth() {
      this.uCalendar.selected.setMonth(this.uCalendar.selected.getMonth() - 1)
      this.dateValue = this.uCalendar.selected
      this.uCalendar.setDate(this.uCalendar.selected, this.uCalendar.selected)
    },
    nextMonth() {
      this.uCalendar.selected.setMonth(this.uCalendar.selected.getMonth() + 1)
      this.dateValue = this.uCalendar.selected
      this.uCalendar.setDate(this.uCalendar.selected, this.uCalendar.selected)
    }
  },
  mounted() {
    //this.date.setMonth(9)
    this.uCalendar.setDate(this.dateValue)
  }
}
</script>

<style scoped>
.u-calendar {
  @apply w-full h-full overflow-x-auto;
}

.u-calendar .u-c-header {
  @apply flex justify-between items-center p-2 pt-0;
}

.u-calendar .u-c-header .u-ch-date {
  @apply text-nowrap;
}

.u-calendar .u-c-header .u-ch-actions {
  @apply flex flex-nowrap gap-1;
}

.u-calendar .u-c-header .u-ch-actions * {
  @apply cursor-pointer p-1;
}

.u-calendar .u-c-body .u-cb-header {
  @apply flex flex-nowrap;
}

.u-calendar .u-c-body .u-cb-header .u-cbh-day {
  @apply w-full flex-shrink text-center text-opacity-50;
}

.u-calendar .u-c-body .u-cb-weeks {
  @apply flex flex-col gap-1;
}

.u-calendar .u-c-body .u-cb-weeks .u-cbw-week {
  @apply flex flex-nowrap;
}

.u-calendar .u-c-body .u-cb-weeks .u-cbw-week .u-cbww-day {
  @apply w-8 h-8 flex justify-center items-center cursor-pointer relative;
  @apply rounded-full border m-auto transition-colors duration-300 overflow-hidden;
}

.u-calendar .u-c-body .u-cb-weeks .u-cbw-week .u-cbww-day .u-cbwwd-items {
  @apply absolute bottom-px left-0 w-full flex gap-px justify-center items-center;
}

.u-calendar .u-c-body .u-cb-weeks .u-cbw-week .u-cbww-day .u-cbwwd-items .u-cbwwdi-item {
  @apply w-1 h-1 rounded-full;
}

.u-calendar .u-c-body .u-cb-weeks .u-cbw-week .u-cbww-day.u-cbwwd-last,
.u-calendar .u-c-body .u-cb-weeks .u-cbw-week .u-cbww-day.u-cbwwd-next {
  @apply opacity-50 border-none;
}

.u-calendar .u-c-body .u-cb-weeks .u-cbw-week .u-cbww-day.u-cbwwd-today {
  @apply border-primary text-accent;
}

.u-calendar .u-c-body .u-cb-weeks .u-cbw-week .u-cbww-day.u-cbwwd-selected {
  @apply border-primary text-primary;
}
</style>