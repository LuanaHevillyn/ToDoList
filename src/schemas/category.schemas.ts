import { date, InferType, number, object, string } from 'yup';

export const categoryListItemSchema = object({
  id: string().required(),
  name: string().required(),
  description: string().required(),
  numberOfTasks: number().required(),
  createdAt: date().required(),
});

export const createCategoryFormSchema   = object({
  name: string().required('name'),
  description: string().required('description'),
});

export const updateCategoryFormSchema   = object({
  id: string().required(),
  name: string().required('name'),
  description: string().required('description'),
});

export type CategoryListItem = InferType<typeof categoryListItemSchema>;
export type CreateCategoryFormRequest = InferType<typeof createCategoryFormSchema>;
export type UpdateCategoryFormRequest = InferType<typeof updateCategoryFormSchema>;