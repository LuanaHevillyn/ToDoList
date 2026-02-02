import { date, InferType, object, string } from 'yup';

export const taskListItemSchema = object({
  name: string().required(),
  category: string().required(),
  status: string().required(),
  priority: string().required(),
  dueDate: date().required(),
});

export type TaskListItem = InferType<typeof taskListItemSchema>;