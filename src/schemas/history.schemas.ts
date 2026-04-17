import { date, InferType, mixed, object, string } from 'yup';

export enum HistoryAction {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
  INCREMENT = 'INCREMENT',
}

export enum CategoryField {
  NAME = 'NAME',
  DESCRIPTION = 'DESCRIPTION',
}

export type ChangedFieldItem = {
  field: CategoryField | null;
  oldValue: string;
  newValue: string;
};

export const historyListItemSchema = object({
  dateTime: date().required(),
  actionType: mixed<HistoryAction>().oneOf(Object.values(HistoryAction)).required(),
  categoryName: string().required(),
  actionDescription: object({
    field: mixed<CategoryField>().oneOf(Object.values(CategoryField)).notRequired(),
    oldValue: string().nullable(),
    newValue: string().nullable(),
  }).default({}),
});

export type HistoryListItem = InferType<typeof historyListItemSchema>;
