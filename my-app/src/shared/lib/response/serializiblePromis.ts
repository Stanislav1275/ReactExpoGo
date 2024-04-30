import {ResponseType} from './Response'

export const nonCatchPromise = <TData>(promise: Promise<TData>): Promise<ResponseType<TData>> => {
    return promise.then(data => {
        return {
            ...data, error: undefined
        };
    }).catch(e => e) satisfies Promise<ResponseType<TData>>
}
