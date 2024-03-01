import { writable } from "svelte/store";
import type { User } from "../entity/User";
export const API_URL = import.meta.env.VITE_API_URL;

export let users = writable<User[]>([]);

export async function getOrReloadUsers() {
    // Définir l'URL de base de l'API
    // const API_URL = 'https://exemple.com'; // Remplacez "exemple.com" par votre URL de base

    // Construire l'URL complète pour l'endpoint "list"
    const url = API_URL + "/list";

    // Demander à l'utilisateur de saisir son nom d'utilisateur et son mot de passe
    const username = await window.prompt('Veuillez entrer votre nom d\'utilisateur :');
    const password = await window.prompt('Veuillez entrer votre mot de passe :');

    if (username && password) {
        const headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(username + ':' + password));

        const response = await fetch(url, {
            method: 'GET', // Méthode de requête (GET, POST, etc.)
            headers: headers,
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erreur de réseau ou serveur: ' + response.status);
                }
                return response.json(); // Traitez la réponse JSON ici si nécessaire
            });

        users.set((await response as User[]).map((user) => {
            user.bornDate = new Date(user.bornDate);
            return user;
        }));
    } else {
        console.log('Nom d\'utilisateur ou mot de passe non fourni.');
    }

    // const response = await fetch(API_URL + "/list", {
    //     credentials: "include"
    // });
    // users.set((await response.json() as User[]).map((user) => {
    //     user.bornDate = new Date(user.bornDate);
    //     return user;
    // }));
}

export async function getUser(userId: number) {
    const response = await fetch(API_URL + "/get/" + userId);
    let user = (await response.json() as User);
    user.bornDate = new Date(user.bornDate);
    return user;
}