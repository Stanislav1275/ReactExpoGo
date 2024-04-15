// import {Person} from "./types";
// import {PersonReposityory} from "./Person.reposityory";
// import {useAsyncAction, useMutation} from "shared/lib";
//
// export const usePersonsState = () => {
//     return useAsyncAction(PersonReposityory.getPersons_SAFE)
// }
// export const usePersonsStatePatch = () => {
//     return useMutation<Person[], Person>((args) => PersonReposityory.pushPerson(args))
// }
// export const usePersonStateById = (uid: number) => {
//     const action = () => PersonReposityory.getPersonById(uid)
//     return useAsyncAction<Person | null | undefined>(action)
// }
