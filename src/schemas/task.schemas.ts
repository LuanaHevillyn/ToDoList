import { date, InferType, object, string } from 'yup';
import { categoryListItemSchema } from './category.schemas';

export const taskListItemSchema = object({
  id: string().required(),
  name: string().required(),
  category: categoryListItemSchema.required('category'),
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
  DELAYED = 'DELAYED',
}

export const createTaskFormSchema = object({
  name: string().required('name'),
  priority: string().oneOf(Object.values(Priority), 'priorityInvalid').required('priority'),
  category: categoryListItemSchema.required('category'),
  dueDate: date().typeError('dueDateInvalid').required('dueDate'),
})

export const updateTaskFormSchema = object({
  id: string().required(),
  name: string().required('name'),
  priority: string().oneOf(Object.values(Priority), 'priorityInvalid').required('priority'),
  category: categoryListItemSchema.required('category'),
  dueDate: date().typeError('dueDateInvalid').required('dueDate'),
})

export type TaskListItem = InferType<typeof taskListItemSchema>;
export type CreateTaskFormRequest = InferType<typeof createTaskFormSchema>;
export type UpdateTaskFormRequest = InferType<typeof updateTaskFormSchema>;