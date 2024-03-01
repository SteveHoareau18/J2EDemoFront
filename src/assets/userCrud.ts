import { writable } from "svelte/store";
import type { User } from "../entity/User";

export let users = writable<User[]>([]);

export async function getOrReloadUsers() {
    const response = await fetch("http://localhost:8080/user/list");
    users.set((await response.json() as User[]).map((user) => {
        user.bornDate = new Date(user.bornDate);
        return user;
    }));
}

export async function getUser(userId: number) {
    const response = await fetch("http://localhost:8080/user/get/" + userId);
    let user = (await response.json() as User);
    user.bornDate = new Date(user.bornDate);
    return user;
}