export type ResponseType<TData> = {
    error?: Error;
} & TData
