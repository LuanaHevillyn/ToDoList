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
        dateTime: 'Data e Hora',
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

    placeholder: {
        name: 'Digite o nome',
        priority: 'Selecione a prioridade',
        dueDate: 'Selecione o prazo de conclusão',
        description: 'Digite a descrição',
        category: 'Selecione a categoria',
    },

    actions: {
        task: {
            add: 'Nova Tarefa',
            addDescription: 'Preencha os campos para adicionar uma tarefa.',

            edit: 'Editar Tarefa',
            editDescription: 'Preencha os campos para editar a tarefa selecionada.',

            delete: 'Excluir Tarefa',
            deleteQuestion: 'Tem certeza que deseja excluir a tarefa "{name}"?',
            deleteWarning: 'Essa ação não poderá ser desfeita.',
        },
        category: {
            add: 'Nova Categoria',
            addDescription: 'Preencha os campos para adicionar uma categoria.',

            edit: 'Editar Categoria',
            editDescription: 'Preencha os campos para editar a categoria selecionada.',

            delete: 'Excluir Categoria',
            deleteQuestion: 'Tem certeza que deseja excluir a categoria "{name}"?',
            deleteWarning: 'Essa ação não poderá ser desfeita.',
        },

        history: {
            view: 'Ver Histórico',
            deleteHistoryItem: 'Excluir registro',
            deleteHistory: 'Limpar histórico',
            deleteAllQuestion: 'Tem certeza que deseja limpar todo o histórico?',
            deleteItemQuestion: 'Deseja excluir o seguinte item do histórico?',
            deleteWarning: 'Essa ação não poderá ser desfeita.',
        },

        save: 'Salvar',
        cancel: 'Cancelar',
        confirm: 'Confirmar',
        close: 'Fechar',
    },

    status: {
        delayed: 'Atrasada',
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
            updated: 'Tarefa editada com sucesso!',
            deleted: 'Tarefa deletada com sucesso!',
        },
        category: {
            created: 'Categoria criada com sucesso!',
            updated: 'Categoria editada com sucesso!',
            deleted: 'Categoria deletada com sucesso!',
        },
        history: {
            itemDeleted: 'Item do histórico deletado!',
            allDeleted: 'Histórico limpo!',
        }
    },

    formats: {
        date: 'dd/MM/yyyy',
        dateTime: '{date} ás {time}',
        time: 'HH:mm',
    },

    history: {
        action: {
            create: '{entity} criada.',
            update: '{entity} atualizada.',
            delete: '{entity} excluída.',
            increment: 'Número de tarefas aumentado.',
            decrement: 'Número de tarefas diminuido.',
        },

        category: {
            created: 'A categoria "{name}" foi criada.',
            nameUpdated: 'Nome alterado de "{oldName}" para "{newName}".',
            descriptionUpdated: 'Descrição alterada de "{oldDescription}" para "{newDescription}".',
            deleted: 'A categoria "{name}" foi deletada.',
            incremented: 'A contagem de tarefas da categoria "{name}" foi incrementada.',
            decremented: 'A contagem de tarefas da categoria "{name}" foi decrementada.',
        }
    },
};