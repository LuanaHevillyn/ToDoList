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
import { getPriorityConfig } from 'src/helpers/enum.helper';
import { TasksByPriority } from 'src/schemas/dashboard.schemas';
import { Priority } from 'src/schemas/task.schemas';
import { computed } from 'vue';

const props = defineProps<{
  id: string;
  data: TasksByPriority[];
}>();

const series = computed(() => {
  if (!props.data) return [];
  const data = props.data.map((data) => data.tasks);
  return data;
});

const tasks = computed(() => {
  if (!props.data) return;
  return props.data.map((data) => data.priority as Priority);
});

const options = computed(() => ({
  chart: {
    type: 'donut',
    height: 300,
  },

  plotOptions: {
    pie: {
      dataLabels: {
        offset: -3,
      },
      donut: {
        labels: {
          show: false,
          total: {
            showAlways: true,
            show: true,
          },
        },
      },
    },
  },

  labels: tasks.value?.map((task) => getPriorityConfig(task).label),
  dataLabels: {
    dropShadow: {
      blur: 5,
      opacity: 1,
    },
  },

  colors: tasks.value?.map((task) => getPriorityConfig(task).color),
  tooltip: {
    y: {
      formatter: function (val: string) {
        return val;
      },
    },
  },

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
}));
</script>
