<template>
  <app-page class="q-gutter-y-md">
    <dashboard-top-cards :cards="dashboardCardsData" @goal-updated="loadDashboardCards"/>
    <dashboard-chart-cards />
  </app-page>
</template>

<script setup lang="ts">
import AppPage from 'src/components/AppPage.vue';
import DashboardTopCards from '../components/dashboard/cards/DashboardTopCards.vue';
import DashboardChartCards from '../components/dashboard/cards/DashboardChartCards.vue';

import { useHandleAsync } from 'src/helpers/handleAsync.helper';
import { DashboardCards } from 'src/schemas/dashboard.schemas';
import { getDashboardCards } from 'src/services/dashboard.service';
import { ref, computed, onMounted } from 'vue';

const { handle } = useHandleAsync();
const dashboardCards = ref<DashboardCards[]>();
const dashboardCardsData = computed(() => {
  return ( dashboardCards.value ?? [] );
});

const loadDashboardCards = async () => {
  const result = await handle(() => getDashboardCards());
  if (!result) return;

  dashboardCards.value = result;
};

onMounted(() => {
  loadDashboardCards();
});
</script>
