export const common = {
    menu: {
        home: 'Início',
        tasks: 'Tarefas',
        categories: 'Categorias',
    },

    titles: {
        task: 'Tarefas',
        category: 'Categorias',
    },

    fields: {
        name: 'Nome',
        createdAt: 'Data de Criação',
        numberOfTasks: 'Número de Tarefas',
        dueDate: 'Prazo de Conclusão',
        status: 'Status',
        priority: 'Prioridade',
        description: 'Descrição',
        actions: 'Ações',
    },

    actions: {
        task: {
            add: 'Nova Tarefa',
        },
        category: {
            add: 'Nova Categoria',
            edit: 'Editar Categoria',
            delete: 'Excluir Categoria',
        },
    },

    status: {
        completed: 'Concluída',
        inProgress: 'Em Andamento',
        pending: 'Pendente',
        none: 'Nenhuma',
    },

    priority: {
        high: 'Alta',
        medium: 'Média',
        low: 'Baixa',
        none: 'Nenhuma',
    },

    feedback: {
        taskCreated: 'Tarefa criada com sucesso!',
        category: {
            created: 'Categoria criada com sucesso!',
            updated: 'Categoria editada com sucesso!',
            deleted: 'Categoria deletada com sucesso!',
        }
    },

    formats: {
        date: 'MM/dd/yyyy',
        dateTime: '{date} ás {time}',
        time: 'HH:mm',
    },
};