<template>
  <apexchart
    :id="props.id"
    type="bar"
    height="300"
    class="chart"
    :options="options"
    :series="series"
  />
</template>

<script setup lang="ts">
import { AnnualTaskProgress, TaskDashboardItem } from 'src/schemas/dashboard.schemas';
import { computed, ref } from 'vue';

const props = defineProps<{
  id: string;
  tasks: AnnualTaskProgress;
}>();

const months = [
  'Jan',
  'Fev',
  'Mar',
  'Abr',
  'Mai',
  'Jun',
  'Jul',
  'Ago',
  'Set',
  'Out',
  'Nov',
  'Dez',
];

function buildSeriesData(series: TaskDashboardItem[]) {
  return months.map((_, idx) => {
    const monthIndex = idx + 1;
    const found = series.find((item) => item.month === monthIndex);
    return found ? found.total : 0;
  });
}
const options = ref({
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false,
      tools: {
        download: false,
      },
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '35%',
      borderRadius: 2,
      borderRadiusApplication: 'end',
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent'],
  },
  xaxis: {
    categories: months,
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter: function (val: string) {
        return val;
      },
    },
  },
});

const series = computed(() => {
  if (!props.tasks) return [];

  return [
    {
      name: 'Pendentes',
      data: buildSeriesData(props.tasks.tasksPending),
      color: 'yellow',
    },
    {
      name: 'Em Andamento',
      data: buildSeriesData(props.tasks.tasksInProgress),
      color: '#0096c7',
    },
    {
      name: 'Concluídas',
      data: buildSeriesData(props.tasks.tasksCompleted),
      color: '#6a994e',
    },
    {
      name: 'Atrasadas',
      data: buildSeriesData(props.tasks.tasksOverdue),
      color: '#c9184a',
    },
  ];
});
</script>
