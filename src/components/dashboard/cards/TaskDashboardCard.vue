<template>
  <q-card bordered class="shadow-3 text-center col-12 col-md-6">
    <q-card-section>
      <div class="text-subtitle1 text-weight-medium">
        <q-icon :name="icon" size="18px" color="deep-purple-6" />
        {{ title }}
      </div>
    </q-card-section>

    <q-card-section class="q-pa-none row justify-center items-center">
      <div class="text-h4 row text-weight-medium items-center q-gutter-x-xs">
        {{ current }}

        <span
          v-if="goal !== null"
          class="row text-weight-regular items-center text-h5 q-gutter-x-xs"
        >
          /
          <span v-if="!isEditingGoal">
            {{ goal }}
          </span>

          <q-input
            v-else
            outlined
            label="Meta"
            v-model="goalValue"
            type="number"
            style="width: 90px"
            color="deep-purple-6"
            :rules="[(val) => !!val || '* Required']"
            lazy-rules
          />
        </span>
      </div>
    </q-card-section>

    <q-card-section class="row items-center justify-center">
      <div class="row">
        <span
          >{{ footer.right }}
          <span class="text-weight-medium" v-if="footer.left">
            / {{ footer.left }}
          </span>
        </span>

        <app-button
          v-if="footer.left"
          icon="edit"
          flat
          size="md"
          class="absolute-right"
          @click="isEditingGoal = true"
        >
          <q-tooltip> Editar meta </q-tooltip>
        </app-button>

        <app-button
          v-if="isEditingGoal"
          icon="save"
          flat
          size="md"
          class="absolute-right"
          @click="onSaveGoal"
        >
          <q-tooltip> Salvar meta </q-tooltip>
        </app-button>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import AppButton from 'src/components/AppButton.vue';

import { useHandleAsync } from 'src/helpers/handleAsync.helper';
import { updateGoal } from 'src/services/dashboard.service';

import { ref } from 'vue';

const props = defineProps<{
  title: string;
  icon: string;
  current: number;
  goal: number | null;
  footer: {
    right: string;
    left?: string;
  };
}>();

const { handle } = useHandleAsync();
const isEditingGoal = ref(false);
const goalValue = ref(props.goal ?? null);

const emit = defineEmits<{
  (e: 'goal-updated'): void;
}>();

async function onSaveGoal() {
  if (!goalValue.value) return;

  await handle(() => updateGoal(goalValue.value!), 'Meta salva!');
  isEditingGoal.value = false;
  emit('goal-updated');
}
</script>
