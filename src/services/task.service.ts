import { CreateTaskFormRequest, Status, TaskListItem, UpdateTaskFormRequest } from 'src/schemas/task.schemas';
import { decrementCategoryTaskCount, incrementCategoryTaskCount } from './category.service';

export async function createTask(request: CreateTaskFormRequest): Promise<void> {
  const tasks = await getAllTasks();
  const newTask: TaskListItem = {
    id: crypto.randomUUID(),
    name: request.name,
    priority: request.priority,
    category: request.category,
    dueDate: request.dueDate,
    status: Status.PENDING,
  }

  await incrementCategoryTaskCount(request.category.id)
  tasks.push(newTask);
  localStorage.setItem('Tasks', JSON.stringify(tasks));
}

export async function getAllTasks(): Promise<TaskListItem[]> {
  const data = localStorage.getItem('Tasks');
  const tasks = data ? JSON.parse(data) : [];

  tasks.forEach((task: TaskListItem) => {
    if (new Date(task.dueDate) < new Date() && task.status === Status.IN_PROGRESS) task.status = Status.DELAYED;
    if (new Date(task.dueDate) > new Date() && task.status === Status.DELAYED) task.status = Status.IN_PROGRESS;
  });
  return tasks;
}

export async function getTaskById(id: string): Promise<TaskListItem> {
  const tasks = await getAllTasks();
  const task = tasks.find((task) => task.id === id)

  if (!task) throw new Error('Nenhuma tarefa encontrada');
  return task;
}

export async function updateTaskStatusById(id: string, isStarting: boolean): Promise<void> {
  const data = localStorage.getItem('Tasks');
  const tasks = data ? JSON.parse(data) : [];
  const index = tasks.findIndex((task: TaskListItem) => task.id === id);
  const nextStatus = isStarting ? Status.IN_PROGRESS : Status.COMPLETED

  if (index === -1) throw new Error('Tarefa não encontrada');
  tasks[index].status = nextStatus;

  localStorage.setItem('Tasks', JSON.stringify(tasks));
}

export async function updateTask(request: UpdateTaskFormRequest): Promise<void> {
  const tasks = await getAllTasks();
  const index = tasks.findIndex(task => task.id === request.id);
  if (index === -1) throw new Error('Tarefa não encontrada');

  const oldTask = tasks[index];
  if (
    JSON.stringify(oldTask.category) === JSON.stringify(request.category) &&
    oldTask.dueDate.toString() === new Date(request.dueDate).toISOString() &&
    oldTask.name === request.name &&
    oldTask.priority === request.priority
  ) throw new Error('Nenhuma alteração foi realizada');

  if (oldTask.category.id !== request.category.id) {
    await decrementCategoryTaskCount(oldTask.category.id)
    await incrementCategoryTaskCount(request.category.id)
  }

  const updatedTask: TaskListItem = {
    ...oldTask,
    name: request.name,
    priority: request.priority,
    category: request.category,
    dueDate: request.dueDate,
  };

  tasks[index] = updatedTask;
  localStorage.setItem('Tasks', JSON.stringify(tasks));
}

export async function deleteTask(id: string): Promise<void> {
  const tasks = await getAllTasks();
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) throw new Error('Tarefa não encontrada');

  const task = tasks[index];
  if (task.status === Status.IN_PROGRESS) throw new Error('É proibido excluir tarefas em andamento.');

  tasks.splice(index, 1);
  localStorage.setItem('Tasks', JSON.stringify(tasks));
  decrementCategoryTaskCount(task.category.id)
}