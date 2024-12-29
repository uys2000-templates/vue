<template>
  <div class="navbar w-full z-10 flex justify-center relative h-12 min-h-0 flex-shrink-0">
    <div class="px-1 text-primary-content font-bold">HUM</div>
    <div class="absolute right-4">
      <span class="material-symbols-outlined notranslate">
        menu
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
import Dropdown from '../daisy/Dropdown.vue';
import DropdownContent from '../daisy/DropdownContent.vue';
import ThemeBtn from '../daisy/ThemeBtn.vue';
import { useAuthStore } from '@/stores/auth';

export default {
  components: { RouterLink, Dropdown, DropdownContent, ThemeBtn },
  data() {
    return {
      authStore: useAuthStore()
    }
  },
  methods: {
  }
}
</script>