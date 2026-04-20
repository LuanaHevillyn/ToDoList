<template>
  <app-dialog ref="dialogRef" persistent maxWidth="1100px">
    <template #title>
      <div class="fit row justify-between">
        <span class="text-h5 q-mt-sm">{{
          $t('common.titles.history', { entity: 'categoria' })
        }}</span>
        <search-field v-model="filter" size="35" class="" />
      </div>
    </template>

    <template #form>
      <app-table
        :columns="columns"
        :rows="categoriesHistories"
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
              :color="getHistory(props.value).color"
              outline
            >
              <q-icon :name="getHistory(props.value).icon" class="q-mr-xs" />
              {{ getHistoryType(props.row.actionType, 'categoria') }}
            </q-badge>
          </q-td>
        </template>

        <template v-slot:body-cell-actionDescription="props">
          <q-td :props="props">
            {{ getHistoryMessage(props.row) }}
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
            />
          </q-td>
        </template>
      </app-table>
    </template>

    <template #actions>
      <div class="flex justify-end q-mt-md">
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
import AppDialog from '../AppDialog.vue';
import SearchField from '../SearchField.vue';

import { QTableColumn, useDialogPluginComponent } from 'quasar';
import { useDateTimeLocalizer } from 'src/helpers/date.helper';
import { getHistoryMessage, getHistoryType } from 'src/helpers/enum.helper';
import { HistoryAction, HistoryListItem } from 'src/schemas/history.schemas';
import { getAllCategoriesHistories } from 'src/services/category.service';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const formatDate = useDateTimeLocalizer();
const { dialogRef, onDialogHide } = useDialogPluginComponent();
const filter = ref('');
const pagination = ref({ sortBy: 'dateTime', descending: true });
const categoriesHistories = ref<HistoryListItem[]>([]);
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
    name: 'categoryName',
    label: t('common.titles.category', 2),
    field: 'categoryName',
    align: 'left',
  },
  {
    name: 'actionType',
    label: t('common.fields.actions', 2),
    field: 'actionType',
    align: 'center',
  },
  {
    name: 'actionDescription',
    label: t('common.fields.description'),
    field: 'actionDescription',
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

const loadCategoriesHistories = async () => {
  categoriesHistories.value = await getAllCategoriesHistories();
};

onMounted(() => {
  loadCategoriesHistories();
});

function getHistory(priority: string): { color: string; icon: string } {
  if (priority === HistoryAction.CREATE)
    return { color: 'green', icon: 'bi-plus-circle-fill' };
  if (priority === HistoryAction.UPDATE)
    return { color: 'deep-purple-2', icon: 'edit' };
  if (priority === HistoryAction.DELETE)
    return { color: 'deep-orange-10', icon: 'delete' };
  if (priority === HistoryAction.INCREMENT)
    return { color: 'deep-purple-2', icon: 'add' };
  if (priority === HistoryAction.DECREMENT)
    return { color: 'deep-orange-6', icon: 'remove' };
  return { color: '', icon: '' };
}
</script>
