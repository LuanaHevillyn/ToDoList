<template>
  <div class="column q-gutter-x-md">
    <q-card bordered class="q-mt-xs shadow-3 text-center col-12 col-md-12">
      <q-card-section>
        <span class="text-h5 text-weight-medium">{{
          $t('dashboard.graphs.titles.activities')
        }}</span>
        <div v-if="haAnnualTasksProgressData">
          <AnnualTaskProgressChart
            id="annual-task-progress-chart"
            :tasks="annualTasksProgressData"
          />
        </div>
        <div v-else>Sem tarefas</div>
      </q-card-section>
    </q-card>

    <div class="row justify-between col-12 col-md-6 q-gutter-y-md q-mt-xs">
      <q-card bordered class="shadow-3 text-center responsive-card">
        <q-card-section>
          <span class="text-h5 text-weight-medium">{{
            $t('dashboard.graphs.titles.mostUsedCategories')
          }}</span>
          <div v-if="hasMostUsedCategoriesData">
            <MostUsedCategoriesChart
              id="most-used-categories-chart"
              :categories="mostUsedCategoriesData"
            />
          </div>
          <div v-else>Sem categorias</div>
        </q-card-section>
      </q-card>

      <q-card bordered class="shadow-3 text-center responsive-card">
        <q-card-section>
          <span class="text-h5 text-weight-medium">{{
            $t('dashboard.graphs.titles.tasksByPriority')
          }}</span>
          <div v-if="hasTasksByPriorityData">
            <TasksByPriorityChart
              id="overdue-task-chart"
              :data="tasksByPriorityData"
            />
          </div>
          <div v-else>Sem tarefas</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHandleAsync } from 'src/helpers/handleAsync.helper';
import {
  AnnualTaskProgress,
  MostUsedCategories,
  TasksByPriority,
} from 'src/schemas/dashboard.schemas';
import {
  getAnnualTasksProgress,
  getDashboardDataTasksByPriority,
  getMostUsedCategories,
} from 'src/services/dashboard.service';
import { computed, onMounted, ref } from 'vue';
import AnnualTaskProgressChart from '../charts/AnnualTaskProgressChart.vue';
import MostUsedCategoriesChart from '../charts/MostUsedCategoriesChart.vue';
import TasksByPriorityChart from '../charts/TasksByPriorityChart.vue';

const { handle } = useHandleAsync();
const annualTasksProgress = ref<AnnualTaskProgress>();
const annualTasksProgressData = computed(() => {
  return (
    annualTasksProgress.value ?? {
      tasksPending: [],
      tasksCompleted: [],
      tasksInProgress: [],
      tasksOverdue: [],
    }
  );
});
const haAnnualTasksProgressData = computed(() => {
  const data = annualTasksProgressData.value;
  return (
    data.tasksPending.length > 0 ||
    data.tasksCompleted.length > 0 ||
    data.tasksInProgress.length > 0 ||
    data.tasksOverdue.length > 0
  );
});

const mostUsedCategories = ref<MostUsedCategories[]>();
const mostUsedCategoriesData = computed(() => mostUsedCategories.value ?? []);
const hasMostUsedCategoriesData = computed(
  () => mostUsedCategoriesData.value.length > 0
);

const tasksByPriority = ref<TasksByPriority[]>();
const tasksByPriorityData = computed(() => tasksByPriority.value ?? []);
const hasTasksByPriorityData = computed(
  () => tasksByPriorityData.value.length > 0
);

const loadAnnualTasksProgress = async () => {
  const result = await handle(() => getAnnualTasksProgress());
  if (!result) return;
  annualTasksProgress.value = result;
};

const loadMostUsedCategories = async () => {
  const result = await handle(() => getMostUsedCategories());
  if (!result) return;
  mostUsedCategories.value = result;
};

const loadTasksByPriority = async () => {
  const result = await handle(() => getDashboardDataTasksByPriority());
  if (!result) return;
  tasksByPriority.value = result;
};

onMounted(() => {
  loadAnnualTasksProgress();
  loadMostUsedCategories();
  loadTasksByPriority();
});
</script>

<style scoped lang="scss">
.responsive-card {
  width: 49%;
}

@media (max-width: 1023px) {
  .responsive-card {
    width: 100%;
  }
}
</style>
