import { CategoryListItem, CreateCategoryFormRequest, UpdateCategoryFormRequest } from 'src/schemas/category.schemas';

export async function createCategory(request: CreateCategoryFormRequest): Promise<void> {
  const categories = await getAllCategories();

  categories.map((category) => {
    if (category.name === request.name) throw new Error('Já existe uma categoria com esse nome')
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

export async function getCategoryById(id: string): Promise<CategoryListItem> {
  const categories = await getAllCategories();
  const category = categories.find((category) => category.id === id)

  if (!category) throw new Error('Nenhuma categoria encontrada');
  return category;
}

export async function updateCategory(request: UpdateCategoryFormRequest): Promise<void> {
  const categories = await getAllCategories();
  const index = categories.findIndex(category => category.id === request.id);
  if (index === -1) throw new Error('Categoria não encontrada');
  
  const oldCategory = categories[index];
  if (oldCategory.name === request.name && oldCategory.description === request.description)
    throw new Error('Nenhuma alteração foi realizada');
  if (categories.some(category => category.name === request.name && category.id !== request.id)) 
    throw new Error('Já existe uma categoria com esse nome');

  categories[index] = {
    ...oldCategory,
    name: request.name,
    description: request.description
  };

  localStorage.setItem('Categories', JSON.stringify(categories));
}