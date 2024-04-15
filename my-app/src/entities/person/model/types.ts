import {SEX} from "shared/models/person";

export interface Person {
    name:string;
    age:number;
    uid:string;
    sex:SEX
    attachment?:string | null | undefined
}
