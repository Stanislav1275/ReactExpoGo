import {useQuery, UseQueryOptions} from "react-query";
import * as TodosRepo from './todos.repository';
import * as TodoQueriesKeys from './todos.keys';
import {useLocalSearchParams, useRouter} from "expo-router";
import {Tag, TodoItemSchema, TodoListResponse} from "./todos.types";

export const UseTodosQuery = () => {
    const {tags} = useLocalSearchParams<{ tags: string[] }>();
    return useQuery<TodoListResponse>({
        select: (todos) => {
            return Object.fromEntries(Object.entries(todos).filter(([_, value]) => tags?.includes(value.id)));
        },
        queryKey: TodoQueriesKeys.getTodosKeys(tags),
        queryFn: () => TodosRepo.getTodos(),
    });
}
export const UseTodosQueryById = (id: string) => {
    return useQuery<TodoItemSchema>({
        queryKey: TodoQueriesKeys.getTodoByIdKeys(id),
        queryFn: () => TodosRepo.getTodoById(id)
    });
}
