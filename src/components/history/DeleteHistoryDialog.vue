<template>
  <app-dialog ref="dialogRef" persistent>
    <template #title>
      <div class="title-container">
        <q-avatar
          size="100px"
          round
          color="deep-orange-2"
          text-color="red-5"
          icon="sym_o_delete_history"
        />

        <span class="q-mt-md text-subtitle1 text-weight-medium">{{
          $t('common.actions.history.deleteHistory')
        }}</span>
      </div>
    </template>

    <template #form>
      <div class="q-my-lg">
        <span class="row justify-center q-mb-sm">
          {{ $t('common.actions.history.deleteAllQuestion') }}</span
        >
        <span class="row justify-center q-mt-sm">{{
          $t('common.actions.history.deleteWarning')
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
import AppButton from '../AppButton.vue';
import AppDialog from '../AppDialog.vue';

import { useDialogPluginComponent } from 'quasar';
import { useHandleAsync } from 'src/helpers/handleAsync.helper';
import { HistoryListItem } from 'src/schemas/history.schemas';
import {
  deleteAllCategoriesHistories,
  getAllCategoriesHistories,
} from 'src/services/category.service';
import {
  deleteAllTasksHistories,
  getAllTasksHistories,
} from 'src/services/task.service';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{
  histories: HistoryListItem[];
  isCategory: boolean;
}>();
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
const historyDetail = ref<HistoryListItem[]>();

const { handle } = useHandleAsync();
const { t } = useI18n();
async function onDelete() {
  if (!historyDetail.value) return;
  await handle(
    () =>
      props.isCategory
        ? deleteAllCategoriesHistories()
        : deleteAllTasksHistories(),
    t('common.feedback.history.allDeleted')
  );
  onDialogOK();
}

const loadHistories = async () => {
  const result = await handle(() =>
    props.isCategory ? getAllCategoriesHistories() : getAllTasksHistories()
  );
  if (!result) return;

  historyDetail.value = { ...result };
};

onMounted(() => {
  loadHistories();
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
