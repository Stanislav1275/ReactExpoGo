import {Person} from "./types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class PersonReposityory {
    public static async saveLastPerson(person: Person) {
        await AsyncStorage.setItem(`person:${person.uid}`, JSON.stringify(person));
    }

    public static async setPersons(persons: Person[]) {
        await AsyncStorage.setItem(`persons`, JSON.stringify(persons));
    }

    public static async setPerson(uid: string, newPerson: Partial<Person>):Promise<void> {
        const persons = await PersonReposityory.getPersons_SAFE();
        const newPersons = persons.map(person => {
            if (person.uid !== uid) {
                return person
            }
            return {...person, ...newPerson};
        })
        await PersonReposityory.setPersons(newPersons);
    }

    public static async pushPerson(person: Person) {
        const oldPersons = await PersonReposityory.getPersons_SAFE();
        oldPersons.push(person);
        await PersonReposityory.setPersons(oldPersons);
        return oldPersons;
    }

    public static async getPersons_SAFE(): Promise<Person[]> {
        try {
            const res = await AsyncStorage.getItem("persons");
            return res ? JSON.parse(res) : [];
        } catch (e) {
            return []
        }
    }

    public static async getPersonById(uid: string): Promise<Person | null | undefined> {
        try {
            const res = await PersonReposityory.getPersons_SAFE();
            return res.find(person => person.uid === uid);
        } catch (e) {
            return undefined;
        }
    }
}
