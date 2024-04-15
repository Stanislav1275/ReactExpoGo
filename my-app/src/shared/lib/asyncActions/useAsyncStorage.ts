import {useState, useEffect} from 'react';

interface AsyncAction<T> {
    (): Promise<T>;
}

interface AsyncResult<T> {
    data: T | null;
    loading: boolean;
    error: Error | null;
}

export const useAsyncAction = <T>(asyncAction: AsyncAction<T>): AsyncResult<T> => {
    const [result, setResult] = useState<T | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await asyncAction();
                setResult(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [asyncAction]);

    return {data: result, loading, error};
};

