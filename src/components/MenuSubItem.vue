<template>
  <q-list class="app-list">
    <menu-item
      icon="home"
      :label="$t('common.menu.home')"
      :active="isHomeItemActive"
      @click="toHome"
    />

    <menu-item
      icon="checklist_rtl"
      :label="$t('common.menu.tasks')"
      :active="isTasksItemActive"
      @click="toTasks"
    />

    <menu-item
      icon="label"
      :label="$t('common.menu.categories')"
      :active="isCategoriesItemActive"
      @click="toCategories"
    />
  </q-list>
</template>

<script setup lang="ts">
import MenuItem from './MenuItem.vue';

import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const isHomeItemActive = computed(() => route.name === 'home');
const isTasksItemActive = computed(() => route.name === 'tasks');
const isCategoriesItemActive = computed(() => route.name === 'categories');

function toHome() {
  return router.push({ name: 'home' });
}

function toTasks() {
  return router.push({ name: 'tasks' });
}

function toCategories() {
  return router.push({ name: 'categories' });
}
</script>

<style scoped lang="scss">
.app-list {
  margin-top: 100px;
}
</style>
