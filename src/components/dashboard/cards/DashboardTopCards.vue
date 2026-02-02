<template>
  <div class="row q-gutter-lg">
    <div class="col" v-for="card in computedCards" :key="card.goalId">
      <task-dashboard-card :title="card.title" :goal="card.goal" :footer="card.footer" :icon="card.icon"
        :current="card.current" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { TaskDashboardCardItem } from 'src/schemas/dashboard.schemas';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import TaskDashboardCard from './TaskDashboardCard.vue';

const { t } = useI18n();
const props = defineProps<{
  cards: TaskDashboardCardItem[];
}>();

const computedCards = computed(() => {
  if (!props.cards) return [];

  return [
    {
      goalId: props.cards[0].goalId,
      title: t('dashboard.cards.titles.completed'),
      icon: 'check_circle_outline',
      footer: {
        right: t('dashboard.cards.footer.thisMonth'),
        left: t('dashboard.cards.footer.goal'),
      },
      current: props.cards[0].tasksCompletedInTheMonth,
      goal: props.cards[0].tasksCompletedInTheMonthGoal,
    },
    {
      goalId: props.cards[1].goalId,
      title: t('dashboard.cards.titles.inProgress'),
      icon: 'hourglass_empty',
      footer: {
        right: t('dashboard.cards.footer.thisMonth'),
      },
      current: props.cards[1].tasksInProgressInTheMonth,
    },
    {
      goalId: props.cards[2].goalId,
      title: t('dashboard.cards.titles.overdue'),
      icon: 'error_outline',
      footer: {
        right: t('dashboard.cards.footer.thisMonth'),
      },
      current: props.cards[2].tasksOverdueInTheMonth,
    },
    {
      goalId: props.cards[3].goalId,
      title: t('dashboard.cards.titles.deleted'),
      icon: 'delete_outline',
      footer: {
        right: t('dashboard.cards.footer.thisYear'),
      },
      current: props.cards[3].tasksDeletedInTheYear,
    },
  ];
});
</script>
