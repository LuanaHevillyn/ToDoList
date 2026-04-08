import { CategoryListItem, CreateCategoryFormRequest } from 'src/schemas/category.schemas';

export async function createCategory(request: CreateCategoryFormRequest): Promise<void> {
  const categories: CategoryListItem[] = JSON.parse(localStorage.getItem('Categories') || '[]');

  categories.map((category) => {
    if (category.name === request.name) {
      throw new Error('Já existe uma categoria com esse nome');
    }
  });

  const newCategory: CategoryListItem = {
    id: crypto.randomUUID(),
    name: request.name,
    description: request.description,
    numberOfTasks: 0,
    createdAt: new Date(),
  }

  categories.push(newCategory);
  localStorage.setItem('Categories', JSON.stringify(categories));
}

export async function getAllCategories(): Promise<CategoryListItem[]> {
  const data = localStorage.getItem('Categories');
  return data ? JSON.parse(data) : [];
}