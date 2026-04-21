<template>
  <app-dialog ref="dialogRef" persistent>
    <template #title>
      <div class="title-container">
        <q-avatar
          size="100px"
          round
          color="deep-purple-1"
          text-color="purple-5"
          icon="bi-play"
        />

        <span class="q-mt-md text-subtitle1 text-weight-medium">{{
          title
        }}</span>
      </div>
    </template>

    <template #form>
      <div class="row justify-center">
        <span class="q-ma-xs text-center"
          >Deseja {{ action }} esta tarefa? O status será alterado para "<strong
            >{{ getStatusConfig(status).label }}</strong
          >".</span
        >

        <span
          class="text-center q-my-sm"
          v-if="taskDetail?.status === Status.PENDING"
          >Caso o prazo de conclusão seja ultrapassado, o status será atualizado
          automaticamente para "<strong>{{
            getStatusConfig(Status.DELAYED).label
          }}</strong
          >".</span
        >
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
          @click="onComplete"
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
import { Status, TaskListItem } from 'src/schemas/task.schemas';
import { getTaskById, updateTaskStatusById } from 'src/services/task.service';
import { computed, onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { getStatusConfig } from 'src/helpers/enum.helper';

const props = defineProps<{ taskId: string; isStarting: boolean }>();
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
const taskDetail = ref<TaskListItem>();
const requestTaskId = ref();
const taskName = computed(() => taskDetail.value?.name || '');
const title = computed(() =>
  props.isStarting
    ? `Iniciar tarefa "${taskName.value}"`
    : `Completar tarefa "${taskName.value}"`
);
const action = computed(() => (props.isStarting ? 'iniciar' : 'completar'));
const status = computed(() =>
  props.isStarting ? Status.IN_PROGRESS : Status.COMPLETED
);

const { handle } = useHandleAsync();
const { t } = useI18n();

async function onComplete() {
  if (!taskDetail.value) return;

  await handle(
    () => updateTaskStatusById(requestTaskId.value, props.isStarting),
    'Tarefa iniciada!'
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
