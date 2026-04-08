<template>
  <app-list-page>
    <template #title>
      <span class="text-h4">{{ $t('common.titles.category') }}</span>
    </template>
    <template #actions>
      <search-field v-model="filter" size="35" />
      <app-button icon="add" :label="$t('common.actions.category.add')" class="q-py-sm" @click="onCreateCategory" />
    </template>

    <template #table>
      <app-table :columns="columns" :rows="categories" :filter="filter">
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn flat no-caps icon="edit" class="q-px-xs" color="grey-10" />

            <q-btn flat no-caps icon="delete_outline" class="q-px-xs" color="deep-orange-14" />
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

import { QTableColumn, useQuasar } from 'quasar';
import { computed, onMounted, ref } from 'vue';
import { CategoryListItem } from 'src/schemas/category.schemas';
import { useI18n } from 'vue-i18n';
import CategoryFormDialog from 'src/components/CategoryFormDialog.vue';
import {
  createCategory,
  getAllCategories,
} from 'src/services/category.service';
import { useHandleAsync } from 'src/helpers/handleAsync.helper';
import { useDateLocalizer } from 'src/helpers/date.helper';

const filter = ref('');
const { t } = useI18n();
const $q = useQuasar();
const { handle } = useHandleAsync();
const formatDate = useDateLocalizer();

const categories = ref<CategoryListItem[]>([]);
const columns = computed<QTableColumn<CategoryListItem>[]>(() => [
  {
    name: 'name',
    label: t('common.fields.name'),
    field: 'name',
    align: 'left',
  },
  {
    name: 'description',
    label: t('common.fields.description'),
    field: 'description',
    align: 'left',
  },
  {
    name: 'createdAt',
    label: t('common.fields.createdAt'),
    field: (row) => formatDate.value(row.createdAt),
    align: 'center',
  },
  {
    name: 'numberOfTasks',
    label: t('common.fields.numberOfTasks'),
    field: 'numberOfTasks',
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

function onCreateCategory() {
  $q.dialog({
    component: CategoryFormDialog,
  }).onOk(async (data) => {
    const result = await handle(() => createCategory(data), t('common.feedback.categoryCreated'));
    if (result == null) return;
    await loadCategories();
  });
}

const loadCategories = async () => {
  categories.value = await getAllCategories();
};

onMounted(() => {
  loadCategories();
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
