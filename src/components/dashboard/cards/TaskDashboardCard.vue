<template>
  <q-card bordered class="shadow-3 text-center">
    <q-card-section>
      <div class="text-subtitle1 text-weight-medium">
        <q-icon :name="icon" size="18px" class="q-mb-xs" color="deep-purple-6" />
        {{ title }}
      </div>
      <q-card-section>
        <div class="text-h4 text-weight-medium">
          {{ current }}
          <span class="text-h5 text-weight-regular" v-if="goal"> / {{ goal }} </span>
        </div>
      </q-card-section>
      <div>
        {{ footer.right }} <span v-if="footer.left"> / {{ footer.left }} </span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
defineProps<{
  title: string;

  icon: string;
  current: number;
  goal?: number;  
  footer: {
    right: string;
    left?: string;
  },
}>();
</script>
