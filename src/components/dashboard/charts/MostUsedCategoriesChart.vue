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
import { MostUsedCategories } from 'src/schemas/dashboard.schemas';
import { computed, ref } from 'vue';

const props = defineProps<{
  id: string;
  categories: MostUsedCategories[];
}>();

const series = computed(() => {
  if (!props.categories) return [];
  const data = props.categories.map((data) => data.timesUsed);
  return [{ name: 'Tarefas relacionadas: ', data }];
});

const categories = computed(() => {
  if (!props.categories) return;
  return props.categories.map((data) => data.name);
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
      barHeight: '30%',
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
    categories: categories.value,
  },
  colors: ['#673ab7'],

  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
});
</script>
