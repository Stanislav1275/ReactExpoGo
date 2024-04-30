import {TodoItemSchema, UpdateTodoItemSchema} from "./todos.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {generateRandomId} from "shared/lib";
import * as TodosKeys from './todos.keys';

export const getTodos = async (): Promise<Record<string, TodoItemSchema>> => {
    try {
        return await AsyncStorage.getItem(TodosKeys.getTodosBaseKeys()[0]).then(v => !v ? {} : JSON.parse(v)) as Record<number, TodoItemSchema>;
    } catch (error) {
        return {};
    }
}
export const getTodoById = async (id: string): Promise<TodoItemSchema> => {
    try {
        return await getTodos().then(v => v?.[id]);
    } catch (error) {
        throw new Error(`todo with id:${id} doesn't exist into todos key AsyncStorage`)
    }
}
export const changeTodoById = async (id: string, data: UpdateTodoItemSchema): Promise<TodoItemSchema> => {
    try {
        return await getTodos().then(todos => {
            if (!todos[id]) throw new Error(`todo with id:${id} doesn't exist into todos key AsyncStorage`);
            todos[id] = {...todos?.[id], ...data};
            AsyncStorage.setItem('todos', JSON.stringify(todos));
            return todos[id];
        });
    } catch (error: unknown) {
        throw error;
    }
}
export const removeTodoById = async (id: string): Promise<void> => {
    try {
        await getTodos().then(todos => {
            delete todos[id];
        })
    } catch (e) {
        throw new Error(`todo with id:${id} doesn't exist into todos key AsyncStorage`);
    }
}
export const addTodoItem = async (todo: TodoItemSchema) => {
    return getTodos().then(todos => {
        const newId = generateRandomId();
        todos[newId] = todo;
        AsyncStorage.setItem('todos', JSON.stringify(todos));
        return todo;
    })
}
