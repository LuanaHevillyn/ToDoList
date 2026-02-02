<template>
  <q-input v-bind="$props">
    <template v-slot:append>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script setup lang="ts">
import { QInputProps } from 'quasar';

withDefaults(defineProps<QInputProps>(), {
  outlined: true,
  dense: true,
  color: 'purple',
  debounce: 300,
  clearable: true,
  clearIcon: 'close',
  itemAligned: true,
});

defineEmits<{ (e: 'update:filter', value: string): void }>();
</script>