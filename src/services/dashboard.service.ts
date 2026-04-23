import { CategoryListItem } from 'src/schemas/category.schemas';
import { AnnualTaskProgress, DashboardCards, MostUsedCategories, TasksByPriority } from 'src/schemas/dashboard.schemas';
import { Priority, Status, TaskListItem } from 'src/schemas/task.schemas';

export async function getAnnualTasksProgress(): Promise<AnnualTaskProgress> {
    const data = localStorage.getItem('Tasks');
    const tasks = data ? JSON.parse(data) : [];
    const tasksPending: { total: number; month: number }[] = [];
    const tasksInProgress: { total: number; month: number }[] = [];
    const tasksCompleted: { total: number; month: number }[] = [];
    const tasksOverdue: { total: number; month: number }[] = [];

    const countByMonth = (list: { total: number; month: number }[], month: number) => {
        const existing = list.find(item => item.month === month);
        if (existing) return existing.total += 1;

        list.push({ total: 1, month });
    };

    tasks.forEach((task: TaskListItem) => {
        const dueDate = new Date(task.dueDate);
        const month = dueDate.getMonth();

        if (task.status === Status.PENDING) countByMonth(tasksPending, month);
        if (task.status === Status.IN_PROGRESS) countByMonth(tasksInProgress, month);
        if (task.status === Status.COMPLETED) countByMonth(tasksCompleted, month);
        if (task.status === Status.DELAYED) countByMonth(tasksOverdue, month);
    });

    return { tasksPending, tasksCompleted, tasksInProgress, tasksOverdue };
}

export async function getMostUsedCategories(): Promise<MostUsedCategories[]> {
    const data = localStorage.getItem('Categories');
    const categories = data ? JSON.parse(data) : [];

    const mostUsedCategories = categories.map((category: CategoryListItem) => ({ name: category.name, timesUsed: category.numberOfTasks }));

    return [...mostUsedCategories]
        .filter(category => category.timesUsed > 0)
        .sort((a, b) => b.timesUsed - a.timesUsed)
        .slice(0, 5);
}

export async function getDashboardDataTasksByPriority(): Promise<TasksByPriority[]> {
    const data = localStorage.getItem('Tasks');
    const tasks = data ? JSON.parse(data) : [];
    const tasksByPriority: { priority: Priority; tasks: number }[] = [];

    const countByPriority = (list: { priority: Priority; tasks: number }[], priority: Priority) => {
        const existing = list.find(item => item.priority === priority);
        if (existing) return existing.tasks += 1;
        list.push({ tasks: 1, priority });
    };

    tasks.forEach((task: TaskListItem) => {
        if (task.priority === Priority.LOW) countByPriority(tasksByPriority, task.priority)
        if (task.priority === Priority.MEDIUM) countByPriority(tasksByPriority, task.priority)
        if (task.priority === Priority.HIGH) countByPriority(tasksByPriority, task.priority)
    });

    return tasksByPriority;
}

export async function getDashboardCards(): Promise<DashboardCards[]> {
    const data = localStorage.getItem('Tasks');
    const goalData = localStorage.getItem('Goal');
    const goal = goalData ? JSON.parse(goalData) : 0;
    const tasks = data ? JSON.parse(data) : [];
    const now = new Date();
    const currentMonth = now.getMonth();

    const dashboardCards: DashboardCards[] = [
        {
            goalId: 1, tasksCompletedInTheMonth: 0,
            cardGoal: goal
        },
        { goalId: 2, tasksPendingInTheMonth: 0 },
        { goalId: 3, tasksOverdueInTheMonth: 0 },
        { goalId: 4, tasksWithPriorityHighInTheMonth: 0 }
    ];

    tasks.forEach((task: TaskListItem) => {
        const dueDate = new Date(task.dueDate);
        const month = dueDate.getMonth();

        if (task.status === Status.COMPLETED && month === currentMonth)
            dashboardCards[0].tasksCompletedInTheMonth! += 1;

        if (task.status === Status.PENDING && month === currentMonth)
            dashboardCards[1].tasksPendingInTheMonth! += 1;

        if (task.status === Status.DELAYED && month === currentMonth)
            dashboardCards[2].tasksOverdueInTheMonth! += 1;

        if (task.priority === Priority.HIGH && month === currentMonth)
            dashboardCards[3].tasksWithPriorityHighInTheMonth! += 1;
    });
    return dashboardCards;
}

export async function updateGoal(goal: number): Promise<void> {
    if (goal <= 0) throw new Error('A meta deve ser maior que zero');
    localStorage.setItem('Goal', JSON.stringify(goal));
}

