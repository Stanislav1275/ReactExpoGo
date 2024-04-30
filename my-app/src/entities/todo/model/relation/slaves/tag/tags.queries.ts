import {useQuery} from "react-query";
import {TagListResponse} from "../../master/todos.types";
import * as TagsKeys from './tags.keys';
import * as TagsRepo from './tags.repository';

export const useTagsQuery = () => {
    return useQuery<TagListResponse>({
        staleTime: Infinity,
        queryKey: TagsKeys.getTagsBaseKeys(),
        queryFn: () => TagsRepo.getTags()
    });
}
