<template>
  <apexchart
    :id="props.id"
    type="bar"
    height="350"
    class="chart"
    :options="options"
    :series="series"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = defineProps<{
  id: string;
  categories: { categoryName: string; daysUsed: number }[];
}>();

const series = computed(() => {
  if (!props.categories) return;
  const data = props.categories.map((category) => category.daysUsed);
  return [{ data }];
});

const categories = computed(() => {
  if (!props.categories) return;
  return props.categories.map((category) => category.categoryName);
});

const options = ref({
  chart: {
    type: 'bar',
    height: 200,
  },
  plotOptions: {
    bar: {
      borderRadius: 2,
      borderRadiusApplication: 'end',
      horizontal: true,
      barHeight: '40%',
    },
  },

  stroke: {
    show: true,
    width: 1,
  },
  dataLabels: {
    enabled: true,
  },
  xaxis: {
    categories: categories,
  },
  colors: ['purple'],
});
</script>
