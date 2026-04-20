import { CategoryListItem, CreateCategoryFormRequest, UpdateCategoryFormRequest } from 'src/schemas/category.schemas';
import { CategoryField, HistoryAction, HistoryListItem } from 'src/schemas/history.schemas';

export async function createCategory(request: CreateCategoryFormRequest): Promise<void> {
  const categories = await getAllCategories();
  if (categories.some(category => category.name === request.name))  throw new Error('Já existe uma categoria com esse nome')

  const newCategory: CategoryListItem = {
    id: crypto.randomUUID(),
    name: request.name,
    description: request.description,
    numberOfTasks: 0,
    createdAt: new Date(),
  }
  categories.push(newCategory);
  localStorage.setItem('Categories', JSON.stringify(categories));
  addCreateActionToHistory(newCategory, HistoryAction.CREATE);
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

  const updatedCategory: CategoryListItem = {
    ...oldCategory,
    name: request.name,
    description: request.description
  };

  categories[index] = updatedCategory;
  localStorage.setItem('Categories', JSON.stringify(categories));
  addUpdateActionToHistory(oldCategory, updatedCategory, HistoryAction.UPDATE);
}

export async function deleteCategory(id: string): Promise<void> {
  const categories = await getAllCategories();
  const index = categories.findIndex(category => category.id === id);
  if (index === -1) throw new Error('Categoria não encontrada');

  const category = categories[index];
  if (category.numberOfTasks > 0) throw new Error('Existem tarefas vinculadas a essa categoria');

  categories.splice(index, 1);
  localStorage.setItem('Categories', JSON.stringify(categories));
  addDeleteActionToHistory(category, HistoryAction.DELETE);
}

export async function getAllCategoriesHistories(): Promise<HistoryListItem[]> {
  const data = localStorage.getItem('CategoriesHistories');
  return data ? JSON.parse(data) : [];
}

function addCreateActionToHistory(category: CategoryListItem, actionType: HistoryAction) {
  addHistoryItem({
    actionDescription: {
      field: null,
      oldValue: null,
      newValue: category.name,
    },
    dateTime: new Date(),
    categoryName: category.name,
    actionType,
  });
}

function addUpdateActionToHistory(oldCategory: CategoryListItem, newCategory: CategoryListItem, actionType: HistoryAction) {
  if (oldCategory.name !== newCategory.name) {
    addHistoryItem({
      actionDescription: {
        field: CategoryField.NAME,
        oldValue: oldCategory.name,
        newValue: newCategory.name,
      },
      dateTime: new Date(),
      categoryName: newCategory.name,
      actionType,
    });
  }

  if (oldCategory.description !== newCategory.description)  {   
    addHistoryItem({
      actionDescription: {
        field: CategoryField.DESCRIPTION,
        oldValue: oldCategory.description,
        newValue: newCategory.description,
      },
      dateTime: new Date(),
      categoryName: newCategory.name,
      actionType,
    });
  }
}

function addDeleteActionToHistory(category: CategoryListItem, actionType: HistoryAction) {
  addHistoryItem({
    actionDescription: {
      field: null,
      oldValue: null,
      newValue: category.name,
    },
    categoryName: category.name,
    dateTime: new Date(),
    actionType,
  });
}

function addHistoryItem(item: HistoryListItem) {
  const categoriesHistories: HistoryListItem[] =
    JSON.parse(localStorage.getItem('CategoriesHistories') || '[]');

  categoriesHistories.push(item);
  localStorage.setItem('CategoriesHistories', JSON.stringify(categoriesHistories));
}

export async function incrementCategoryTaskCount(id: string): Promise<void> {
  const categories = await getAllCategories();
  const index = categories.findIndex(category => category.id === id);
  if (index === -1) throw new Error('Categoria não encontrada');

  categories[index].numberOfTasks += 1;
  localStorage.setItem('Categories', JSON.stringify(categories));
  addIncrementTaskCountActionToHistory(categories[index], HistoryAction.INCREMENT)
}

function addIncrementTaskCountActionToHistory(category: CategoryListItem, actionType: HistoryAction) {
  addHistoryItem({
    actionDescription: {},
    categoryName: category.name,
    dateTime: new Date(),
    actionType,
  });
}

export async function decrementCategoryTaskCount(id: string): Promise<void> {
  const categories = await getAllCategories();
  const index = categories.findIndex(category => category.id === id);
  if (index === -1) throw new Error('Categoria não encontrada');

  if (categories[index].numberOfTasks > 0)  categories[index].numberOfTasks -= 1;
  localStorage.setItem('Categories', JSON.stringify(categories));
  addDecrementTaskCountActionToHistory(categories[index], HistoryAction.DECREMENT)
}

function addDecrementTaskCountActionToHistory(category: CategoryListItem, actionType: HistoryAction) {
  addHistoryItem({
    actionDescription: {},
    categoryName: category.name,
    dateTime: new Date(),
    actionType,
  });
}