import { computed } from 'vue';
import { format } from 'date-fns';
import { useI18n } from 'vue-i18n';

export function useDateLocalizer() {
  const { t } = useI18n();

  return computed(() => {
    const dateFormat = t('common.formats.date');
    return (date: Date) => format(date, dateFormat);
  });
}

export function useDateTimeLocalizer() {
  const { t } = useI18n();

  return computed(() => {
    const dateFormat = t('common.formats.date');
    return (date: Date) =>
      t('common.formats.dateTime', {
        date: format(date, dateFormat),
        time: format(date, 'HH:mm'),
    });
  });
}
