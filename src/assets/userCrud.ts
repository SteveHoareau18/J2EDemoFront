import { writable } from "svelte/store";
import type { User } from "../entity/User";
export const API_URL = import.meta.env.VITE_API_URL;

export let users = writable<User[]>([]);

export async function getOrReloadUsers() {
    const username = await window.prompt('Veuillez entrer votre nom d\'utilisateur :');
    const password = await window.prompt('Veuillez entrer votre mot de passe :');

    if (username && password) {
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

        const response = await fetch(API_URL + "/list", {
            method: 'GET',
            headers: headers,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur de réseau ou serveur: ' + response.status);
                }
                return response.json();
            });

        users.set((await response as User[]).map((user) => {
            user.bornDate = new Date(user.bornDate);
            return user;
        }));
    } else {
        alert('Nom d\'utilisateur ou mot de passe non fourni.');
    }
}

export async function getUser(userId: number) {
    const username = await window.prompt('Veuillez entrer votre nom d\'utilisateur :');
    const password = await window.prompt('Veuillez entrer votre mot de passe :');

    if (username && password) {
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

        const response = await fetch(API_URL + "/get/" + userId, {
            method: 'GET',
            headers: headers,
        });
        let user = (await response.json() as User);
        user.bornDate = new Date(user.bornDate);
        return user;
    } else {
        alert('Nom d\'utilisateur ou mot de passe non fourni.');
    }
}