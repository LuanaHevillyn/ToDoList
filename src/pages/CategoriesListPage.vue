<template>
  <app-list-page>
    <template #title>
      <span class="text-h4">{{ $t('common.titles.category') }}</span>
    </template>
    <template #actions>
      <search-field v-model="filter" size="35" />
      <app-button icon="add" :label="$t('common.actions.category.add')" class="q-py-sm" />
    </template>

    <template #table>
      <app-table :columns="columns" :rows="rows" :filter="filter">

        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge align="middle" rounded :color="getStatusColor(props.row.status).color">
              <q-icon :name="getStatusColor(props.row.status).icon" class="q-mr-xs" />
              {{ props.value }}
            </q-badge>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat no-caps icon="edit" class="q-px-xs" color="grey-10" />

            <q-btn flat no-caps icon="delete" class="q-px-xs" color="deep-orange-14" />
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
import { CategoryListItem } from 'src/schemas/category.schemas';
import { useI18n } from 'vue-i18n';

const filter = ref('');
const { t } = useI18n();

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
  return 'Nenhuma';
}

const columns = computed<QTableColumn<CategoryListItem>[]>(() => [
  {
    name: 'name',
    label: t('common.fields.name'),
    field: 'name',
    align: 'left',
  },
  {
    name: 'createdAt',
    label: t('common.fields.createdAt'),
    field: (row) => row.createdAt.toLocaleDateString(),
    align: 'center',
  },
  {
    name: 'numberOfTasks',
    label: t('common.fields.numberOfTasks'),
    field: 'numberOfTasks',
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
    status: 'InProgress',
    numberOfTasks: 10,
    createdAt: new Date(),
  },
  {
    name: 'Ice cream sandwich',
    status: 'Completed',
    numberOfTasks: 10,
    createdAt: new Date(),
  },
  {
    name: 'Eclair',
    status: 'InProgress',
    numberOfTasks: 10,
    createdAt: new Date(),
  },
  {
    name: 'Cupcake',
    status: 'Pending',
    numberOfTasks: 10,
    createdAt: new Date(),
  },
  {
    name: 'Gingerbread',
    status: 'Completed',
    numberOfTasks: 10,
    createdAt: new Date(),
  },
  {
    name: 'Jelly bean',
    status: 'Pending',
    numberOfTasks: 10,
    createdAt: new Date(),
  },
  {
    name: 'Lollipop',
    status: 'InProgress',
    numberOfTasks: 10,
    createdAt: new Date(),
  },
  {
    name: 'Honeycomb',
    status: 'InProgress',
    numberOfTasks: 10,
    createdAt: new Date(),
  },
  {
    name: 'Donut',
    status: 'Completed',
    numberOfTasks: 10,
    createdAt: new Date(),
  },
  {
    name: 'KitKat',
    status: 'Completed',
    numberOfTasks: 10,
    createdAt: new Date(),
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
