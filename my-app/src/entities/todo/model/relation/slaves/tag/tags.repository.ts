import {Tag, TagListResponse, UpdateTagSchema} from "../../master/todos.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as TagsKeys from "./tags.keys";
import {generateRandomId} from "../../../../../../shared/lib";

export const getTags = async (): Promise<TagListResponse> => {
    return await AsyncStorage.getItem(TagsKeys.getTagsBase()).then(tags => JSON.stringify(tags)).catch(_ => ({})) as TagListResponse;
};
export const changeTag = async (id: string, tag: UpdateTagSchema): Promise<Tag> => {
    return await getTags().then(tags => {
        tags[id] = {...tags[id], ...tag};
        AsyncStorage.setItem(TagsKeys.getTagsBase(), JSON.stringify(tags));
        return tags[id];
    }).catch(_ => {
        throw new Error(`AsyncStorage with key ${TagsKeys.getTagsBase()} doesn't exist item with id:${id}`);
    })
}
export const removeTagById = async (id: string): Promise<void> => {
    return await getTags().then(tags => {
        delete tags[id];
        AsyncStorage.setItem(TagsKeys.getTagsBase(), JSON.stringify(tags));
    }).catch(_ => {
        throw new Error(`AsyncStorage with key ${TagsKeys.getTagsBase()} doesn't exist item with id:${id}`)
    })
}
export const addTag = async (tag: UpdateTagSchema): Promise<Tag> => {
    return await getTags().then(tags => {
        const id = generateRandomId();
        tags[id] = {id, ...tag};
        return tags[id];
    })
}
