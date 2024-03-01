<script lang="ts">
    import DataTable, { Head, Body, Row, Cell } from "@smui/data-table";
    import UserForm from "./form/UserForm.svelte";
    import { StatusUserForm, setStatus } from "../assets/StatusUserForm";
    import { onMount } from "svelte";
    import { FormResponse } from "../entity/Form";
    import { API_URL, getOrReloadUsers, getUser } from "../assets/userCrud";
    import type { User } from "../entity/User";
    import { format } from "date-fns";
    import { writable, type Writable } from "svelte/store";
    import { users } from "../assets/userCrud";

    export let status = setStatus(StatusUserForm.NONE);
    let currentUser: User | undefined;
    let userList: User[];

    users.subscribe((users) => {
        userList = users;
    });

    onMount(() => {
        getOrReloadUsers();
    });
</script>

<main>
    <div class="text-center">
        <h1 class="font-bold text-5xl">Gestion des utilisateurs</h1>
    </div>
    <div class="space h-5"></div>
    <div class="flex justify-around">
        <button
            class="rounded-xl bg-black text-white font-bold p-4"
            on:click={() => (status = setStatus(StatusUserForm.CREATE))}
            >AJOUTER UN UTILISATEUR</button
        >
    </div>
    <div class="h-5"></div>
    {#if status == StatusUserForm.CREATE}
        <UserForm
            form={{
                sendMethod: "POST",
                actionLink: API_URL + "/create",
                response: FormResponse.NONE,
            }}
        ></UserForm>
    {:else if status == StatusUserForm.MODIFY}
        <UserForm
            form={{
                sendMethod: "PUT",
                actionLink:
                    currentUser === undefined
                        ? ""
                        : API_URL + "/update/" + currentUser.id,
                response: FormResponse.NONE,
                user: currentUser,
            }}
        ></UserForm>
    {:else if status == StatusUserForm.DELETE}
        <UserForm
            form={{
                sendMethod: "DELETE",
                actionLink:
                    currentUser === undefined
                        ? ""
                        : API_URL + "/delete/" + currentUser.id,
                response: FormResponse.NONE,
                user: currentUser,
            }}
            deleteForm={true}
        ></UserForm>
    {/if}
    {#if userList}
        <h3 class="font-bold text-xl">Liste des utilisateurs</h3>
        <div class="space h-3"></div>
        <div class="flex justify-center">
            <DataTable style="max-width: 100%;">
                <Head>
                    <Row>
                        <Cell>Nom</Cell>
                        <Cell>Prénom</Cell>
                        <Cell>Date de naissance</Cell>
                        <Cell>Action</Cell>
                    </Row>
                </Head>
                <Body>
                    {#each userList as option}
                        <Row>
                            <Cell hidden>{option.id}</Cell>
                            <Cell>{option.name}</Cell>
                            <Cell>{option.firstName}</Cell>
                            <Cell>{format(option.bornDate, "dd/MM/yyyy")}</Cell>
                            <Cell>
                                <button
                                    class="rounded p-2 bg-orange-400 text-white font-bold"
                                    on:click={() => {
                                        status = setStatus(
                                            StatusUserForm.MODIFY,
                                        );
                                        getUser(option.id).then(
                                            (user) => (currentUser = user),
                                        );
                                    }}
                                >
                                    MODIFIER
                                </button>
                                <button
                                    class="rounded p-2 bg-red-400 text-white font-bold"
                                    on:click={() => {
                                        status = setStatus(
                                            StatusUserForm.DELETE,
                                        );
                                        getUser(option.id).then(
                                            (user) => (currentUser = user),
                                        );
                                    }}
                                >
                                    SUPPRIMER
                                </button>
                            </Cell>
                        </Row>
                    {/each}
                </Body>
            </DataTable>
        </div>
    {/if}
</main>
