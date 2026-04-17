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

    validation: {
        name: ' Name is required ',
        dueDate: 'Due Date is required',
        dueDateInvalid: 'Select a valid date',
        priority: 'Priority is required',
        priorityInvalid: 'Select a valid priority',
        description: 'Description is required',
        category: 'Category is required',
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
        task: {
            created: 'Task created successfully!',
        },        
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
        increment: 'Number of tasks updated.',

        category: {
            created: 'Category "{name}" was created.',
            nameUpdated: 'Name changed from "{oldName}" to "{newName}".',
            descriptionUpdated: 'Description changed from "{oldDescription}" to "{newDescription}".',
            deleted: 'Category "{name}" was deleted.',
            incremented: 'Number of tasks of category "{name}" was incremented.',
        }
    },

    taskPriority: {
        high: 'High',
        medium: 'Medium',
        low: 'Low',
    }
};