<template>
    <app-page>
      <dashboard-top-cards :cards="dashboardCardsData" />
      <dashboard-chart-cards />
    </app-page>
</template>

<script setup lang="ts">
import AppPage from 'src/components/AppPage.vue';
import DashboardTopCards from '../components/dashboard/cards/DashboardTopCards.vue';
import DashboardChartCards from '../components/dashboard/cards/DashboardChartCards.vue';

const dashboardCardsData = [
  {
    goalId: 1,
    tasksCompletedInTheMonth: generateRandomInt(),
    tasksCompletedInTheMonthGoal: generateRandomInt(),
    tasksOverdueInTheMonth: generateRandomInt(),
    tasksInProgressInTheMonth: generateRandomInt(),
    tasksDeletedInTheYear: generateRandomInt(),
  },
  {
    goalId: 1,
    tasksCompletedInTheMonth: generateRandomInt(),
    tasksCompletedInTheMonthGoal: generateRandomInt(),
    tasksOverdueInTheMonth: generateRandomInt(),
    tasksInProgressInTheMonth: generateRandomInt(),
    tasksDeletedInTheYear: generateRandomInt(),
  },
  {
    goalId: 1,
    tasksCompletedInTheMonth: generateRandomInt(),
    tasksCompletedInTheMonthGoal: generateRandomInt(),
    tasksOverdueInTheMonth: generateRandomInt(),
    tasksInProgressInTheMonth: generateRandomInt(),
    tasksDeletedInTheYear: generateRandomInt(),
  },
  {
    goalId: 1,
    tasksCompletedInTheMonth: generateRandomInt(),
    tasksCompletedInTheMonthGoal: generateRandomInt(),
    tasksOverdueInTheMonth: generateRandomInt(),
    tasksInProgressInTheMonth: generateRandomInt(),
    tasksDeletedInTheYear: generateRandomInt(),
  },
  {
    goalId: 1,
    tasksCompletedInTheMonth: generateRandomInt(),
    tasksCompletedInTheMonthGoal: generateRandomInt(),
    tasksOverdueInTheMonth: generateRandomInt(),
    tasksInProgressInTheMonth: generateRandomInt(),
    tasksDeletedInTheYear: generateRandomInt(),
  },
];

function generateRandomInt(): number {
  let randomNumber = Math.random();
  return Math.floor(randomNumber * 100);
}
</script>
