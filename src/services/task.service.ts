import { CreateTaskFormRequest, Status, TaskListItem } from 'src/schemas/task.schemas';
import { getAllCategories, incrementCategoryTaskCount } from './category.service';

export async function createTask(request: CreateTaskFormRequest): Promise<void> {
  const tasks = await getAllTasks();
  const newTask: TaskListItem = {
    id: crypto.randomUUID(),
    name: request.name,
    priority: request.priority,
    category: request.categoryId,
    dueDate: request.dueDate,
    status: Status.PENDING,
  }
  
  await incrementCategoryTaskCount(request.categoryId)
  tasks.push(newTask);
  localStorage.setItem('Tasks', JSON.stringify(tasks));
}

export async function getAllTasks(): Promise<TaskListItem[]> {
  const data = localStorage.getItem('Tasks');
  const tasks = data ? JSON.parse(data) : [];
  const categories = await getAllCategories();

  return tasks.map((task: TaskListItem) => {
    const category = categories.find(c => c.id === task.category);
    return { ...task, category: category?.name };
  });
}