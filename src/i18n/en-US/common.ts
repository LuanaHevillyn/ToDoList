export const common = {
    menu: {
        home: 'Home',
        tasks: 'Tasks',
        categories: 'Categories',
    },

    titles: {
        task: 'Tasks',
        category: 'Categories',
    },

    fields: {
        name: 'Name',
        createdAt: 'Creation Date',
        numberOfTasks: 'NNumber of Tasks',
        dueDate: 'Due Date',
        status: 'Status',
        priority: 'Priority',
        description: 'Description',
        actions: 'Actions',
    },

    actions: {
        task: {
            add: 'New Task',
        },
        category: {
            add: 'New Category',
            edit: 'Edit Category',
        },
    },

    status: {
        completed: 'Completed',
        inProgress: 'In Progress',
        pending: 'Pending',
        none: 'None',
    },

    priority: {
        high: 'High',
        medium: 'Medium',
        low: 'Low',
        none: 'None',
    },

    feedback: {
        taskCreated: 'Task created successfully!',
        category: {
            created: 'Category created successfully!',
            updated: 'Category updated successfully!',
        }
    },

    formats: {
        date: 'MM/dd/yyyy',
        dateTime: '{date} at {time}',
        time: 'HH:mm',
    },
};