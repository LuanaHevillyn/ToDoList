<template>
  <app-dialog ref="dialogRef" persistent maxWidth="1100px">
    <template #title>
      <div class="fit row justify-between">
        <span class="text-h5 q-mt-sm">{{
          $t('common.titles.history', { entity })
        }}</span>
        <search-field v-model="filter" class="" />
      </div>
    </template>

    <template #form>
      <app-table
        :columns="columns"
        :rows="histories"
        :filter="filter"
        separator="none"
        virtual-scroll
        style="height: 400px"
        :pagination="pagination"
      >
        <template v-slot:body-cell-actionType="props">
          <q-td :props="props">
            <q-badge
              align="middle"
              rounded
              class="q-pa-xs text-deep-purple-6"
              :color="props.value.color"
              outline
            >
              <q-icon :name="props.value.icon" class="q-mr-xs" />
              {{ props.value.label }}
            </q-badge>
          </q-td>
        </template>

        <template v-slot:body-cell-actionDescription="props">
          <q-td :props="props">
            {{ props.value }}
          </q-td>
        </template>

        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <app-button
              flat
              no-caps
              icon="delete"
              class="q-px-xs"
              color="deep-orange-14"
              @click="onDeleteItemHistory(props.row.id)"
            />
          </q-td>
        </template>
      </app-table>
    </template>

    <template #actions>
      <div class="flex justify-between q-mt-md">
        <app-button
          color="deep-orange-10"
          :label="t('common.actions.history.deleteHistory')"
          outline
          no-caps
          :disable="!hasHistories"
          @click="onDeleteAllHistory"
        />
        <app-button
          class="button q-mr-sm"
          :label="t('common.actions.close')"
          outline
          @click="onDialogHide"
        />
      </div>
    </template>
  </app-dialog>
</template>

<script setup lang="ts">
import AppButton from 'src/components/AppButton.vue';
import AppTable from 'src/components/AppTable.vue';
import DeleteHistoryDialog from 'src/components/history/DeleteHistoryDialog.vue';
import DeleteHistoryItemDialog from 'src/components/history/DeleteHistoryItemDialog.vue';
import AppDialog from '../AppDialog.vue';
import SearchField from '../SearchField.vue';

import { QTableColumn, useDialogPluginComponent, useQuasar } from 'quasar';
import { useDateTimeLocalizer } from 'src/helpers/date.helper';
import {
  getHistoryConfig,
  getHistoryDescription,
} from 'src/helpers/enum.helper';
import { HistoryListItem } from 'src/schemas/history.schemas';
import { getAllCategoriesHistories } from 'src/services/category.service';
import { getAllTasksHistories } from 'src/services/task.service';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const $q = useQuasar();
const formatDate = useDateTimeLocalizer();
const { dialogRef, onDialogHide } = useDialogPluginComponent();
const filter = ref('');
const props = defineProps<{ isCategory: boolean }>();
const entity = props.isCategory ? 'Categorias' : 'Tarefas';
const pagination = ref({ sortBy: 'dateTime', descending: true });
const histories = ref<HistoryListItem[]>([]);
const hasHistories = computed(() => histories.value.length > 0);
const columns = computed<QTableColumn<HistoryListItem>[]>(() => [
  {
    name: 'dateTime',
    label: t('common.fields.dateTime'),
    field: 'dateTime',
    align: 'left',
    format: (val) => formatDate.value(val),
    sortable: true,
    sort: (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  },
  {
    name: 'name',
    label: props.isCategory
      ? t('common.titles.category', 2)
      : t('common.titles.task', 2),
    field: 'name',
    align: 'left',
  },
  {
    name: 'actionType',
    label: t('common.fields.actions', 2),
    field: (row) => getHistoryConfig(row.actionType, 'tarefa'),
    align: 'center',
  },
  {
    name: 'actionDescription',
    label: t('common.fields.description'),
    field: (row) => getHistoryDescription(row),
    align: 'left',
  },
  {
    name: 'actions',
    label: '',
    field: () => undefined,
    align: 'center',
    style: 'max-width: 8vw',
  },
]);

const loadHistories = async () => {
  histories.value = props.isCategory
    ? await getAllCategoriesHistories()
    : await getAllTasksHistories();
};

onMounted(() => {
  loadHistories();
});

function onDeleteItemHistory(historyId: string) {
  const isCategory = props.isCategory;
  $q.dialog({
    component: DeleteHistoryItemDialog,
    componentProps: { historyId, isCategory },
  }).onOk(async () => await loadHistories());
}

function onDeleteAllHistory() {
  const isCategory = props.isCategory;
  $q.dialog({
    component: DeleteHistoryDialog,
    componentProps: { histories, isCategory },
  }).onOk(async () => await loadHistories());
}
</script>
