<template>
  <apexchart
    :id="props.id"
    type="donut"
    height="300"
    :options="options"
    :series="series"
  />
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { OverdueTaskByCategory } from 'src/schemas/dashboard.schemas';

const props = defineProps<{
  id: string;
  categories: OverdueTaskByCategory;
}>();

const series = computed(() => {
  if (!props.categories) return;
  return props.categories.map((category) => category.overdueTasks);
});

const categories = computed(() => {
  if (!props.categories) return;
  return props.categories.map((category) => category.categoryName);
});

const options = ref({
  chart: {
    type: 'donut',
    height: 350,
  },

  plotOptions: {
    pie: {
      dataLabels: {
        offset: -3,
      },
      donut: {
        labels: {
          show: true,
          total: {
            showAlways: true,
            show: true,
          },
        },
      },
    },
  },

  labels: categories,
  dataLabels: {
    dropShadow: {
      blur: 5,
      opacity: 1,
    },
  },

  colors: ['#c6d8ff', '#71a9f7', '#83c9f4', '#858ae3', '#7364d2'],

  tooltip: {
    y: {
      formatter: function (val: string) {
        return val;
      },
    },
  },
});
</script>
