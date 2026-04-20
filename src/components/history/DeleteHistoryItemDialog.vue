<template>
  <app-dialog ref="dialogRef" persistent>
    <template #title>
      <div class="title-container">
        <q-avatar
          size="100px"
          round
          color="deep-orange-2"
          text-color="red-5"
          icon="delete_forever"
        />

        <span class="q-mt-md text-subtitle1 text-weight-medium">{{
          $t('common.actions.history.deleteHistoryItem')
        }}</span>
      </div>
    </template>

    <template #form>
      <div class="q-gutter-sm q-mb-md">
        <span class="row justify-center">
          {{ $t('common.actions.history.deleteItemQuestion') }}</span
        >
        <div class="column">
          <span class="text-center col">
            {{ t('common.fields.dateTime') }}:
            <strong>{{ historyDateAndTime }}</strong></span
          >
          <span class="text-center col">
            {{ t('common.fields.name') }}:
            <strong>{{ historyName }}</strong></span
          >
          <span class="text-center col">
            {{ t('common.fields.actions', 2) }}:
            <strong>{{ historyType }}</strong>
          </span>
          <span class="text-center col">
            {{ t('common.fields.description') }}:
            <strong>{{ historyDescription }}</strong></span
          >
        </div>

        <span class="row justify-center">{{
          $t('common.actions.category.deleteWarning')
        }}</span>
      </div>
    </template>

    <template #actions>
      <div class="row justify-end">
        <app-button
          class="button q-mr-sm"
          :label="t('common.actions.cancel')"
          outline
          @click="onDialogHide"
        />
        <app-button
          class="button"
          :label="t('common.actions.confirm')"
          @click="onDelete"
        />
      </div>
    </template>
  </app-dialog>
</template>

<script setup lang="ts">
import { useDateTimeLocalizer } from 'src/helpers/date.helper';
import AppButton from '../AppButton.vue';
import AppDialog from '../AppDialog.vue';

import { useDialogPluginComponent } from 'quasar';
import { getHistoryMessage, getHistoryType } from 'src/helpers/enum.helper';
import { useHandleAsync } from 'src/helpers/handleAsync.helper';
import { HistoryListItem } from 'src/schemas/history.schemas';
import {
  deleteCategoryHistoryItem,
  getCategoryHistoryById,
} from 'src/services/category.service';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{ historyId: string; isCategory: boolean }>();
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
const { handle } = useHandleAsync();
const { t } = useI18n();
const formatDate = useDateTimeLocalizer();
const historyDetail = ref<HistoryListItem>();
const requestHistoryId = ref();
const historyName = computed(() => historyDetail.value?.name);
const historyType = computed(() =>
  getHistoryType(historyDetail.value?.actionType ?? null, 'categoria')
);
const historyDescription = computed(() =>
  getHistoryMessage(historyDetail.value ?? null)
);
const historyDateAndTime = computed(() =>
  historyDetail.value?.dateTime
    ? formatDate.value(historyDetail.value.dateTime)
    : ''
);

async function onDelete() {
  if (!historyDetail.value) return;
  if (props.isCategory)
    await handle(
      () => deleteCategoryHistoryItem(requestHistoryId.value),
      t('common.feedback.history.itemDeleted')
    );
  onDialogOK();
}

const loadCategoryHistoryDetail = async () => {
  const result = await handle(() => getCategoryHistoryById(props.historyId));
  if (!result) return;

  historyDetail.value = { ...result };
  requestHistoryId.value = result.id;
};

onMounted(() => {
  if (props.isCategory) loadCategoryHistoryDetail();
});
</script>

<style scoped lang="scss">
.title-container {
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
