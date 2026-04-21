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
              :color="getPriority(props.row.priority).color"
            >
              <q-icon
                :name="getPriority(props.row.priority).icon"
                color="white"
              />
            </q-badge>
            {{ props.value }}
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
              :color="getStatus(props.row.status).color"
            >
              <q-icon
                :name="getStatus(props.row.status).icon"
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
    </template>
  </app-list-page>
</template>

<script setup lang="ts">
import AppButton from 'src/components/AppButton.vue';
import AppListPage from 'src/components/AppListPage.vue';
import AppTable from 'src/components/AppTable.vue';
import SearchField from 'src/components/SearchField.vue';
import CreateTaskDialog from 'src/components/task/CreateTaskDialog.vue';
import TaskStatusConfirmDialog from 'src/components/task/TaskStatusConfirmDialog.vue';
import EditTaskDialog from 'src/components/task/EditTaskDialog.vue';
import DeleteTaskDialog from 'src/components/task/DeleteTaskDialog.vue';

import { QTableColumn, useQuasar } from 'quasar';
import { Priority, Status, TaskListItem } from 'src/schemas/task.schemas';
import { getAllTasks } from 'src/services/task.service';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useDateLocalizer } from 'src/helpers/date.helper';

const filter = ref('');
const { t } = useI18n();
const $q = useQuasar();
const formatDate = useDateLocalizer();
const tasks = ref<TaskListItem[]>([]);
const pagination = ref({ sortBy: 'dateTime', descending: true });
function getPriority(priority: string): {
  color: string;
  icon: string;
  label: string;
} {
  if (priority === Priority.HIGH)
    return {
      color: 'deep-orange-14',
      icon: 'keyboard_double_arrow_up',
      label: t('common.priority.high'),
    };
  if (priority === Priority.MEDIUM)
    return {
      color: 'orange',
      icon: 'arrow_drop_up',
      label: t('common.priority.medium'),
    };
  if (priority === Priority.LOW)
    return { color: 'green', icon: 'remove', label: t('common.priority.low') };
  return { color: 'green', icon: 'remove', label: t('common.priority.none') };
}

function getStatus(status: string): {
  color: string;
  icon: string;
  label: string;
} {
  if (status === Status.DELAYED)
    return {
      color: 'deep-orange-14',
      icon: 'hourglass_bottom',
      label: t('common.status.delayed'),
    };
  if (status === Status.COMPLETED)
    return {
      color: 'green',
      icon: 'check',
      label: t('common.status.completed'),
    };
  if (status === Status.IN_PROGRESS)
    return {
      color: 'deep-purple-5',
      icon: 'hourglass_top',
      label: t('common.status.inProgress'),
    };
  if (status === Status.PENDING)
    return {
      color: 'orange',
      icon: 'warning',
      label: t('common.status.pending'),
    };
  return { color: 'grey', icon: '', label: t('common.status.none') };
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
    field: (row) => getPriority(row.priority).label,
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
    field: (row) => getStatus(row.status),
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
