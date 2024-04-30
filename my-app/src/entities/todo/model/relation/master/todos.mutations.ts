import {useMutation} from "react-query";
import * as TodosRepo from './todos.repository';
import * as TodosKeys from './todos.keys';
import {Tag, TodoItemSchema, UpdateTodoItemSchema} from "./todos.types";
import {queryClient} from "../../../../../shared/lib";

const _revalidateAllTodos = async () => {
    const keys = queryClient.getQueryCache().findAll('todos');
    for (const key of keys) {
        await queryClient.invalidateQueries(key);
    }
}
const _invalidateTodoById = async (id: string): Promise<void> => {
    await queryClient.invalidateQueries({queryKey: TodosKeys.getTodoByIdKeys(id)});
}
export const useTodoMutation = (id: string) => {
    return useMutation<UpdateTodoItemSchema, unknown, UpdateTodoItemSchema>({
        mutationFn: async (todo) => {
            return await TodosRepo.changeTodoById(id, todo).then(async ({id, tags}) => {
                await _invalidateTodoById(id);
                await queryClient.invalidateQueries({queryKey: TodosKeys.getTodoByIdKeys(id)});
                return todo;
            });
        }

    })
}
export const useAddTodoMutation = () => {
    return useMutation<TodoItemSchema, unknown, TodoItemSchema>({
        mutationFn: (data) => TodosRepo.addTodoItem(data), onSuccess: async () => {
            await _revalidateAllTodos();
        }
    })
}
export const useRemoveTodoMutation = (id: string) => {
    return useMutation({
        mutationFn: () => TodosRepo.removeTodoById(id),
        onSuccess: async () => {
            await _revalidateAllTodos();
        }
    });
};
