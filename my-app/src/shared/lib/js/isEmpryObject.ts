export const isEmptyObject = (object: Record<string, unknown>): boolean => {
    return !!Object.keys(object).length;
}
