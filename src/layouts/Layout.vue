<template>
  <div class="max-h-screen h-screen w-screen bg-base-300 text-base-content flex flex-col flex-nowrap overflow-hidden">
    <input id="drawer" type="checkbox" class="drawer-toggle" />
    <TheHeader />
    <div class="h-full w-full flex flex-col flex-nowrap overflow-hidden flex-shrink">
      <div class="calendar w-full flex-shrink-0">
        <UCalendar v-model:date="calendarStore.date" />
      </div>
      <div role="tablist" class="tabs tabs-bordered w-full flex-shrink-0">
        <RouterLink :to="{ name: 'AgendaView' }" role="tab" class="tab [--tab-bg:yellow] [--tab-border-color:orange]"
          :class="{ 'tab-active': $route.name == 'AgendaView' }">Agenda</RouterLink>
        <RouterLink :to="{ name: 'NotesView' }" role="tab" class="tab [--tab-bg:yellow] [--tab-border-color:orange]"
          :class="{ 'tab-active': $route.name == 'NotesView' }">
          Notes</RouterLink>
        <!--
            <RouterLink :to="{ name: 'ChallengesView' }" role="tab" class="tab"
            :class="{ 'tab-active': $route.name == 'ChallengesView' }">Challenges</RouterLink>
            -->
      </div>
      <div class="content h-full w-full flex-shrink flex flex-col flex-nowrap overflow-hidden">
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