<template>
  <div class="drawer-side z-10">
    <label for="drawer" aria-label="close sidebar" class="drawer-overlay"></label>
    <ul class="menu bg-neutral min-h-full w-max p-0">
      <!-- Sidebar content here -->
      <li>
        <RouterLink :to="{ name: 'HomeView' }" class="btn btn-neutral">Home</RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'AboutView' }" class="btn btn-neutral">About</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { RouterLink } from 'vue-router';
export default {
  components: { RouterLink }
}
</script>