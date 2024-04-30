import {useMutation} from "react-query";
import {Tag, UpdateTagSchema} from "../../master/todos.types";
import * as TodosRepo from './tags.repository';
import * as TodosKeys from './tags.keys';
import {queryClient} from "shared/lib";

export const useTagsAddByIdMutation = () => useMutation<Tag, unknown, UpdateTagSchema>({
    mutationFn: (data) => {
        return TodosRepo.addTag(data);
    },
    onSuccess: async () => {
        await queryClient.refetchQueries({queryKey: TodosKeys.getTagsBaseKeys()})
    }
})
export const useTagsRemoveByIdMutation = () => useMutation<void, unknown, string>({
    mutationFn: (id) => TodosRepo.removeTagById(id),
    onSuccess: async () => {
        await queryClient.refetchQueries({queryKey: TodosKeys.getTagsBaseKeys()})
    }
})
