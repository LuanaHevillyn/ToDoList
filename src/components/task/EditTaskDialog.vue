<template>
  <app-dialog ref="dialogRef" persistent>
    <template #title>
      <div class="row items-center q-gutter-md">
        <q-avatar
          rounded
          color="deep-purple-1"
          text-color="deep-purple-6"
          icon="edit"
        />

        <div class="column">
          <span class="text-h5">{{ $t('common.actions.task.add') }}</span>
          <span class="text-caption text-grey-7">
            {{ $t('common.actions.task.addDescription') }}
          </span>
        </div>
      </div>
    </template>

    <template #form>
      <q-form @submit.prevent.stop="onSubmit">
        <span class="text-body2">{{ t('common.fields.name') }} *</span>
        <q-input
          dense
          v-model="taskName"
          :label="t('common.placeholder.name')"
          color="deep-purple-6"
          outlined
          :error="!!errors.name"
          :error-message="errors.name"
          maxlength="50"
          counter
        >
          <template #prepend>
            <div class="input-icon">
              <q-icon name="sym_o_label" color="deep-purple-6" />
            </div>
          </template>
        </q-input>

        <span class="text-body2">{{ t('common.fields.priority') }} *</span>
        <q-select
          dense
          v-model="taskPriority"
          :options="priorityOptions"
          :label="t('common.placeholder.priority')"
          color="deep-purple-6"
          outlined
          :error="!!errors.priority"
          :error-message="errors.priority"
          clearable
          emit-value
          map-options
        >
          <template #prepend>
            <div class="input-icon">
              <q-icon name="o_push_pin" color="deep-purple-6" />
            </div>
          </template> 

          <template v-slot:option="{ itemProps, opt }">
            <q-item v-bind="itemProps">
              <q-item-section>
                <q-item-label>{{ opt.label }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-badge
                  align="middle"
                  dense
                  rounded
                  :color="getPriority(opt.value).color"
                >
                  <q-icon :name="getPriority(opt.value).icon" color="white" />
                </q-badge>
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <span class="text-body2">{{ t('common.titles.category') }} *</span>
        <q-select
          dense
          v-model="taskCategory"
          :options="categories"
          :label="t('common.placeholder.category')"
          color="deep-purple-6"
          outlined
          :error="!!errors.categoryId"
          :error-message="errors.categoryId"
          option-label="name"
        >
          <template #prepend>
            <div class="input-icon">
              <q-icon name="sym_o_stacks" color="deep-purple-6" />
            </div>
          </template>

          <template v-slot:no-option>
            <q-item>
              <q-item-section class="text-italic text-grey">
                Sem categorias disponível
              </q-item-section>
            </q-item>
          </template>
        </q-select>

        <span class="text-body2">{{ t('common.fields.dueDate') }} *</span>
        <q-input
          dense
          v-model="taskDueDate"
          :label="t('common.placeholder.dueDate')"
          color="deep-purple-6"
          readonly
          outlined
          :error="!!errors.dueDate"
          :error-message="errors.dueDate"
          @click="showDatePicker = true"
        >
          <template #prepend>
            <div class="input-icon">
              <q-icon name="sym_o_calendar_add_on" color="deep-purple-6" />
            </div>
          </template>
          <q-popup-proxy
            v-model="showDatePicker"
            transition-show="scale"
            transition-hide="scale"
          >
            <q-date
              :options="getDueDateOptions"
              color="deep-purple-6"
              v-model="taskDueDate"
              mask="DD/MM/YYYY"
            >
              <div class="row items-center justify-end">
                <app-button
                  v-close-popup
                  :label="t('common.actions.close')"
                  flat
                />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-input>

        <div class="flex justify-end q-mt-md">
          <app-button
            class="button q-mr-sm"
            :label="t('common.actions.cancel')"
            outline
            @click="onDialogHide"
          />

          <app-button
            class="button"
            :label="t('common.actions.save')"
            type="submit"
          />
        </div>
      </q-form>
    </template>
  </app-dialog>
</template>

<script setup lang="ts">
import { CategoryListItem } from 'src/schemas/category.schemas';
import AppButton from '../AppButton.vue';
import AppDialog from '../AppDialog.vue';

import { QInput, useDialogPluginComponent } from 'quasar';
import { useHandleAsync } from 'src/helpers/handleAsync.helper';
import {
  Priority,
  TaskListItem,
  updateTaskFormSchema,
} from 'src/schemas/task.schemas';
import { getTaskById, updateTask } from 'src/services/task.service';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { ValidationError } from 'yup';
import { getAllCategories } from 'src/services/category.service';
import { useDateLocalizer } from 'src/helpers/date.helper';

const props = defineProps<{ taskId: string }>();
const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
const taskDetail = ref<TaskListItem>();
const taskName = ref('');
const taskPriority = ref('');
const taskCategory = ref<CategoryListItem>();
const taskDueDate = ref('');
const categories = ref<CategoryListItem[]>([]);
const showDatePicker = ref(false);
const formatDate = useDateLocalizer();
const errors = ref<{
  name?: string;
  priority?: string;
  categoryId?: string;
  dueDate?: string;
}>({});
const { handle } = useHandleAsync();
const { t } = useI18n();

const priorityOptions = Object.values(Priority).map((value) => ({
  label: t(`common.priority.${value.toLowerCase()}`),
  value,
}));

function parseDate(dateString: string): Date {
  const [day, month, year] = dateString.split('/').map(Number);

  return new Date(year, month - 1, day);
}

async function onSubmit() {
  errors.value = {};
  const parsedDueDate = parseDate(taskDueDate.value);

  const data = {
    id: props.taskId,
    name: taskName.value,
    priority: taskPriority.value as Priority,
    category: taskCategory.value ?? null,
    dueDate: parsedDueDate,
  };

  try {
    const validated = await updateTaskFormSchema.validate(data, { abortEarly: false });
    await handle(() => updateTask(validated), t('common.feedback.task.updated'));
    onDialogOK();
  } catch (err) {
    if (err instanceof ValidationError) {
      err.inner.forEach((e) => {
        const field = e.path as keyof typeof errors.value;
        errors.value[field] = t(`common.validation.${e.message}`);
      });
    }
  }
}

function getPriority(priority: string): { color: string; icon: string } {
  if (priority === Priority.HIGH)
    return { color: 'deep-orange-14', icon: 'keyboard_double_arrow_up' };
  if (priority === Priority.MEDIUM)
    return { color: 'orange', icon: 'arrow_drop_up' };
  if (priority === Priority.LOW) return { color: 'green', icon: 'remove' };
  return { color: 'green', icon: 'remove' };
}

const loadCategoryOptions = async () => {
  const result = await handle(() => getAllCategories());
  if (!result) return;

  categories.value = result;
};

function getDueDateOptions(pickedDate: string) {
  const date = new Date(pickedDate);
  const today = new Date();

  return date >= today;
}

const loadTaskDetail = async () => {
  const result = await handle(() => getTaskById(props.taskId));
  if (!result) return;

  taskDetail.value = { ...result };
  taskName.value = result.name;
  taskPriority.value = result.priority;
  taskCategory.value = result.category;
  taskDueDate.value = formatDate.value(result.dueDate);
};

onMounted(() => {
  loadTaskDetail();
  loadCategoryOptions();
});
</script>

<style scoped lang="scss">
:deep(.input-icon) {
  display: flex;
  align-items: center;

  background: #f5f5f5;
  height: 100%;
  margin-left: 13px;
  padding-right: 5px;
}

:deep(.q-field__control) {
  padding: 0 !important;
  background: #f5f5f5;
}

:deep(.q-field__label) {
  padding-left: 15px;
}

:deep(.q-field__native) {
  background: #ffffff;
  margin: 2px;
  padding-left: 10px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

:deep(.q-select .q-field__control) {
  padding: 0 !important;
  background: #f5f5f5;
}

:deep(.q-select .q-field__native) {
  background: #ffffff;
  margin-top: -12px;
  border-top-left-radius: 6px;
  border-bottom-left-radius: 6px;
}

:deep(.q-field__native span) {
  margin-top: 15px;
}
</style>
