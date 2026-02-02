import { date, InferType, number, object, string } from 'yup';

export const categoryListItemSchema = object({
  name: string().required(),
  numberOfTasks: number().required(),
  status: string().required(),
  createdAt: date().required(),
});

export type CategoryListItem = InferType<typeof categoryListItemSchema>;