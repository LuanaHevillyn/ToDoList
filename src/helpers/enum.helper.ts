import { CategoryField, HistoryAction, HistoryListItem } from 'src/schemas/history.schemas';
import { useI18n } from 'vue-i18n';

export function getHistoryType(actionType: HistoryAction | null, entity: string): string {
    const { t } = useI18n();
    if (!actionType) return '';

    return t(`common.history.action.${actionType.toLowerCase()}`, { entity });
}

export function getHistoryMessage(row: HistoryListItem | null): string {
    const { t } = useI18n();
    if (!row) return '';

    const name = row.name;
    const field = row.actionDescription;

    const fieldMap = {
        [CategoryField.NAME]: () =>
            t('common.history.category.nameUpdated', {
                oldName: field?.oldValue,
                newName: field?.newValue,
            }),

        [CategoryField.DESCRIPTION]: () =>
            t('common.history.category.descriptionUpdated', {
                oldDescription: field?.oldValue,
                newDescription: field?.newValue,
            }),
    };

    if (row.actionType === HistoryAction.CREATE) return t('common.history.category.created', { name });
    if (row.actionType === HistoryAction.UPDATE && field?.field) return fieldMap[field.field]?.() ?? '';
    if (row.actionType === HistoryAction.DELETE) return t('common.history.category.deleted', { name });
    if (row.actionType === HistoryAction.INCREMENT) return t('common.history.category.incremented', { name });
    if (row.actionType === HistoryAction.DECREMENT) return t('common.history.category.decremented', { name });
    return '';
}