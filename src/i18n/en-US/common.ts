export const common = {
    menu: {
        home: 'Home',
        tasks: 'Tasks',
        categories: 'Categories',
    },

    titles: {
        task: 'Tasks | Task',
        category: 'Categories  | Category',
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

    placeholder: {
        name: 'Enter the name',
        priority: 'Select the priority',
        dueDate: 'Select the due date',
        description: 'Enter the description',
        category: 'Select the category',
    },

    actions: {
        task: {
            add: 'New Task',
            addDescription: 'Fill in the fields to add a task.',

            edit: 'Edit Task',
            editDescription: 'Fill in the fields to edit the selected task.',

            delete: 'Delete Task',
            deleteQuestion: 'Are you sure you want to delete the task "{name}"?',
            deleteWarning: 'This action cannot be undone.',
        },
        category: {
            add: 'New Category',
            addDescription: 'Fill in the fields to add a category.',

            edit: 'Edit Category',
            editDescription: 'Fill in the fields to edit the selected category.',

            delete: 'Delete Category',
            deleteQuestion: 'Are you sure you want to delete the category "{name}"?',
            deleteWarning: 'This action cannot be undone.',
        },

        history: {
            view: 'View History',
            deleteHistoryItem: 'Delete registry',
            deleteHistory: 'Clean history',
            deleteAllQuestion: 'Are you sure you want to clean all the history?',
            deleteItemQuestion: 'Are you sure you want to delete this history item?',
            deleteWarning: 'This action cannot be undone.',
        },

        save: 'Save',
        cancel: 'Cancel',
        confirm: 'Confirm',
        close: 'Close',
    },

    status: {
        delayed: 'Delayed',
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
            updated: 'Task updated successfully!',
            deleted: 'Task deleted successfully!',
        },
        category: {
            created: 'Category created successfully!',
            updated: 'Category updated successfully!',
            deleted: 'Category deleted successfully!',
        },
        history: {
            itemDeleted: 'History item deleted!',
            allDeleted: 'Clean history!',
        }
    },

    formats: {
        date: 'MM/dd/yyyy',
        dateTime: '{date} at {time}',
        time: 'HH:mm',
    },

    history: {
        action: {
            create: '{entity} created.',
            update: '{entity} updated.',
            delete: '{entity} deleted.',
            increment: 'Number of tasks increased.',
            decrement: 'Number of tasks decreased.',
        },

        task: {
            created: 'The task "{name}" was created.',
            nameUpdated: 'Name changed from "{oldName}" to "{newName}".',
            priorityUpdated: 'Priority changed from "{oldPriority}" to "{newPriority}".',
            dueDateUpdated: 'Due date changed from "{oldDueDate}" to "{newDueDate}".',
            categoryUpdated: 'Category changed from "{oldCategory}" to "{newCategory}".',
            statusUpdated: 'Status changed from "{oldStatus}" to "{newStatus}".',
            deleted: 'The task "{name}" was deleted.',
        },

        category: {
            created: 'Category "{name}" was created.',
            nameUpdated: 'Name changed from "{oldName}" to "{newName}".',
            descriptionUpdated: 'Description changed from "{oldDescription}" to "{newDescription}".',
            deleted: 'Category "{name}" was deleted.',
            incremented: 'Number of tasks of category "{name}" was incremented.',
            decremented: 'Number of tasks of category "{name}" was decremented.',
        }
    },
};