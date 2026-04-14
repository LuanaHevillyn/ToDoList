export const common = {
    menu: {
        home: 'Home',
        tasks: 'Tasks',
        categories: 'Categories',
    },

    titles: {
        task: 'Tasks',
        category: 'Categories',
        history: 'History of {entity}',
    },

    fields: {
        name: 'Name',
        createdAt: 'Creation Date',
        numberOfTasks: 'Number of Tasks',
        dueDate: 'Due Date',
        status: 'Status',
        priority: 'Priority',
        description: 'Description',
        datetime: 'Date and Time',    
        actions: 'Actions',
    },

    actions: {
        task: {
            add: 'New Task',
        },
        category: {
            add: 'New Category',
            edit: 'Edit Category',
            delete: 'Delete Category',
            history: 'View History',
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
            deleted: 'Category deleted successfully!',
        }
    },

    formats: {
        date: 'MM/dd/yyyy',
        dateTime: '{date} at {time}',
        time: 'HH:mm',
    },

    history: {
        create: '{entity} created.',
        update: '{entity} updated.',
        delete: '{entity} deleted.',

        category: {
            created: 'Category "{name}" was created.',
            nameUpdated: 'Name changed from "{oldName}" to "{newName}".',
            descriptionUpdated: 'Description changed from "{oldDescription}" to "{newDescription}".',
            deleted: 'Category "{name}" was deleted.',
        }
    },
};