<script lang="ts">
    import { getOrReloadUsers, getUser } from "../../assets/userCrud";
    import { FormResponse, type Form } from "../../entity/Form";
    import type { User } from "../../entity/User";
    import { format } from "date-fns";
    export let form: Form;

    const handleSubmit = (e: any) => {
        const ACTION_URL = e.target.action;

        const formData = new FormData(e.target);
        let data = {
            name: formData.get("inputName") as string,
            firstName: formData.get("inputFirstName") as string,
            bornDate: new Date(formData.get("inputBornDate") as string),
        } as User;

        if (form.user !== undefined) {
            data.id = Number(formData.get("inputId"));
        }

        fetch(ACTION_URL, {
            method: form.sendMethod,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                form.response = FormResponse.SUCCESS;
                getOrReloadUsers();
                setTimeout(() => {
                    form.response = FormResponse.RETURN;
                }, 5000);
            })
            .catch((error) => {
                form.response = FormResponse.ERROR;
            });
    };

    export let deleteForm = false;
</script>

{#if deleteForm}
    <style>
        input:hover {
            cursor: not-allowed;
        }
    </style>
{/if}
{#if form.response == FormResponse.NONE}
    <form
        action={form.actionLink}
        method={form.sendMethod}
        on:submit|preventDefault={handleSubmit}
    >
        <label for="inputName">Nom: </label>
        <input
            required
            id="inputName"
            name="inputName"
            type="text"
            class="rounded border border-gray-500 bg-gray-50 mb-2"
            value={form.user?.name || ""}
            placeholder="Le nom de l'utilisateur..."
            disabled={deleteForm}
        /><br />
        <label for="inputFirstName">Prénom: </label>
        <input
            required
            id="inputFirstName"
            name="inputFirstName"
            type="text"
            class="rounded border border-gray-500 bg-gray-50 mb-2"
            value={form.user?.firstName || ""}
            placeholder="Le prénom de l'utilisateur..."
            disabled={deleteForm}
        /><br />
        <label for="inputBornDate">Date de naissance: </label>
        <input
            required
            id="inputBornDate"
            name="inputBornDate"
            type="date"
            class="rounded border border-gray-500 bg-gray-50 mb-2"
            value={format(form.user?.bornDate ?? new Date(), "yyyy-MM-dd")}
            disabled={deleteForm}
        /><br />
        <div class="h-5"></div>
        <button
            type="submit"
            class="rounded {deleteForm
                ? 'bg-red-500'
                : 'bg-green-500'} text-white font-bold p-2"
            >{#if form.user === undefined}
                CRÉER
            {:else if deleteForm}
                CONTINUER LA SUPPRESSION
            {:else}
                MODIFIER
            {/if}</button
        >
    </form>
{:else if form.response == FormResponse.SUCCESS}
    <div class="rounded bg-green-600 flex justify-center m-10">
        <p class="text-white text-center font-bold">
            Utilisateur {form.user === undefined ? "" : form.user.firstName}
            {#if form.user === undefined}
                crée
            {:else if deleteForm}
                supprimé
            {:else}
                modifié
            {/if} avec succès !
        </p>
    </div>
{:else if form.response == FormResponse.ERROR}
    <div class="rounded bg-red-600 flex justify-center m-10">
        <p class="text-white text-center font-bold">
            Une erreur est survenue...
        </p>
    </div>
{/if}
