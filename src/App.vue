<template>
  <router-view v-slot="{ Component }">
    <transition name="layout">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script lang="ts">
import { KeepAlive } from 'vue';
import { RouterView } from 'vue-router'
export default {
  components: {
    RouterView,
    KeepAlive,
  },
  beforeMount() {
    //window.lang = "tr-TR"
    window.lang = "en-US"
  }
}
</script>


<style>
.layout-enter-active,
.layout-leave-active {
  transition: opacity 0.5s ease;
  position: absolute;
}

.layout-enter-from,
.layout-leave-to {
  opacity: 0;
}
</style>