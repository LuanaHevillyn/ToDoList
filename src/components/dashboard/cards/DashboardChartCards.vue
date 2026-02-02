<template>
  <q-card bordered class="q-mt-lg shadow-3 text-center">
    <q-card-section>
      <span class="text-h5 text-weight-medium">{{ $t('dashboard.graphs.titles.activities') }}</span>
      <AnnualTaskProgressChart
        id="annual-task-progress-chart"
        :tasks="{
          tasksPending: [
            { total: generateRandom(false), month: generateRandom(true) },
            { total: generateRandom(false), month: generateRandom(true) },
            { total: generateRandom(false), month: generateRandom(true) },
            { total: generateRandom(false), month: generateRandom(true) },
            { total: generateRandom(false), month: generateRandom(true) },
          ],
          tasksCompleted: [
            { total: generateRandom(false), month: generateRandom(true) },
            { total: generateRandom(false), month: generateRandom(true) },
            { total: generateRandom(false), month: generateRandom(true) },
            { total: generateRandom(false), month: generateRandom(true) },
            { total: generateRandom(false), month: generateRandom(true) },
          ],
          tasksInProgress: [
            { total: generateRandom(false), month: generateRandom(true) },
            { total: generateRandom(false), month: generateRandom(true) },
            { total: generateRandom(false), month: generateRandom(true) },
            { total: generateRandom(false), month: generateRandom(true) },
            { total: generateRandom(false), month: generateRandom(true) },
          ],
          tasksOverdue: [
            { total: generateRandom(false), month: generateRandom(true) },
            { total: generateRandom(false), month: generateRandom(true) },
            { total: generateRandom(false), month: generateRandom(true) },
            { total: generateRandom(false), month: generateRandom(true) },
            { total: generateRandom(false), month: generateRandom(true) },
          ],
        }"
      />
    </q-card-section>
  </q-card>

  <div class="flex row q-gutter-md">
    <q-card bordered class="q-mt-lg shadow-3 text-center col">
      <q-card-section>
        <span class="text-h5 text-weight-medium"
          >{{ $t('dashboard.graphs.titles.mostUsedCategories') }}</span
        >
        <MostUsedCategoriesChart
          id="most-used-categories-chart"
          :categories="[
            { categoryName: 'a', daysUsed: generateRandom(true) },
            { categoryName: 'b', daysUsed: generateRandom(true) },
            { categoryName: 'c', daysUsed: generateRandom(true) },
            { categoryName: 'd', daysUsed: generateRandom(true) },
            { categoryName: 'e', daysUsed: generateRandom(true) },
          ]"
        />
      </q-card-section>
    </q-card>
    <q-card bordered class="q-mt-lg shadow-3 text-center col">
      <q-card-section>
        <span class="text-h5 text-weight-medium"
          >{{ $t('dashboard.graphs.titles.overdueActivitiesByCategory') }}</span
        >
        <OverdueTaskChart
          id="overdue-task-chart"
          :categories="[
            { categoryName: 'a', overdueTasks: generateRandom(true) },
            { categoryName: 'b', overdueTasks: generateRandom(true) },
            { categoryName: 'c', overdueTasks: generateRandom(true) },
            { categoryName: 'd', overdueTasks: generateRandom(true) },
            { categoryName: 'e', overdueTasks: generateRandom(true) },
          ]"
        />
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import AnnualTaskProgressChart from '../charts/AnnualTaskProgressChart.vue';
import OverdueTaskChart from '../charts/OverdueTaskChart.vue';
import MostUsedCategoriesChart from '../charts/MostUsedCategoriesChart.vue';
import { useI18n } from 'vue-i18n';
useI18n();

function generateRandom(isMonth: boolean): number {
  const number = isMonth ? 10 : 100;
  const randomNumber = Math.random();
  const total = Math.floor(randomNumber * number);
  return total === 0 ? 10 : total;
}
</script>
