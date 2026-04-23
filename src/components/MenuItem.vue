<template>
  <q-item
    clickable
    v-ripple
    :active="active"
    active-class="text-deep-purple-6"
    @click="$emit('goTo')"
  >
    <q-item-section avatar>
      <q-icon :name="icon" color="deep-purple-6" />
    </q-item-section>
    <q-item-section>{{ label }}</q-item-section>
  </q-item>
</template>

<script setup lang="ts">
defineProps<{
  icon: string;
  label: string;
  active?: boolean;
}>();

defineEmits<{
  (e: 'goTo'): void;
}>();
</script>
