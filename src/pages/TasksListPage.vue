<template>
  <app-list-page has-separator>
    <template #title>
      <span class="text-h4">{{ $t('common.titles.task') }}</span>
    </template>

    <template #actions>
      <search-field v-model="filter" size="35" />
      <app-button
        icon="add"
        :label="$t('common.actions.task.add')"
        class="q-py-sm"
        @click="onCreateTask"
      />
    </template>

    <template #table>
      <app-table
        :columns="columns"
        :rows="tasks"
        :filter="filter"
        :pagination="pagination"
      >
        <template v-slot:body-cell-priority="props">
          <q-td :props="props">
            <q-badge
              align="middle"
              dense
              rounded
              :color="props.value.color"
            >
              <q-icon
                :name="props.value.icon"
                color="white"
              />
            </q-badge>
            {{ props.value.label }}
          </q-td>
        </template>

        <template v-slot:body-cell-category="props">
          <q-td :props="props">
            {{ props.value.name }}
          </q-td>
        </template>

        <template v-slot:body-cell-status="props">
          <q-td :props="props">
            <q-badge
              align="middle"
              rounded
              :color="props.value.color"
            >
              <q-icon
                :name="props.value.icon"
                color="white"
                class="q-mr-xs"
              />
              {{ props.value.label }}
            </q-badge>
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <app-button
              flat
              no-caps
              icon="done_outline"
              class="q-px-xs"
              color="light-green-10"
              v-if="
                props.row.status === Status.IN_PROGRESS ||
                props.row.status === Status.DELAYED
              "
              @click="onCompleteTask(props.row.id)"
            >
              <q-tooltip>Concluir tarefa</q-tooltip>
            </app-button>

            <app-button
              flat
              no-caps
              icon="bi-play"
              class="q-px-xs"
              color="light-green-10"
              v-if="props.row.status === Status.PENDING"
              @click="onStartTask(props.row.id)"
            >
              <q-tooltip>Começar tarefa</q-tooltip>
            </app-button>

            <app-button
              flat
              no-caps
              icon="edit"
              class="q-px-xs"
              color="grey-9"
              v-if="props.row.status !== Status.COMPLETED"
              @click="onEditTask(props.row.id)"
            />

            <app-button
              flat
              no-caps
              icon="delete_outline"
              class="q-px-xs"
              color="deep-orange-14"
              @click="onDeleteTask(props.row.id)"
            />
          </q-td>
        </template>
      </app-table>
      <app-button
        class="q-mt-sm"
        flat
        color="deep-purple-6"
        :label="$t('common.actions.history.view')"
        no-caps
        icon="bi-hourglass-split"
        @click="onHistory"
      />
    </template>
  </app-list-page>
</template>

<script setup lang="ts">
import AppButton from 'src/components/AppButton.vue';
import AppListPage from 'src/components/AppListPage.vue';
import AppTable from 'src/components/AppTable.vue';
import SearchField from 'src/components/SearchField.vue';
import CreateTaskDialog from 'src/components/task/CreateTaskDialog.vue';
import DeleteTaskDialog from 'src/components/task/DeleteTaskDialog.vue';
import EditTaskDialog from 'src/components/task/EditTaskDialog.vue';
import TaskStatusConfirmDialog from 'src/components/task/TaskStatusConfirmDialog.vue';
import HistoryDialog from 'src/components/history/HistoryDialog.vue';

import { QTableColumn, useQuasar } from 'quasar';
import { useDateLocalizer } from 'src/helpers/date.helper';
import { getPriorityConfig, getStatusConfig } from 'src/helpers/enum.helper';
import { Status, TaskListItem } from 'src/schemas/task.schemas';
import { getAllTasks } from 'src/services/task.service';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const filter = ref('');
const { t } = useI18n();
const $q = useQuasar();
const formatDate = useDateLocalizer();
const tasks = ref<TaskListItem[]>([]);
const pagination = ref({ sortBy: 'dateTime', descending: true });

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
    field: (row) => getPriorityConfig(row.priority),
    align: 'left',
  },
  {
    name: 'category',
    label: t('common.titles.category', 2),
    field: 'category',
    align: 'center',
  },
  {
    name: 'dueDate',
    label: t('common.fields.dueDate'),
    field: 'dueDate',
    align: 'center',
    format: (val) => formatDate.value(val),
    sortable: true,
    sort: (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  },
  {
    name: 'status',
    label: t('common.fields.status'),
    field: (row) => getStatusConfig(row.status),
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

function onCreateTask() {
  $q.dialog({
    component: CreateTaskDialog,
  }).onOk(async () => await loadTasks());
}

function onCompleteTask(taskId: string) {
  $q.dialog({
    component: TaskStatusConfirmDialog,
    componentProps: { taskId, isStarting: false },
  }).onOk(async () => await loadTasks());
}

function onStartTask(taskId: string) {
  $q.dialog({
    component: TaskStatusConfirmDialog,
    componentProps: { taskId, isStarting: true },
  }).onOk(async () => await loadTasks());
}

function onEditTask(taskId: string) {
  $q.dialog({
    component: EditTaskDialog,
    componentProps: { taskId },
  }).onOk(async () => await loadTasks());
}

function onDeleteTask(taskId: string) {
  $q.dialog({
    component: DeleteTaskDialog,
    componentProps: { taskId },
  }).onOk(async () => await loadTasks());
}

function onHistory() {
  $q.dialog({
    component: HistoryDialog,
    componentProps: { isCategory: false },
  });
}

const loadTasks = async () => {
  tasks.value = await getAllTasks();
};

onMounted(() => {
  loadTasks();
});
</script>

<style lang="scss" scoped>
:deep(thead tr:first-child) {
  background-color: #fbf6ff;
}

:deep(.q-table__bottom) {
  background-color: #f6ebff;
}
</style>
