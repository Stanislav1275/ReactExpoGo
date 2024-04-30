export type Tag = {
    id: string,
    name: string
}

export type TodoItemSchema = {
    id: string,
    text: string,
    header: string,
    tags: Tag[],
    created_at: string,
    updated_at: string,
};
export type UpdateTodoItemSchema = {
    text?: string,
    header?: string,
    tags: Tag[],
    created_at?: string,
    updated_at?: string,
};
export type TodoListResponse = Record<string, TodoItemSchema>;
export type TagListResponse = Record<string, Tag>;
export type UpdateTagSchema = {
    name:string
};
