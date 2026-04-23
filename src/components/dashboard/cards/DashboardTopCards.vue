<template>
  <div class="row q-col-gutter-x-md">
    <div
      class="col-12 col-md-3 q-mt-sm"
      v-for="card in computedCards"
      :key="card.goalId"
    >
      <task-dashboard-card
        :title="card.title"
        :goal="card.goal"
        :footer="card.footer"
        :icon="card.icon"
        :current="card.current"
        @goal-updated="$emit('goal-updated')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskDashboardCard from './TaskDashboardCard.vue';

import { DashboardCards } from 'src/schemas/dashboard.schemas';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const props = defineProps<{ cards: DashboardCards[] }>();
const computedCards = computed(() => {
  if (props.cards.length === 0) return [];

  return [
    {
      goalId: props.cards[0].goalId,
      title: t('dashboard.cards.titles.completed'),
      icon: 'check_circle_outline',
      footer: {
        right: t('dashboard.cards.footer.thisMonth'),
        left: t('dashboard.cards.footer.goal'),
      },
      current: props.cards[0].tasksCompletedInTheMonth ?? 0,
      goal: props.cards[0].cardGoal ?? null,
    },
    {
      goalId: props.cards[1].goalId,
      title: t('dashboard.cards.titles.pending'),
      icon: 'hourglass_empty',
      footer: {
        right: t('dashboard.cards.footer.thisMonth'),
      },
      current: props.cards[1].tasksPendingInTheMonth ?? 0,
      goal: props.cards[1].cardGoal ?? null,
    },
    {
      goalId: props.cards[2].goalId,
      title: t('dashboard.cards.titles.overdue'),
      icon: 'error_outline',
      footer: {
        right: t('dashboard.cards.footer.thisMonth'),
      },
      current: props.cards[2].tasksOverdueInTheMonth ?? 0,
      goal: props.cards[2].cardGoal ?? null,
    },
    {
      goalId: props.cards[3].goalId,
      title: t('dashboard.cards.titles.priorityHigh'),
      icon: 'keyboard_double_arrow_up',
      footer: {
        right: t('dashboard.cards.footer.thisMonth'),
      },
      current: props.cards[3].tasksWithPriorityHighInTheMonth ?? 0,
      goal: props.cards[3].cardGoal ?? null,
    },
  ];
});

defineEmits<{
  (e: 'goal-updated'): void;
}>();
</script>
