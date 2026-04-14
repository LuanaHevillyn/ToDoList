<template>
  <q-dialog ref="dialogRef" class="app-dialog" persistent>
    <q-card class="q-pa-lg" bordered :style="{ maxWidth: maxWidth }">

      <div class="q-mb-md flex">
        <slot name="title"></slot>
      </div>

      <div class="">
        <slot name="form"></slot>
      </div>

      <slot name="actions"></slot>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { QDialog } from 'quasar';
import { ref } from 'vue';

const dialogRef = ref<QDialog>();
withDefaults(defineProps<{ maxWidth?: string }>(), { maxWidth: '600px' });

defineExpose({
  dialogRef,
  show: (e?: Event) => dialogRef.value?.show(e),
  hide: (e?: Event) => dialogRef.value?.hide(e),
  toggle: (evt?: Event) => dialogRef.value?.toggle(evt),
  focus: (selector?: string) => dialogRef.value?.focus(selector),
  shake: (focusTarget?: Element) => dialogRef.value?.shake(focusTarget),
});
</script>

<style lang="scss" scoped>
.app-dialog {
  .q-card {
    width: 100%;
    max-width: 600px;
  }
}
</style>
