<template>
  <q-page v-bind="$props" class="app-page">
    <div class="page-header">
      <slot name="title" />
      <slot name="actions" />
    </div>

    <q-separator class="q-my-md" />

    <slot name="table" />
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

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.page-header :first-child {
  flex: 1;
}
</style>
