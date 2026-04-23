import { date, InferType, mixed, object, string } from 'yup';

export enum HistoryAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
}

export enum CategoryField {
  NAME = 'NAME',
  DESCRIPTION = 'DESCRIPTION',
}

export enum TaskField {
  NAME = 'NAME',
  PRIORITY = 'PRIORITY',
  CATEGORY = 'CATEGORY',
  DUEDATE = 'DUEDATE',
  STATUS = 'STATUS',
}

export enum EntityType {
  TASK = 'TASK',
  CATEGORY = 'CATEGORY',
}

export const historyListItemSchema = object({
  id: string().required(),
  dateTime: date().required(),
  actionType: mixed<HistoryAction>().oneOf(Object.values(HistoryAction)).required(),
  entityType: mixed<EntityType>().oneOf(Object.values(EntityType)).required(),
  name: string().required(),
  actionDescription: object({
    field: mixed<CategoryField | TaskField>().oneOf([...Object.values(CategoryField), ...Object.values(TaskField)]).notRequired(),
    oldValue: string().nullable(),
    newValue: string().nullable(),
  }).default({}),
});

export type HistoryListItem = InferType<typeof historyListItemSchema>;
