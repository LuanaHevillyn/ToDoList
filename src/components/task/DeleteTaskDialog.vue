<template>
  <app-dialog ref="dialogRef" persistent>
    <template #title>
      <div class="title-container">
        <q-avatar
          size="100px"
          round
          color="deep-orange-2"
          text-color="red-5"
          icon="delete"
        />

        <span class="q-mt-md text-subtitle1 text-weight-medium">{{
          $t('common.actions.task.delete')
        }}</span>
      </div>
    </template>

    <template #form>
      <div class="row justify-center q-gutter-sm q-mb-md">
        <span>{{ $t('common.actions.task.deleteQuestion', { name: taskDetail?.name}) }} </span
        >
        <span class="row justify-center">{{
          $t('common.actions.task.deleteWarning')
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
import { TaskListItem } from 'src/schemas/task.schemas';
import { deleteTask, getTaskById } from 'src/services/task.service';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{ taskId: string }>();
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
const taskDetail = ref<TaskListItem>();
const requestTaskId = ref();

const { handle } = useHandleAsync();
const { t } = useI18n();

async function onDelete() {
  if (!taskDetail.value) return;

  await handle(
    () => deleteTask(requestTaskId.value),
    t('common.feedback.task.deleted')
  );
  onDialogOK();
}

const loadTaskDetail = async () => {
  const result = await handle(() => getTaskById(props.taskId));
  if (!result) return;

  taskDetail.value = { ...result };
  requestTaskId.value = result.id;
};

onMounted(() => {
  loadTaskDetail();
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
