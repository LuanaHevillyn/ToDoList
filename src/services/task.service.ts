import { CreateTaskFormRequest, Status, TaskListItem, UpdateTaskFormRequest } from 'src/schemas/task.schemas';
import { decrementCategoryTaskCount, incrementCategoryTaskCount } from './category.service';
import { EntityType, HistoryAction, HistoryListItem, TaskField } from 'src/schemas/history.schemas';

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
  addCreateActionToHistory(newTask, HistoryAction.CREATE);
}

export async function getAllTasks(): Promise<TaskListItem[]> {
  const data = localStorage.getItem('Tasks');
  const tasks = data ? JSON.parse(data) : [];

  tasks.forEach((task: TaskListItem) => {
    if (new Date(task.dueDate) < new Date() && task.status === Status.IN_PROGRESS) {      
      task.status = Status.DELAYED;
      addUpdateStatusActionToHistory(task.name, Status.IN_PROGRESS, Status.DELAYED, HistoryAction.UPDATE);
    }
    if (new Date(task.dueDate) > new Date() && task.status === Status.DELAYED) {      
      task.status = Status.IN_PROGRESS;
      addUpdateStatusActionToHistory(task.name, Status.DELAYED, Status.IN_PROGRESS, HistoryAction.UPDATE);
    }
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
  const task = tasks[index];
  const nextStatus = isStarting ? Status.IN_PROGRESS : Status.COMPLETED
  const oldStatus = task.status;

  if (index === -1) throw new Error('Tarefa não encontrada');
  const newStatus = task.status = nextStatus;

  localStorage.setItem('Tasks', JSON.stringify(tasks));
  addUpdateStatusActionToHistory(task.name, oldStatus, newStatus, HistoryAction.UPDATE);
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
  addUpdateActionToHistory(oldTask, updatedTask, HistoryAction.UPDATE)
}

export async function deleteTask(id: string): Promise<void> {
  const tasks = await getAllTasks();
  const index = tasks.findIndex(task => task.id === id);
  if (index === -1) throw new Error('Tarefa não encontrada');

  const task = tasks[index];
  if (task.status === Status.IN_PROGRESS) throw new Error('É proibido excluir tarefas em andamento.');

  tasks.splice(index, 1);
  localStorage.setItem('Tasks', JSON.stringify(tasks));
  decrementCategoryTaskCount(task.category.id);
  addDeleteActionToHistory(task, HistoryAction.DELETE);
}

export async function getAllTasksHistories(): Promise<HistoryListItem[]> {
  const data = localStorage.getItem('TasksHistories');
  return data ? JSON.parse(data) : [];
}

export async function getTaskHistoryById(id: string): Promise<HistoryListItem> {
  const tasksHistories = await getAllTasksHistories();
  const taskHistory = tasksHistories.find((history) => history.id === id)

  if (!taskHistory) throw new Error('Nenhum histórico de tarefa encontrado');
  return taskHistory;
}

export async function deleteTaskHistoryItem(id: string): Promise<void> {
  const tasksHistories = await getAllTasksHistories();
  const index = tasksHistories.findIndex(history => history.id === id);
  if (index === -1) throw new Error('Histórico de tarefa não encontrado');

  tasksHistories.splice(index, 1);
  localStorage.setItem('TasksHistories', JSON.stringify(tasksHistories));
}

export async function deleteAllTasksHistories(): Promise<void> {
  localStorage.setItem('TasksHistories', JSON.stringify([]));
}

function addCreateActionToHistory(task: TaskListItem, actionType: HistoryAction) {
  addHistoryItem({
    id: crypto.randomUUID(),
    entityType: EntityType.TASK,
    actionDescription: { newValue: task.name },
    dateTime: new Date(),
    name: task.name,
    actionType,
  });
}

function addUpdateActionToHistory(oldTask: TaskListItem, newTask: TaskListItem, actionType: HistoryAction) {
  if (oldTask.name !== newTask.name)
    addHistoryItem({
      id: crypto.randomUUID(),
      entityType: EntityType.TASK,
      actionDescription: {
        field: TaskField.NAME,
        oldValue: oldTask.name,
        newValue: newTask.name,
      },
      dateTime: new Date(),
      name: newTask.name,
      actionType,
    });

  if (oldTask.priority !== newTask.priority)
    addHistoryItem({
      id: crypto.randomUUID(),
      entityType: EntityType.TASK,
      actionDescription: {
        field: TaskField.PRIORITY,
        oldValue: oldTask.priority,
        newValue: newTask.priority,
      },
      dateTime: new Date(),
      name: newTask.name,
      actionType,
    });

  if (JSON.stringify(oldTask.category) !== JSON.stringify(newTask.category))
    addHistoryItem({
      id: crypto.randomUUID(),
      entityType: EntityType.TASK,
      actionDescription: {
        field: TaskField.CATEGORY,
        oldValue: oldTask.category.name,
        newValue: newTask.category.name,
      },
      dateTime: new Date(),
      name: newTask.name,
      actionType,
    });

  if (oldTask.dueDate.toString() !== new Date(newTask.dueDate).toISOString())
    addHistoryItem({
      id: crypto.randomUUID(),
      entityType: EntityType.TASK,
      actionDescription: {
        field: TaskField.DUEDATE,
        oldValue: oldTask.dueDate.toString(),
        newValue: newTask.dueDate.toString(),
      },
      dateTime: new Date(),
      name: newTask.name,
      actionType,
    });
}

function addUpdateStatusActionToHistory(taskName: string, oldStatus: Status | null, newStatus: Status | null, actionType: HistoryAction) {
  addHistoryItem({
    id: crypto.randomUUID(),
    entityType: EntityType.TASK,
    actionDescription: {
      field: TaskField.STATUS,
      oldValue: oldStatus,
      newValue: newStatus,
    },
    dateTime: new Date(),
    name: taskName,
    actionType,
  });
}

function addHistoryItem(item: HistoryListItem) {
  const tasksHistories: HistoryListItem[] =
    JSON.parse(localStorage.getItem('TasksHistories') || '[]');

  tasksHistories.push(item);
  localStorage.setItem('TasksHistories', JSON.stringify(tasksHistories));
}

function addDeleteActionToHistory(task: TaskListItem, actionType: HistoryAction) {
  addHistoryItem({
    id: crypto.randomUUID(),
    entityType: EntityType.CATEGORY,
    actionDescription: { newValue: task.name },
    name: task.name,
    dateTime: new Date(),
    actionType,
  });
}
