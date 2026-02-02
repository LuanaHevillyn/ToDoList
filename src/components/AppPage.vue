<template>
  <q-page v-bind="$props" class="app-page">
    <slot></slot>
  </q-page>
</template>

<script setup lang="ts">
import { QPageProps } from 'quasar';

defineProps<QPageProps>();
</script>

<style scoped lang="scss">
.app-page {
  padding: 3.4%;
}
</style>
