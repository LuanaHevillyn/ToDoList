import { array, InferType, mixed, number, object, string } from 'yup';
import { Priority } from './task.schemas';

export const dashboardCardItemSchema = object({
  goalId: number().required(),
  tasksCompletedInTheMonth: number().nullable(),
  cardGoal: number().nullable(),
  tasksOverdueInTheMonth: number().nullable(),
  tasksPendingInTheMonth: number().nullable(),
  tasksWithPriorityHighInTheMonth: number().nullable(),
});

export const taskProgressItemSchema = object({
  total: number().required(),
  month: number().required(),
});

export const annualTaskProgressSchema = object({
  tasksPending: array(taskProgressItemSchema).required(),
  tasksCompleted: array(taskProgressItemSchema).required(),
  tasksInProgress: array(taskProgressItemSchema).required(),
  tasksOverdue: array(taskProgressItemSchema).required(),
});

export const tasksByPrioritySchema = object({
  priority: mixed<Priority>().oneOf(Object.values(Priority)).required(),
  tasks: number().required(),
});

export const mostUsedCategoriesSchema = object({
  name: string().required(),
  timesUsed: number().required(),
});

export type DashboardCards = InferType<typeof dashboardCardItemSchema>;
export type TaskDashboardItem = InferType<typeof taskProgressItemSchema>;
export type AnnualTaskProgress = InferType<typeof annualTaskProgressSchema>;
export type TasksByPriority = InferType<typeof tasksByPrioritySchema>;
export type MostUsedCategories = InferType<typeof mostUsedCategoriesSchema>;