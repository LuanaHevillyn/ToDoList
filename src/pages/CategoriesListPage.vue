<template>
  <app-list-page has-separator>
    <template #title>
      <span class="text-h4">{{ $t('common.titles.category') }}</span>
    </template>
    <template #actions>
      <search-field v-model="filter" />
      <app-button
        icon="add"
        :label="$t('common.actions.category.add')"
        class="q-py-sm"
        @click="onCreateCategory"
      />
    </template>

    <template #table>
      <app-table
        :columns="columns"
        :rows="categories"
        :filter="filter"
        :pagination="pagination"
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <app-button
              flat
              no-caps
              icon="edit"
              class="q-px-xs"
              color="grey-10"
              @click="onEditCategory(props.row.id)"
            />
            <app-button
              flat
              no-caps
              icon="delete_outline"
              class="q-px-xs"
              color="deep-orange-14"
              @click="onDeleteCategory(props.row.id)"
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
import CreateCategoryDialog from 'src/components/category/CreateCategoryDialog.vue';
import EditCategoryDialog from 'src/components/category/EditCategoryDialog.vue';
import DeleteCategoryDialog from 'src/components/category/DeleteCategoryDialog.vue';
import SearchField from 'src/components/SearchField.vue';
import HistoryDialog from 'src/components/history/HistoryDialog.vue';

import { QTableColumn, useQuasar } from 'quasar';
import { useDateLocalizer } from 'src/helpers/date.helper';
import { CategoryListItem } from 'src/schemas/category.schemas';
import { getAllCategories } from 'src/services/category.service';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const filter = ref('');
const { t } = useI18n();
const $q = useQuasar();
const formatDate = useDateLocalizer();
const categories = ref<CategoryListItem[]>([]);
const pagination = { sortBy: 'dateTime', descending: true };
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
    field: 'createdAt',
    align: 'center',
    format: (val) => formatDate.value(val),
    sortable: true,
    sort: (a, b) => new Date(b).getTime() - new Date(a).getTime(),
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
    component: CreateCategoryDialog,
  }).onOk(async () => await loadCategories());
}

function onEditCategory(categoryId: string) {
  $q.dialog({
    component: EditCategoryDialog,
    componentProps: { categoryId },
  }).onOk(async () => await loadCategories());
}

function onDeleteCategory(categoryId: string) {
  $q.dialog({
    component: DeleteCategoryDialog,
    componentProps: { categoryId },
  }).onOk(async () => await loadCategories());
}

function onHistory() {
  $q.dialog({
    component: HistoryDialog,
    componentProps: { isCategory: true },
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
