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
          $t('common.actions.category.delete')
        }}</span>
      </div>
    </template>

    <template #form>
      <div class="row justify-center q-my-lg">
        <span>{{ $t('common.actions.category.deleteQuestion', { name: categoryDetail?.name}) }} </span
        >
        <span class="q-mt-sm">{{
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
import AppButton from '../AppButton.vue';
import AppDialog from '../AppDialog.vue';

import { useDialogPluginComponent } from 'quasar';
import { useHandleAsync } from 'src/helpers/handleAsync.helper';
import { CategoryListItem } from 'src/schemas/category.schemas';
import { deleteCategory, getCategoryById } from 'src/services/category.service';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const props = defineProps<{ categoryId: string }>();
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
const categoryDetail = ref<CategoryListItem>();
const requestCategoryId = ref();

const { handle } = useHandleAsync();
const { t } = useI18n();

async function onDelete() {
  if (!categoryDetail.value) return;

  await handle(
    () => deleteCategory(requestCategoryId.value),
    t('common.feedback.category.deleted')
  );
  onDialogOK();
}

const loadCategoryDetail = async () => {
  const result = await handle(() => getCategoryById(props.categoryId));
  if (!result) return;

  categoryDetail.value = { ...result };
  requestCategoryId.value = result.id;
};

onMounted(() => {
  loadCategoryDetail();
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
