<template>
    <app-dialog ref="dialogRef" persistent maxWidth="600px">
        <template #title>
            <div class="row items-center q-gutter-md">
                <q-avatar rounded color="deep-purple-1" text-color="deep-purple-6" icon="bi-tags"/>

                <div class="column">
                    <span class="text-h5">{{ $t('common.actions.category.add') }}</span>
                    <span class="text-caption text-grey-7">
                        Preencha os campos para adicionar uma nova categoria
                    </span>
                </div>
            </div>
        </template>

        <template #form>
            <q-form @submit.prevent.stop="onSubmit">
                <span class="text-body2">Nome *</span>
                <q-input label="Digite o nome" dense v-model="categoryName" color="deep-purple-6" outlined
                    :error="!!errors.name" :error-message="errors.name" maxlength="50" counter>
                    <template #prepend>
                        <div class="input-icon">
                            <q-icon name="bi-tag" color="deep-purple-6"/>
                        </div>
                    </template>
                </q-input>

                <span class="text-body2">Descrição *</span>
                <q-input dense v-model="categoryDescription" label="Digite a descrição" color="deep-purple-6" outlined
                    :error="!!errors.description" :error-message="errors.description" maxlength="50" counter><template
                        #prepend>
                        <div class="input-icon">
                            <q-icon name="bi-file-text" color="deep-purple-6"/>
                        </div>
                    </template></q-input>
                <div class="flex justify-end q-mt-md">
                    <app-button class="button q-mr-sm" label="Cancelar" outline @click="onDialogHide" />

                    <app-button class="button" label="Salvar" type="submit" />
                </div>
            </q-form>
        </template>
    </app-dialog>
</template>

<script setup lang="ts">
import AppDialog from '../AppDialog.vue';
import AppButton from '../AppButton.vue';

import { QInput, useDialogPluginComponent } from 'quasar';
import { ref } from 'vue';
import { createCategoryFormSchema } from 'src/schemas/category.schemas';
import { ValidationError } from 'yup';
import { useHandleAsync } from 'src/helpers/handleAsync.helper';
import { createCategory } from 'src/services/category.service';
import { useI18n } from 'vue-i18n';

const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
const categoryName = ref('');
const categoryDescription = ref('');

const errors = ref<{ name?: string; description?: string }>({});
const { handle } = useHandleAsync();
const { t } = useI18n();

async function onSubmit() {
    const data = {
        name: categoryName.value,
        description: categoryDescription.value,
    };

    try {
        await createCategoryFormSchema.validate(data, { abortEarly: false });
        await handle(() => createCategory(data), t('common.feedback.category.created'));
        onDialogOK();
    } catch (err) {
        if (err instanceof ValidationError) {
            err.inner.forEach((e) => {
                const field = e.path as keyof typeof errors.value;
                errors.value[field] = e.message;
            });
        }
    }
}
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
</style>
