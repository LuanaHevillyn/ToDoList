import {
    CategoryField,
    EntityType,
    HistoryAction,
    HistoryListItem,
    TaskField,
} from 'src/schemas/history.schemas';
import { Priority, Status } from 'src/schemas/task.schemas';
import { useI18n } from 'vue-i18n';
import { useDateLocalizer } from './date.helper';

export function getHistoryConfig(
    actionType: HistoryAction,
    entity: string
): {
    color: string;
    icon: string;
    label: string;
} {
    const { t } = useI18n();

    if (actionType === HistoryAction.CREATE)
        return { color: 'green', icon: 'bi-plus-circle-fill', label: t(`common.history.action.${actionType.toLowerCase()}`, { entity }) };
    if (actionType === HistoryAction.UPDATE)
        return { color: 'deep-purple-2', icon: 'edit', label: t(`common.history.action.${actionType.toLowerCase()}`, { entity }) };
    if (actionType === HistoryAction.DELETE)
        return { color: 'deep-orange-10', icon: 'delete', label: t(`common.history.action.${actionType.toLowerCase()}`, { entity }) };
    if (actionType === HistoryAction.INCREMENT)
        return { color: 'deep-purple-2', icon: 'add', label: t(`common.history.action.${actionType.toLowerCase()}`, { entity }) };
    if (actionType === HistoryAction.DECREMENT)
        return { color: 'deep-orange-6', icon: 'remove', label: t(`common.history.action.${actionType.toLowerCase()}`, { entity }) };
    return { color: '', icon: '', label: '' };
}

export function getHistoryDescription(row: HistoryListItem): string {
    const { t } = useI18n();
    const formatDate = useDateLocalizer();

    const entityType = row.entityType.toLowerCase();
    const name = row.name;
    const field = row.actionDescription;

    const fieldMap =
        row.entityType === EntityType.CATEGORY
            ? {
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
            }
            : {
                [TaskField.NAME]: () =>
                    t('common.history.task.nameUpdated', {
                        oldName: field?.oldValue,
                        newName: field?.newValue,
                    }),

                [TaskField.PRIORITY]: () => {
                    const oldValue = (field?.oldValue as Priority) ?? Priority.LOW;
                    const newValue = (field?.newValue as Priority) ?? Priority.LOW;
                    const oldPriorityLabel = getPriorityConfig(oldValue).label;
                    const newPriorityLabel = getPriorityConfig(newValue).label;

                    return t('common.history.task.priorityUpdated', {
                        oldPriority: oldPriorityLabel,
                        newPriority: newPriorityLabel,
                    });
                },

                [TaskField.CATEGORY]: () =>
                    t('common.history.task.categoryUpdated', {
                        oldCategory: field?.oldValue,
                        newCategory: field?.newValue,
                    }),

                [TaskField.DUEDATE]: () => {
                    const oldValue = field?.oldValue ? new Date(field.oldValue) : undefined;
                    const newValue = field?.newValue ? new Date(field.newValue) : undefined;
                    if (!oldValue || !newValue) return '';
                    const oldDueDateLabel = formatDate.value(oldValue);
                    const newDueDateLabel = formatDate.value(newValue);

                    return t('common.history.task.dueDateUpdated', {
                        oldDueDate: oldDueDateLabel,
                        newDueDate: newDueDateLabel,
                    });
                },

                [TaskField.STATUS]: () => {
                    const oldValue = (field?.oldValue as Status) ?? Status.NONE;
                    const newValue = (field?.newValue as Status) ?? Status.NONE;
                    const oldStatusLabel = getStatusConfig(oldValue).label;
                    const newStatusLabel = getStatusConfig(newValue).label;

                    return t('common.history.task.statusUpdated', {
                        oldStatus: oldStatusLabel,
                        newStatus: newStatusLabel,
                    });
                },
            };

    if (row.actionType === HistoryAction.CREATE)
        return t(`common.history.${entityType}.created`, { name });
    if (row.actionType === HistoryAction.UPDATE && field?.field)
        return fieldMap[field.field]?.() ?? '';
    if (row.actionType === HistoryAction.DELETE)
        return t(`common.history.${entityType}.deleted`, { name });
    if (row.actionType === HistoryAction.INCREMENT)
        return t(`common.history.${entityType}.incremented`, { name });
    if (row.actionType === HistoryAction.DECREMENT)
        return t(`common.history.${entityType}.decremented`, { name });
    return '';
}

export function getStatusConfig(status: string): {
    color: string;
    icon: string;
    label: string;
} {
    const { t } = useI18n();

    if (status === Status.COMPLETED)
        return {
            color: 'green',
            icon: 'check',
            label: t('common.status.completed'),
        };
    if (status === Status.DELAYED)
        return {
            color: 'deep-orange-14',
            icon: 'hourglass_bottom',
            label: t('common.status.delayed'),
        };
    if (status === Status.IN_PROGRESS)
        return {
            color: 'deep-purple-5',
            icon: 'hourglass_top',
            label: t('common.status.inProgress'),
        };
    if (status === Status.PENDING)
        return {
            color: 'orange',
            icon: 'warning',
            label: t('common.status.pending'),
        };
    return { color: 'grey', icon: '', label: t('common.status.none') };
}

export function getPriorityConfig(priority: string): {
    color: string;
    icon: string;
    label: string;
} {
    const { t } = useI18n();

    if (priority === Priority.HIGH)
        return {
            color: 'deep-orange-14',
            icon: 'keyboard_double_arrow_up',
            label: t('common.priority.high'),
        };
    if (priority === Priority.MEDIUM)
        return {
            color: 'orange',
            icon: 'arrow_drop_up',
            label: t('common.priority.medium'),
        };
    if (priority === Priority.LOW)
        return {
            color: 'green',
            icon: 'remove',
            label: t('common.priority.low'),
        };
    return { color: 'green', icon: 'remove', label: t('common.priority.none') };
}
