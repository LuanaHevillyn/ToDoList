<template>
  <app-list-page>
    <template #title>
      <span class="text-h4">{{ $t('common.titles.task') }}</span>
    </template>

    <template #actions>
      <search-field v-model="filter" size="35" />
      <app-button
        icon="add"
        :label="$t('common.actions.task.add')"
        class="q-py-sm"
      />
    </template>

    <template #table>
      <app-table :columns="columns" :rows="rows" :filter="filter">
        <template v-slot:body-cell-priority="props">
          <q-td :props="props">
            <q-badge
              align="middle"
              dense
              rounded
              :color="getPriorityColor(props.row.priority).color"
            >
              <q-icon
                :name="getPriorityColor(props.row.priority).icon"
                color="white"
              />
            </q-badge>
            {{ props.value }}
          </q-td>
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge
              align="middle"
              rounded
              :color="getStatusColor(props.row.status).color"
            >
              <q-icon
                :name="getStatusColor(props.row.status).icon"
                color="white"
                class="q-mr-xs"
              />
              {{ props.value }}
            </q-badge>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat no-caps icon="done_outline" class="q-px-xs" color="light-green-10" />

            <q-btn flat no-caps icon="create" class="q-px-xs" color="grey-9" />

            <q-btn
              flat
              no-caps
              icon="delete_outline"
              class="q-px-xs"
              color="deep-orange-14"
            />
          </q-td>
        </template>
      </app-table>
    </template>
  </app-list-page>
</template>

<script setup lang="ts">
import AppListPage from 'src/components/AppListPage.vue';
import SearchField from 'src/components/SearchField.vue';
import AppButton from 'src/components/AppButton.vue';
import AppTable from 'src/components/AppTable.vue';

import { QTableColumn } from 'quasar';
import { computed, ref } from 'vue';
import { TaskListItem } from 'src/schemas/task.schemas';
import { useI18n } from 'vue-i18n';

const filter = ref('');
const { t } = useI18n();

function getPriorityColor(priority: string): { color: string; icon: string } {
  if (priority === 'high')
    return { color: 'deep-orange-14', icon: 'keyboard_double_arrow_up' };
  if (priority === 'medium') return { color: 'orange', icon: 'arrow_drop_up' };
  if (priority === 'low') return { color: 'green', icon: 'remove' };
  return { color: 'green', icon: 'remove' };
}

function getPriorityLabel(priority: string): string {
  if (priority === 'high') return t('common.priority.high');
  if (priority === 'medium') return t('common.priority.medium');
  if (priority === 'low') return t('common.priority.low');
  return t('common.priority.none');
}

function getStatusColor(status: string): { color: string; icon: string } {
  if (status === 'Completed') return { color: 'green', icon: 'check' };
  if (status === 'InProgress')
    return { color: 'orange', icon: 'hourglass_bottom' };
  if (status === 'Pending') return { color: 'deep-orange-14', icon: 'warning' };
  return { color: 'grey', icon: '' };
}

function getStatusLabel(status: string): string {
  if (status === 'Completed') return t('common.status.completed');
  if (status === 'InProgress') return t('common.status.inProgress');
  if (status === 'Pending') return t('common.status.pending');
  return t('common.status.none');
}

const columns = computed<QTableColumn<TaskListItem>[]>(() => [
  {
    name: 'name',
    label: t('common.fields.name'),
    field: 'name',
    align: 'left',
  },
  {
    name: 'priority',
    label: t('common.fields.priority'),
    field: (row) => getPriorityLabel(row.priority),
    align: 'left',
  },
  {
    name: 'category',
    label: t('common.titles.category'),
    field: 'category',
    align: 'center',
  },
  {
    name: 'dueDate',
    label: t('common.fields.dueDate'),
    field: (row) => row.dueDate.toLocaleDateString(),
    align: 'center',
  },
  {
    name: 'status',
    label: t('common.fields.status'),
    field: (row) => getStatusLabel(row.status),
    align: 'center',
  },
  {
    name: 'actions',
    label: t('common.fields.actions'),
    field: () => undefined,
    align: 'center',
    style: 'max-width: 8vw',
  },
]);

const rows = [
  {
    name: 'Frozen Yogurt',
    category: 'Natação',
    status: 'InProgress',
    priority: 'high',
    dueDate: new Date(),
  },
  {
    name: 'Ice cream sandwich',
    category: 'Estudos',
    status: 'Completed',
    priority: 'medium',
    dueDate: new Date(),
  },
  {
    name: 'Eclair',
    category: 'Trabalho',
    status: 'InProgress',
    priority: 'low',
    dueDate: new Date(),
  },
  {
    name: 'Cupcake',
    category: 'Esportes',
    status: 'Pending',
    priority: 'high',
    dueDate: new Date(),
  },
  {
    name: 'Gingerbread',
    category: 'Leitura',
    status: 'Completed',
    priority: 'medium',
    dueDate: new Date(),
  },
  {
    name: 'Jelly bean',
    category: 'Trabalho',
    status: 'Pending',
    priority: 'high',
    dueDate: new Date(),
  },
  {
    name: 'Lollipop',
    category: 'Natação',
    status: 'InProgress',
    priority: 'high',
    dueDate: new Date(),
  },
  {
    name: 'Honeycomb',
    category: 'Estudos',
    status: 'InProgress',
    priority: 'high',
    dueDate: new Date(),
  },
  {
    name: 'Donut',
    category: 'Trabalho',
    status: 'Completed',
    priority: 'high',
    dueDate: new Date(),
  },
  {
    name: 'KitKat',
    category: 'Trabalho',
    status: 'Completed',
    priority: 'high',
    dueDate: new Date(),
  },
];
</script>

<style lang="scss" scoped>
:deep(thead tr:first-child) {
  background-color: #fbf6ff;
}

:deep(.q-table__bottom) {
  background-color: #f6ebff;
}
</style>
