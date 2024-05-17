<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import AppHeader from "../src/components/AppHeader.vue"
import AppFooter from "@/components/AppFooter.vue";
import AppCurrentUser from "@/components/AppCurrentUser.vue";
</script>
<template>
  <div class="wrap">
    <AppCurrentUser></AppCurrentUser>
    <AppHeader></AppHeader>
    <main>
      <RouterView></RouterView>
    </main>
    <AppFooter></AppFooter>
  </div>
</template>
<style scoped>

</style>
