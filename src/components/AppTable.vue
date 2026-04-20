<template>
  <q-table
    :rows="rows"
    :columns="columns"
    row-key="id"
    class="app-table"
    table-header-class="text-h4"
    :rows-per-page-options="options"
    :filter="filter"
    :separator="separator"
  >
    <template
      v-for="column in columns"
      :key="column.name"
      v-slot:[`body-cell-${column.name}`]="props"
    >
      <slot :name="`body-cell-${column.name}`" v-bind="props">
        <q-td :props="props">
          {{ props.value }}
        </q-td>
      </slot>
    </template>

    <template v-slot:no-data="{ message }">
      <div class="full-width row flex-center text-accent q-gutter-sm">
        <q-icon size="2em" name="sentiment_dissatisfied" />
        <span> {{ message }} </span>
      </div>
    </template>
  </q-table>
</template>

<script setup lang="ts" generic="Row extends Record<string, any>">
import { QTableColumn, QTableProps } from 'quasar';

defineProps<
  QTableProps & {
    columns?: QTableColumn<Row>[];
    rows?: Row[];
    filter?: string;
    separator?: string;
  }
>();

const options = [7, 10, 15, 20, 25, 30, 35, 50];
</script>

<style scoped lang="scss">
.app-table :deep(thead tr:first-child) {
  background-color: #f4f2fd;
}

.app-table :deep(.q-table__bottom) {
  background-color: #f4f2fd;
}
</style>
