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
        },
        category: {
            add: 'New Category',
            addDescription: 'Fill in the fields to add a category.',

            edit: 'Edit Category',
            editDescription: 'Fill in the fields to edit the selected category.',

            delete: 'Delete Category',
            deleteQuestion: 'Are you sure you want to delete the category?',
            deleteWarning: 'This action cannot be undone.',

            history: 'View History',
        },

        save: 'Save',
        cancel: 'Cancel',
        confirm: 'Confirm',
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
};