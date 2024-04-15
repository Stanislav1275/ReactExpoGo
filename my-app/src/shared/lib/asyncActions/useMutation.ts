// import {useState} from 'react';
//
// interface MutationFunction<T, TVariables> {
//     (arg: TVariables): Promise<T>;
// }
//
// interface MutationResult<T, TVariables> {
//     result: T | null;
//     loading: boolean;
//     error: Error | null;
//     executeMutation: (arg: TVariables) => void;
// }
//
// export const useMutation = <T, TVariables>(mutationFn: MutationFunction<T, TVariables>): MutationResult<T, TVariables> => {
//     const [result, setResult] = useState<T | null>(null);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [error, setError] = useState<Error | null>(null);
//
//     const executeMutation = async (arg: TVariables) => {
//         setLoading(true);
//         try {
//             const data = await mutationFn(arg);
//             setResult(data);
//         } catch (error) {
//             setError(error);
//         } finally {
//             setLoading(false);
//         }
//     };
//
//     return {result, loading, error, executeMutation};
// };
//
