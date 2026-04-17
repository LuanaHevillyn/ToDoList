export const common = {
    menu: {
        home: 'Início',
        tasks: 'Tarefas',
        categories: 'Categorias',
    },

    titles: {
        task: 'Tarefas',
        category: 'Categorias | Categoria',
        history: 'Histórico de {entity}',
    },

    fields: {
        name: 'Nome',
        createdAt: 'Data de Criação',
        numberOfTasks: 'Número de Tarefas',
        dueDate: 'Prazo de Conclusão',
        status: 'Status',
        priority: 'Prioridade',
        description: 'Descrição',    
        datetime: 'Data e Hora',    
        actions: 'Ações | Ação',
    },

    validation: {
        name: 'Nome é obrigatório',
        dueDate: 'Prazo de conclusão é obrigatório',
        dueDateInvalid: 'Selecione uma data válida',
        priority: 'Prioridade é obrigatória',
        priorityInvalid: 'Selecione uma prioridade válida',
        description: 'Descrição é obrigatória',
        category: 'Categoria é obrigatória',
    },

    actions: {
        task: {
            add: 'Nova Tarefa',
        },
        category: {
            add: 'Nova Categoria',
            edit: 'Editar Categoria',
            delete: 'Excluir Categoria',
            history: 'Ver Histórico',
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
        task: {
            created: 'Tarefa criada com sucesso!',
        },
        category: {
            created: 'Categoria criada com sucesso!',
            updated: 'Categoria editada com sucesso!',
            deleted: 'Categoria deletada com sucesso!',
        }
    },

    formats: {
        date: 'dd/MM/yyyy',
        dateTime: '{date} ás {time}',
        time: 'HH:mm',
    },

    history: {
        create: '{entity} criada.',
        update: '{entity} atualizada.',
        delete: '{entity} excluída.',
        increment: 'Número de tarefas atualizado.',

        category: {
            created: 'A categoria "{name}" foi criada.',
            nameUpdated: 'Nome alterado de "{oldName}" para "{newName}".',
            descriptionUpdated: 'Descrição alterada de "{oldDescription}" para "{newDescription}".',
            deleted: 'A categoria "{name}" foi deletada.',
            incremented: 'A contagem de tarefas da categoria "{name}" foi incrementado.',
        }
    },
};