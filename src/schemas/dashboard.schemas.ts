import { array, InferType, number, object, string } from 'yup';

export const taskDashboardCardItemSchema = object({
  goalId: number().required(),
  tasksCompletedInTheMonth: number().required(),
  tasksCompletedInTheMonthGoal: number().required(),
  tasksOverdueInTheMonth: number().required(),
  tasksInProgressInTheMonth: number().required(),
  tasksDeletedInTheYear: number().required(),
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

export const overdueTaskByCategorySchema = array(
  object({
    categoryName: string().required(),
    overdueTasks: number().required(),
  })
);

export type TaskDashboardCardItem = InferType<typeof taskDashboardCardItemSchema>;
export type TaskDashboardItem = InferType<typeof taskProgressItemSchema>;
export type AnnualTaskProgress = InferType<typeof annualTaskProgressSchema>;
export type OverdueTaskByCategory = InferType<typeof overdueTaskByCategorySchema>;

