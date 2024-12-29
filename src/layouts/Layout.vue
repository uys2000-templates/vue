<template>
  <div
    class="h-screen max-h-screen w-full bg-base-300 text-base-content relative flex flex-col flex-nowrap overflow-hidden">
    <input id="drawer" type="checkbox" class="drawer-toggle" />
    <TheHeader />
    <div class="h-full w-full relative flex flex-col flex-shrink">
      <div class="calendar">
        <UCalendar v-model:date="calendarStore.date" />
      </div>
      <div role="tablist" class="tabs tabs-bordered pt-4">
        <RouterLink :to="{ name: 'AgendaView' }" role="tab" class="tab"
          :class="{ 'tab-active': $route.name == 'AgendaView' }">Agenda</RouterLink>
        <RouterLink :to="{ name: 'NotesView' }" role="tab" class="tab"
          :class="{ 'tab-active': $route.name == 'NotesView' }">
          Notes</RouterLink>
        <!--
            <RouterLink :to="{ name: 'ChallengesView' }" role="tab" class="tab"
            :class="{ 'tab-active': $route.name == 'ChallengesView' }">Challenges</RouterLink>
            -->
      </div>
      <div class="content h-full flex-shrink relative w-full">
        <router-view v-slot="{ Component, route }">
          <KeepAlive>
            <transition name="page">
              <component :is="Component" :key="route.path" />
            </transition>
          </KeepAlive>
        </router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import UCalendar from '@/components/common/UCalendar.vue';
import TheHeader from '@/components/shared/TheHeader.vue';
import { useCalendarStore } from '@/stores/calendar';
import { KeepAlive } from 'vue';
import { RouterView } from 'vue-router'
export default {
  components: {
    TheHeader,
    UCalendar,
    RouterView,
    KeepAlive,
  },
  data() {
    return {
      calendarStore: useCalendarStore(),
      tab: "note"
    }
  }
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  position: absolute;
  transition: 0.5s;
}

.page-enter-from {
  transform: translateX(100vw);
  opacity: 0;
}

.page-leave-to {
  transform: translateX(-100vw);
  opacity: 0;
}
</style>