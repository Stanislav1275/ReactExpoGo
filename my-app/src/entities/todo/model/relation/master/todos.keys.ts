import * as querystring from "node:querystring";

export const getTodosBase = () => 'todos';
export const getTodosBaseKeys = () => [getTodosBase()];
export const getTodosKeys = (tags: string[]) => [getTodosBase, querystring.stringify({tags})]
export const getTodoByIdKeys = (id: string) => [getTodosBase, id]
