import { date, InferType, object, string } from 'yup';

export const taskListItemSchema = object({
  id: string().required(),
  name: string().required(),
  category: string().required(),
  status: string().required(),
  priority: string().required(),
  dueDate: date().required(),
});

export enum Priority {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum Status {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

export const createTaskFormSchema = object({
  name: string().required('name'),
  priority: string().oneOf(Object.values(Priority), 'priorityInvalid').required('priority'),
  categoryId: string().required('category'),
  dueDate: date().typeError('dueDateInvalid').required('dueDate'),
})

export type TaskListItem = InferType<typeof taskListItemSchema>;
export type CreateTaskFormRequest = InferType<typeof createTaskFormSchema>;