import { writable } from "svelte/store";
import type { User } from "../entity/User";
export const API_URL = import.meta.env.VITE_API_URL;

export let users = writable<User[]>([]);

export async function getOrReloadUsers() {
    const response = await fetch(API_URL + "/list");
    users.set((await response.json() as User[]).map((user) => {
        user.bornDate = new Date(user.bornDate);
        return user;
    }));
}

export async function getUser(userId: number) {
    const response = await fetch(API_URL + "/get/" + userId);
    let user = (await response.json() as User);
    user.bornDate = new Date(user.bornDate);
    return user;
}