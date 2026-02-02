<template>
  <q-layout view="hHh Lpr lff">
    <q-drawer
      v-model="drawer"
      show-if-above
      :mini="miniState"
      @mouseenter="miniState = false"
      @mouseleave="miniState = true"
      :width="200"
      :breakpoint="500"
      behavior="desktop"
      class="shadow-10 rounded-borders q-my-xs"
    >
      <menu-item icon="menu" label="To-Do List" class="q-mt-sm text-weight-medium text-subtitle1"/>
      <menu-sub-item />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import MenuItem from 'src/components/MenuItem.vue';
import MenuSubItem from 'src/components/MenuSubItem.vue';

import { ref } from 'vue';

defineOptions({
  name: 'MainLayout',
});

const drawer = ref(false);
const miniState = ref(true);
</script>
